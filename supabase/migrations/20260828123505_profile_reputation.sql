alter table public.profiles add column if not exists rep_count integer not null default 0 check (rep_count >= 0);
alter table public.profiles add column if not exists vouch_count integer not null default 0 check (vouch_count >= 0);

create table if not exists public.profile_reps (
  id uuid primary key default gen_random_uuid(),
  giver_id uuid not null references public.profiles(id) on delete cascade,
  target_id uuid not null references public.profiles(id) on delete cascade,
  note text not null check (char_length(btrim(note)) between 20 and 280),
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  constraint profile_reps_no_self check (giver_id <> target_id)
);

create index if not exists profile_reps_target_created_idx on public.profile_reps(target_id, created_at desc) where is_visible;
create index if not exists profile_reps_giver_target_created_idx on public.profile_reps(giver_id, target_id, created_at desc) where is_visible;

create table if not exists public.profile_vouches (
  id uuid primary key default gen_random_uuid(),
  giver_id uuid not null references public.profiles(id) on delete cascade,
  target_id uuid not null references public.profiles(id) on delete cascade,
  order_id uuid not null references public.orders(id) on delete restrict,
  created_at timestamptz not null default now(),
  constraint profile_vouches_no_self check (giver_id <> target_id),
  constraint profile_vouches_once unique (giver_id, target_id)
);

create index if not exists profile_vouches_target_idx on public.profile_vouches(target_id, created_at desc);

create table if not exists public.profile_rep_reports (
  id uuid primary key default gen_random_uuid(),
  rep_id uuid not null references public.profile_reps(id) on delete cascade,
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  reason text not null check (char_length(btrim(reason)) between 10 and 500),
  created_at timestamptz not null default now(),
  constraint profile_rep_reports_once unique (rep_id, reporter_id)
);

alter table public.profile_reps enable row level security;
alter table public.profile_vouches enable row level security;
alter table public.profile_rep_reports enable row level security;

drop policy if exists "Public can read visible profile reps" on public.profile_reps;
create policy "Public can read visible profile reps"
  on public.profile_reps for select
  to anon, authenticated
  using (is_visible);

drop policy if exists "Public can read profile vouches" on public.profile_vouches;
create policy "Public can read profile vouches"
  on public.profile_vouches for select
  to anon, authenticated
  using (true);

drop policy if exists "Users can report visible profile reps" on public.profile_rep_reports;
create policy "Users can report visible profile reps"
  on public.profile_rep_reports for insert
  to authenticated
  with check (
    reporter_id = (select auth.uid())
    and exists (select 1 from public.profile_reps r where r.id = rep_id and r.is_visible)
  );

create or replace function public.refresh_profile_reputation_counts()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  affected_target uuid;
begin
  affected_target := coalesce(new.target_id, old.target_id);
  if tg_table_name = 'profile_reps' then
    update public.profiles
    set rep_count = (select count(*)::integer from public.profile_reps where target_id = affected_target and is_visible)
    where id = affected_target;
  elsif tg_table_name = 'profile_vouches' then
    update public.profiles
    set vouch_count = (select count(*)::integer from public.profile_vouches where target_id = affected_target)
    where id = affected_target;
  end if;
  return coalesce(new, old);
end;
$$;

drop trigger if exists profile_reps_count_trigger on public.profile_reps;
create trigger profile_reps_count_trigger
after insert or update or delete on public.profile_reps
for each row execute function public.refresh_profile_reputation_counts();

drop trigger if exists profile_vouches_count_trigger on public.profile_vouches;
create trigger profile_vouches_count_trigger
after insert or delete on public.profile_vouches
for each row execute function public.refresh_profile_reputation_counts();

update public.profiles p
set rep_count = (select count(*)::integer from public.profile_reps r where r.target_id = p.id and r.is_visible),
    vouch_count = (select count(*)::integer from public.profile_vouches v where v.target_id = p.id);

create or replace function public.get_profile_reputation_state(p_target_id uuid)
returns table(rep_available boolean, rep_next_eligible_at timestamptz, vouch_available boolean)
language plpgsql
stable
security invoker
set search_path = public
as $$
declare
  last_rep timestamptz;
  qualifying_order boolean;
