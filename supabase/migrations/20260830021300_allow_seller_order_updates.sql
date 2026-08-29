drop policy if exists "sellers can update orders for their listings" on public.orders;
create policy "sellers can update orders for their listings"
on public.orders
for update
to authenticated
using (
  exists (
    select 1
    from public.listings
    where listings.id = orders.listing_id
      and listings.seller_id = (select auth.uid())
  )
);
