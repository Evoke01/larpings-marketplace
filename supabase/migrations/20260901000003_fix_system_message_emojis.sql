-- Cancel P2P Deal (Buyer Only)
create or replace function public.cancel_p2p_deal(p_order_id uuid)
returns json
language plpgsql
security definer
set search_path = public, pg_temp
as $body$
declare
  v_order public.orders;
  v_auth_uid uuid;
begin
  v_auth_uid := (select auth.uid());
  if v_auth_uid is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  select * into v_order from public.orders where id = p_order_id;
  
  if v_order is null then
    raise exception 'Order not found' using errcode = 'P0001';
  end if;

  if v_order.buyer_id != v_auth_uid then
    raise exception 'Unauthorized: Only buyer can cancel' using errcode = '42501';
  end if;
  
  if v_order.status = 'closed' or v_order.status = 'confirmed' or v_order.status = 'cancelled' or v_order.status = 'disputed' then
    raise exception 'Cannot cancel a closed, confirmed, cancelled, or disputed order' using errcode = 'P0001';
  end if;

  update public.orders set status = 'cancelled' where id = p_order_id;
  
  insert into public.order_messages (order_id, sender_id, content) 
  values (p_order_id, v_auth_uid, '[SYS_CANCEL] The Buyer has cancelled the deal.');

  return json_build_object('status', 'cancelled');
end;
$body$;

-- Confirm P2P Deal (Buyer or Seller)
create or replace function public.confirm_p2p_deal(p_order_id uuid, p_is_buyer boolean)
returns json
language plpgsql
security definer
set search_path = public, pg_temp
as $body$
declare
  v_order public.orders;
begin
  if (select auth.uid()) is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  select * into v_order from public.orders where id = p_order_id;
  
  if v_order is null then
    raise exception 'Order not found' using errcode = 'P0001';
  end if;

  if v_order.status = 'closed' or v_order.status = 'cancelled' or v_order.status = 'disputed' then
    raise exception 'Order is already closed, cancelled or disputed' using errcode = 'P0001';
  end if;

  if p_is_buyer then
    update public.orders set buyer_closed = true where id = p_order_id;
    if v_order.seller_closed = true then
      update public.orders set status = 'closed' where id = p_order_id;
      update public.listings set status = 'sold' where id = v_order.listing_id;
      insert into public.order_messages (order_id, sender_id, content) 
      values (p_order_id, auth.uid(), '[SYS_CONFIRM] The Buyer has confirmed the deal. The deal is now closed.');
      return json_build_object('status', 'closed', 'buyer_closed', true, 'seller_closed', true);
    else
      insert into public.order_messages (order_id, sender_id, content) 
      values (p_order_id, auth.uid(), '[SYS_CONFIRM] The Buyer has confirmed the deal. Waiting for the Seller to confirm.');
    end if;
  else
    update public.orders set seller_closed = true where id = p_order_id;
    if v_order.buyer_closed = true then
      update public.orders set status = 'closed' where id = p_order_id;
      update public.listings set status = 'sold' where id = v_order.listing_id;
      insert into public.order_messages (order_id, sender_id, content) 
      values (p_order_id, auth.uid(), '[SYS_CONFIRM] The Seller has confirmed the deal. The deal is now closed.');
      return json_build_object('status', 'closed', 'buyer_closed', true, 'seller_closed', true);
    else
      insert into public.order_messages (order_id, sender_id, content) 
      values (p_order_id, auth.uid(), '[SYS_CONFIRM] The Seller has confirmed the deal. Waiting for the Buyer to confirm.');
    end if;
  end if;
  
  return json_build_object('status', 'pending', 'buyer_closed', p_is_buyer or v_order.buyer_closed, 'seller_closed', not p_is_buyer or v_order.seller_closed);
end;
$body$;

-- Resolve P2P Dispute (MM or Admin Only)
create or replace function public.resolve_p2p_dispute(p_order_id uuid, p_resolution text)
returns json
language plpgsql
security definer
set search_path = public, pg_temp
as $body$
declare
  v_order public.orders;
  v_auth_uid uuid;
  v_is_admin boolean;
  v_is_mm boolean;
begin
  v_auth_uid := (select auth.uid());
  if v_auth_uid is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  select * into v_order from public.orders where id = p_order_id;
  
  if v_order is null then
    raise exception 'Order not found' using errcode = 'P0001';
  end if;

  if v_order.status != 'disputed' then
    raise exception 'Order is not in a disputed state' using errcode = 'P0001';
  end if;

  if v_order.mm_id is not null then
    if v_order.mm_id != v_auth_uid then
      raise exception 'Unauthorized: Only the assigned Middleman can resolve this dispute' using errcode = '42501';
    end if;
  else
    v_is_admin := (select private.is_admin());
    if not v_is_admin then
      raise exception 'Unauthorized: Only an Admin can resolve a dispute when no Middleman is assigned' using errcode = '42501';
    end if;
  end if;

  if p_resolution = 'refund_buyer' then
    update public.orders set status = 'cancelled' where id = p_order_id;
    insert into public.order_messages (order_id, sender_id, content) 
    values (p_order_id, v_auth_uid, '[SYS_CANCEL] Dispute Resolved: The deal has been cancelled and funds (if held in escrow) will be refunded to the buyer.');
    return json_build_object('status', 'cancelled');
  elsif p_resolution = 'release_to_seller' then
    update public.orders set status = 'closed', buyer_closed = true, seller_closed = true where id = p_order_id;
    update public.listings set status = 'sold' where id = v_order.listing_id;
    insert into public.order_messages (order_id, sender_id, content) 
    values (p_order_id, v_auth_uid, '[SYS_CONFIRM] Dispute Resolved: The deal has been closed and funds will be released to the seller.');
    return json_build_object('status', 'closed');
  else
    raise exception 'Invalid resolution type. Must be refund_buyer or release_to_seller' using errcode = 'P0001';
  end if;
end;
$body$;
