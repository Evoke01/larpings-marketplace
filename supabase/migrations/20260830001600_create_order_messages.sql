create table if not exists order_messages (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) on delete cascade not null,
  sender_id uuid references auth.users(id) not null,
  content text not null,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table order_messages enable row level security;

create policy "Users can view messages for their orders"
  on order_messages for select
  using (
    exists (
      select 1 from orders
      join listings on listings.id = orders.listing_id
      where orders.id = order_messages.order_id
      and (orders.buyer_id = auth.uid() or listings.seller_id = auth.uid())
    )
  );

create policy "Users can insert messages for their orders"
  on order_messages for insert
  with check (
    auth.uid() = sender_id and
    exists (
      select 1 from orders
      join listings on listings.id = orders.listing_id
      where orders.id = order_messages.order_id
      and (orders.buyer_id = auth.uid() or listings.seller_id = auth.uid())
    )
  );

-- Admin can read all
create policy "Admins can view all order messages"
  on order_messages for select
  using (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
  );

-- Publish realtime
alter publication supabase_realtime add table order_messages;
