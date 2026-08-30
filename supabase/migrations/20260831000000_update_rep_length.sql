-- Change the profile rep length requirement to 5-20 characters
create or replace function public.submit_profile_rep(p_target_id uuid, p_note text)
returns table(id uuid, next_available timestamptz)
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_rep uuid;
  last_rep timestamptz;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if auth.uid() = p_target_id then raise exception 'You cannot Rep yourself'; end if;
  if not exists (select 1 from public.profiles where id = p_target_id) then raise exception 'Profile not found'; end if;
  if char_length(btrim(coalesce(p_note, ''))) not between 5 and 20 then raise exception 'Rep note must be between 5 and 20 characters'; end if;

  perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text || ':' || p_target_id::text, 0));
  select max(created_at) into last_rep
  from public.profile_reps
  where giver_id = auth.uid() and target_id = p_target_id and is_visible;
  if last_rep is not null and last_rep > now() - interval '30 days' then
    raise exception 'You can Rep this profile again after %', (last_rep + interval '30 days');
  end if;

  insert into public.profile_reps(giver_id, target_id, note)
  values (auth.uid(), p_target_id, btrim(p_note))
  returning public.profile_reps.id into new_rep;
  return query select new_rep, now() + interval '30 days';
end;
$$;
