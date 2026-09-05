-- Remove the sandbox payment test fixture safely by removing dependent records first
DO $$
DECLARE
  v_listing_id uuid;
BEGIN
  SELECT id INTO v_listing_id FROM public.listings WHERE handle = 'sandbox-payment-test';
  
  IF v_listing_id IS NOT NULL THEN
    -- Delete vouches referencing orders of this listing
    DELETE FROM public.profile_vouches WHERE order_id IN (SELECT id FROM public.orders WHERE listing_id = v_listing_id);
    
    -- Delete order messages
    DELETE FROM public.order_messages WHERE order_id IN (SELECT id FROM public.orders WHERE listing_id = v_listing_id);
    
    -- Delete orders
    DELETE FROM public.orders WHERE listing_id = v_listing_id;
    
    -- Delete listing offers and likes
    DELETE FROM public.listing_offers WHERE listing_id = v_listing_id;
    DELETE FROM public.listing_likes WHERE listing_id = v_listing_id;

    -- Finally, delete the listing
    DELETE FROM public.listings WHERE id = v_listing_id;
  END IF;
END $$;
