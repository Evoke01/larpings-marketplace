create table if not exists seller_wallets (
  seller_id uuid references auth.users(id) primary key,
  evm_address text,
  btc_address text,
  sol_address text,
  ton_address text,
  trx_address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table seller_wallets enable row level security;

drop policy if exists "Users can read their own wallet addresses" on seller_wallets;
create policy "Users can read their own wallet addresses"
  on seller_wallets for select
  using (auth.uid() = seller_id);

drop policy if exists "Users can insert their own wallet addresses" on seller_wallets;
create policy "Users can insert their own wallet addresses"
  on seller_wallets for insert
  with check (auth.uid() = seller_id);

drop policy if exists "Users can update their own wallet addresses" on seller_wallets;
create policy "Users can update their own wallet addresses"
  on seller_wallets for update
  using (auth.uid() = seller_id);

drop policy if exists "Admins can read all wallet addresses" on seller_wallets;
create policy "Admins can read all wallet addresses"
  on seller_wallets for select
  using (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
  );
