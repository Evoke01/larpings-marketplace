ALTER TABLE public.listings ADD COLUMN IF NOT EXISTS views INT DEFAULT 0;
ALTER TABLE public.listings ADD COLUMN IF NOT EXISTS clicks INT DEFAULT 0;

CREATE OR REPLACE FUNCTION increment_listing_view(p_listing_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.listings SET views = COALESCE(views, 0) + 1 WHERE id = p_listing_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
