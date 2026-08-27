alter table if exists public.listings
  add column if not exists verification_status text not null default 'unverified',
  add column if not exists verification_code_hash text,
  add column if not exists verification_expires_at timestamptz,
  add column if not exists verified_at timestamptz;

alter table if exists public.listings
  drop constraint if exists listings_verification_status_check;

alter table if exists public.listings
  add constraint listings_verification_status_check
  check (verification_status in ('unverified', 'pending', 'verified'));

create index if not exists listings_verification_status_idx
  on public.listings (verification_status);
