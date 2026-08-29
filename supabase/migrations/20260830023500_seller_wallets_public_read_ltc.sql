-- Allow buyers to read seller wallet addresses (so listing page can show available coins)
drop policy if exists "Anyone can read seller wallet addresses" on seller_wallets;
create policy "Anyone can read seller wallet addresses"
  on seller_wallets for select
  to authenticated
  using (true);

-- Add Litecoin address support
alter table seller_wallets add column if not exists ltc_address text;