begin
  if auth.uid() is null or auth.uid() = p_target_id then
    return query select false, null::timestamptz, false;
    return;
  end if;

  select max(created_at) into last_rep
  from public.profile_reps
  where giver_id = auth.uid() and target_id = p_target_id and is_visible;

  select exists (
    select 1
    from public.orders o
    join public.listings l on l.id = o.listing_id
    where o.status = 'confirmed'
      and ((o.buyer_id = auth.uid() and l.seller_id = p_target_id)
        or (o.buyer_id = p_target_id and l.seller_id = auth.uid()))
  ) into qualifying_order;

  return query select
    (last_rep is null or last_rep <= now() - interval '30 days'),
    case when last_rep is null or last_rep <= now() - interval '30 days' then null else last_rep + interval '30 days' end,
    qualifying_order and not exists (
      select 1 from public.profile_vouches where giver_id = auth.uid() and target_id = p_target_id
    );
end;
$$;

create or replace function public.submit_profile_rep(p_target_id uuid, p_note text)
returns table(rep_id uuid, next_eligible_at timestamptz)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  new_rep uuid;
  last_rep timestamptz;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if auth.uid() = p_target_id then raise exception 'You cannot Rep yourself'; end if;
  if not exists (select 1 from public.profiles where id = p_target_id) then raise exception 'Profile not found'; end if;
  if char_length(btrim(coalesce(p_note, ''))) not between 20 and 280 then raise exception 'Rep note must be between 20 and 280 characters'; end if;

  perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text || ':' || p_target_id::text, 0));
  select max(created_at) into last_rep
  from public.profile_reps
  where giver_id = auth.uid() and target_id = p_target_id and is_visible;
  if last_rep is not null and last_rep > now() - interval '30 days' then
    raise exception 'You can Rep this profile again after %', (last_rep + interval '30 days');
  end if;

  insert into public.profile_reps(giver_id, target_id, note)
  values (auth.uid(), p_target_id, btrim(p_note))
  returning id into new_rep;
  return query select new_rep, now() + interval '30 days';
end;
$$;

create or replace function public.submit_profile_vouch(p_target_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  selected_order uuid;
  new_vouch uuid;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if auth.uid() = p_target_id then raise exception 'You cannot Vouch for yourself'; end if;

  select o.id into selected_order
  from public.orders o
  join public.listings l on l.id = o.listing_id
  where o.status = 'confirmed'
    and ((o.buyer_id = auth.uid() and l.seller_id = p_target_id)
      or (o.buyer_id = p_target_id and l.seller_id = auth.uid()))
  order by o.created_at desc
  limit 1;
  if selected_order is null then raise exception 'Vouch is available after a confirmed order with this profile'; end if;
  if exists (select 1 from public.profile_vouches where giver_id = auth.uid() and target_id = p_target_id) then raise exception 'You have already Vouched for this profile'; end if;

  insert into public.profile_vouches(giver_id, target_id, order_id)
  values (auth.uid(), p_target_id, selected_order)
  returning id into new_vouch;
  return new_vouch;
end;
$$;

create or replace function public.admin_remove_profile_rep(p_rep_id uuid)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') <> 'admin' then raise exception 'Admin access required'; end if;
  delete from public.profile_reps where id = p_rep_id;
end;
$$;

revoke all on function public.get_profile_reputation_state(uuid) from public, anon;
grant execute on function public.get_profile_reputation_state(uuid) to authenticated;
revoke all on function public.submit_profile_rep(uuid, text) from public, anon;
grant execute on function public.submit_profile_rep(uuid, text) to authenticated;
revoke all on function public.submit_profile_vouch(uuid) from public, anon;
grant execute on function public.submit_profile_vouch(uuid) to authenticated;
revoke all on function public.admin_remove_profile_rep(uuid) from public, anon, authenticated;
grant execute on function public.admin_remove_profile_rep(uuid) to authenticated;
