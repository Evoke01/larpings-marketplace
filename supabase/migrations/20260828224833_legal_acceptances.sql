create table if not exists public.legal_acceptances (
  user_id uuid primary key references auth.users(id) on delete cascade,
  terms_version text not null,
  privacy_version text not null,
  accepted_at timestamptz not null default now(),
  constraint legal_acceptances_versions_present check (length(trim(terms_version)) > 0 and length(trim(privacy_version)) > 0)
);

comment on table public.legal_acceptances is 'Immutable record of a users acceptance of the published Terms and Privacy versions.';

alter table public.legal_acceptances enable row level security;

drop policy if exists "Users can view their legal acceptance" on public.legal_acceptances;
create policy "Users can view their legal acceptance"
  on public.legal_acceptances for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can record their legal acceptance" on public.legal_acceptances;
create policy "Users can record their legal acceptance"
  on public.legal_acceptances for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

revoke all on table public.legal_acceptances from anon;
revoke update, delete on table public.legal_acceptances from authenticated;
grant select, insert on table public.legal_acceptances to authenticated;
