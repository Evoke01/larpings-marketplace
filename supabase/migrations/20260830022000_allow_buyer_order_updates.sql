drop policy if exists "buyers can confirm their orders" on public.orders;
create policy "buyers can confirm their orders" on public.orders for update to authenticated using ((select auth.uid()) = buyer_id) with check ((select auth.uid()) = buyer_id);
