-- DEXTER is a manually awarded, platform-owned badge. The image/icon is
-- represented by the badge type in the client so it cannot be user-uploaded.
create schema if not exists private;

create or replace function private.is_admin()
returns boolean
language sql
security definer
set search_path = public, pg_temp
stable
as $$
  select (select auth.uid()) is not null
    and (
      coalesce((select auth.jwt() -> 'app_metadata' ->> 'role'), '') = 'admin'
      or exists (
        select 1 from public.profiles
        where id = (select auth.uid()) and role = 'admin'
      )
    );
$$;

revoke all on function private.is_admin() from public, anon, authenticated;
grant execute on function private.is_admin() to authenticated;

-- Replace any legacy client-side write policies with one server-enforced rule.
do $$
declare
  policy_record record;
begin
  if to_regclass('public.badges') is not null then
    for policy_record in
      select policyname, cmd from pg_policies
      where schemaname = 'public' and tablename = 'badges'
        and cmd in ('INSERT', 'DELETE', 'UPDATE')
    loop
      execute format('drop policy if exists %I on public.badges', policy_record.policyname);
    end loop;
  end if;
end $$;

revoke insert, update, delete on public.badges from authenticated;
grant insert, delete on public.badges to authenticated;

drop policy if exists "Only admins can grant badges" on public.badges;
create policy "Only admins can grant badges"
  on public.badges for insert to authenticated
  with check ((select private.is_admin()) and granted_by = (select auth.uid()));

drop policy if exists "Only admins can revoke badges" on public.badges;
create policy "Only admins can revoke badges"
  on public.badges for delete to authenticated
  using ((select private.is_admin()));
