-- Update listing status to sold when an order is closed
create or replace function public.confirm_p2p_deal(p_order_id uuid, p_is_buyer boolean)
returns json
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_order public.orders;
begin
  if (select auth.uid()) is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  -- Ensure the user is actually the buyer or seller
  select * into v_order from public.orders o
  left join public.listings l on o.listing_id = l.id
  where o.id = p_order_id;

  if v_order is null then
    raise exception 'Order not found' using errcode = 'P0001';
  end if;

  if p_is_buyer and v_order.buyer_id != auth.uid() then
    raise exception 'Unauthorized' using errcode = '42501';
  end if;

  if not p_is_buyer then
    if not exists (select 1 from public.listings l where l.id = v_order.listing_id and l.seller_id = auth.uid()) then
      raise exception 'Unauthorized' using errcode = '42501';
    end if;
  end if;

  if p_is_buyer then
    if not v_order.buyer_closed then
      update public.orders set buyer_closed = true where id = p_order_id;
      insert into public.order_messages (order_id, sender_id, content) 
      values (p_order_id, auth.uid(), '✅ The Buyer has confirmed the deal. Waiting for the Seller to confirm.');
    end if;
  else
    if not v_order.seller_closed then
      update public.orders set seller_closed = true where id = p_order_id;
      insert into public.order_messages (order_id, sender_id, content) 
      values (p_order_id, auth.uid(), '✅ The Seller has confirmed the deal. Waiting for the Buyer to confirm.');
    end if;
  end if;

  -- Refresh order
  select * into v_order from public.orders where id = p_order_id;

  if v_order.buyer_closed and v_order.seller_closed and v_order.status != 'closed' then
    update public.orders set status = 'closed' where id = p_order_id;
    update public.listings set status = 'sold' where id = v_order.listing_id;
    
    insert into public.order_messages (order_id, sender_id, content) 
    values (p_order_id, auth.uid(), '✅ Both parties have confirmed. The deal is now closed.');
    return json_build_object('status', 'closed', 'buyer_closed', true, 'seller_closed', true);
  end if;

  return json_build_object('status', v_order.status, 'buyer_closed', v_order.buyer_closed, 'seller_closed', v_order.seller_closed);
end;
$$;
