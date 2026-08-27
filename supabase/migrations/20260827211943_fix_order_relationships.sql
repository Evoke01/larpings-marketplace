-- Orders do not store seller_id; seller ownership is derived from listings.
-- Allow sellers to read only orders for their own listings.
drop policy if exists "sellers can read orders for their listings" on public.orders;
create policy "sellers can read orders for their listings"
on public.orders
for select
to authenticated
using (
  exists (
    select 1
    from public.listings
    where listings.id = orders.listing_id
      and listings.seller_id = (select auth.uid())
  )
);
