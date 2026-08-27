create table if not exists public.seller_verification_payments (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles(id) on delete cascade,
  amount numeric(10, 2) not null default 49.00 check (amount = 49.00),
  currency text not null default 'USD' check (currency = 'USD'),
  status text not null default 'Waiting' check (status in ('Waiting', 'Underpaid', 'Confirming', 'Paid', 'Expired', 'Cancelled', 'Failed')),
  track_id text unique not null,
  payment_url text not null,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists seller_verification_payments_seller_idx on public.seller_verification_payments(seller_id, created_at desc);

alter table public.seller_verification_payments enable row level security;

drop policy if exists "Sellers can view their verification payments" on public.seller_verification_payments;
create policy "Sellers can view their verification payments"
  on public.seller_verification_payments for select
  to authenticated
  using ((select auth.uid()) = seller_id);

drop policy if exists "Sellers can create verification payments" on public.seller_verification_payments;
create policy "Sellers can create verification payments"
  on public.seller_verification_payments for insert
  to authenticated
  with check ((select auth.uid()) = seller_id and amount = 49.00 and currency = 'USD');
