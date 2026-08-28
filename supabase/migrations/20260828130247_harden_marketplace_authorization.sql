-- Keep profile reputation, verification state, and ownership fields server-controlled.
revoke update on table public.profiles from authenticated;
grant update (username, display_name, bio, avatar_url, banner_url, website_url, twitter_url, instagram_url, discord_url)
  on table public.profiles to authenticated;

-- Sellers can edit offer content, but cannot self-approve or reassign a listing.
revoke update on table public.listings from authenticated;
grant update (handle, category, platform, price, followers, hot, description, details)
  on table public.listings to authenticated;

-- Verification payments are created only by the payment Edge Function.
drop policy if exists "Sellers can create verification payments" on public.seller_verification_payments;
revoke insert on table public.seller_verification_payments from authenticated;

-- Delivery confirmation is a narrow server-side state transition, not a generic row update.
drop policy if exists "buyers can confirm their orders" on public.orders;
revoke update on table public.orders from authenticated;

create or replace function public.confirm_order_delivery(p_order_id uuid)
returns public.orders
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  updated_order public.orders;
begin
  if (select auth.uid()) is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  update public.orders o
  set status = 'confirmed'
  where o.id = p_order_id
    and o.buyer_id = (select auth.uid())
    and o.status in ('Paid', 'Delivered', 'delivered');

  if not found then
    raise exception 'Order is not ready for delivery confirmation' using errcode = 'P0001';
  end if;

  select * into updated_order from public.orders where id = p_order_id;
  return updated_order;
end;
$$;

revoke all on function public.confirm_order_delivery(uuid) from PUBLIC, anon;
grant execute on function public.confirm_order_delivery(uuid) to authenticated;
