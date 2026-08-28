create table if not exists public.larping_lounge_messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  content text not null check (char_length(btrim(content)) between 1 and 2000),
  created_at timestamptz not null default now()
);

create index if not exists larping_lounge_messages_created_at_idx
  on public.larping_lounge_messages (created_at);

alter table public.larping_lounge_messages enable row level security;

drop policy if exists "Authenticated users can read lounge messages"
  on public.larping_lounge_messages;
create policy "Authenticated users can read lounge messages"
  on public.larping_lounge_messages for select to authenticated using (true);

drop policy if exists "Users can send lounge messages as themselves"
  on public.larping_lounge_messages;
create policy "Users can send lounge messages as themselves"
  on public.larping_lounge_messages for insert to authenticated
  with check (auth.uid() = sender_id);

revoke update, delete on public.larping_lounge_messages from authenticated;
revoke all on public.larping_lounge_messages from anon;
grant select, insert on public.larping_lounge_messages to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'larping_lounge_messages'
  ) then
    alter publication supabase_realtime add table public.larping_lounge_messages;
  end if;
end $$;
