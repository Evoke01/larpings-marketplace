-- Remove any recursive profile policies that can make every profile read fail
-- with 42P17. Admin authorization must not be implemented by querying the same
-- RLS-protected table from its own policy.
do $$
declare
  policy_record record;
begin
  if to_regclass('public.profiles') is null then return; end if;
  for policy_record in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'profiles'
  loop
    execute format('drop policy if exists %I on public.profiles', policy_record.policyname);
  end loop;
end $$;

alter table public.profiles enable row level security;

create policy "public profiles are readable"
  on public.profiles for select
  to anon, authenticated
  using (true);

create policy "users can update their profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);
