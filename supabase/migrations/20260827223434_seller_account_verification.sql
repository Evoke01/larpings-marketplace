create table if not exists public.seller_verifications (
  seller_id uuid primary key references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'verified', 'rejected')),
  evidence text,
  requested_at timestamptz not null default now(),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists seller_verifications_status_idx on public.seller_verifications(status);

alter table public.seller_verifications enable row level security;

drop policy if exists "Public can see approved seller verification" on public.seller_verifications;
create policy "Public can see approved seller verification"
  on public.seller_verifications for select
  to anon, authenticated
  using (status = 'verified');

drop policy if exists "Sellers can request verification" on public.seller_verifications;
create policy "Sellers can request verification"
  on public.seller_verifications for insert
  to authenticated
  with check ((select auth.uid()) = seller_id and status = 'pending');

drop policy if exists "Sellers can view their pending request" on public.seller_verifications;
create policy "Sellers can view their pending request"
  on public.seller_verifications for select
  to authenticated
  using ((select auth.uid()) = seller_id);
