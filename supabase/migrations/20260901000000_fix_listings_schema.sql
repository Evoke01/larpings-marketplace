ALTER TABLE public.listings ADD CONSTRAINT listings_price_check CHECK (price > 0);
