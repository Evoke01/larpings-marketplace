-- Drop any strict constraints on orders.status if they exist
do $$
begin
  begin
    alter table public.orders drop constraint if exists orders_status_check;
  exception
    when others then null;
  end;
end $$;

-- Cancel P2P Deal (Buyer Only)
create or replace function public.cancel_p2p_deal(p_order_id uuid)
returns json
language plpgsql
security definer
set search_path = public, pg_temp
as $$
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
  values (p_order_id, v_auth_uid, '🚫 The Buyer has cancelled the deal.');

  return json_build_object('status', 'cancelled');
end;
$$;

-- Resolve P2P Dispute (MM or Admin Only)
create or replace function public.resolve_p2p_dispute(p_order_id uuid, p_resolution text)
returns json
language plpgsql
security definer
set search_path = public, pg_temp
as $$
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
    values (p_order_id, v_auth_uid, '⚖️ Dispute Resolved: The deal has been cancelled and funds (if held in escrow) will be refunded to the buyer.');
    return json_build_object('status', 'cancelled');
  elsif p_resolution = 'release_to_seller' then
    update public.orders set status = 'closed', buyer_closed = true, seller_closed = true where id = p_order_id;
    update public.listings set status = 'sold' where id = v_order.listing_id;
    insert into public.order_messages (order_id, sender_id, content) 
    values (p_order_id, v_auth_uid, '⚖️ Dispute Resolved: The deal has been closed and funds will be released to the seller.');
    return json_build_object('status', 'closed');
  else
    raise exception 'Invalid resolution type. Must be refund_buyer or release_to_seller' using errcode = 'P0001';
  end if;
end;
$$;
