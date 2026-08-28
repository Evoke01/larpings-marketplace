-- Sellers may create listings, but ownership verification is granted only by
-- the server-side verification functions after the bio challenge succeeds.
revoke insert on table public.listings from authenticated;
grant insert (seller_id, handle, category, platform, price, followers, hot, status, description, details)
  on table public.listings to authenticated;

-- Verification requests are created by the paid verification invoice/webhook
-- flow. Do not allow clients to create free or forged pending requests.
revoke insert on table public.seller_verifications from authenticated;
