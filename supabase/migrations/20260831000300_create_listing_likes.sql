CREATE TABLE IF NOT EXISTS public.listing_likes (
    user_id uuid references public.profiles(id) on delete cascade not null,
    listing_id uuid references public.listings(id) on delete cascade not null,
    created_at timestamptz default now(),
    primary key (user_id, listing_id)
);

ALTER TABLE public.listing_likes ENABLE ROW LEVEL SECURITY;

drop policy if exists "Users can insert their own likes" on public.listing_likes;
CREATE POLICY "Users can insert their own likes" 
ON public.listing_likes FOR INSERT 
WITH CHECK (auth.uid() = user_id);

drop policy if exists "Users can delete their own likes" on public.listing_likes;
CREATE POLICY "Users can delete their own likes" 
ON public.listing_likes FOR DELETE 
USING (auth.uid() = user_id);

drop policy if exists "Anyone can view likes" on public.listing_likes;
CREATE POLICY "Anyone can view likes" 
ON public.listing_likes FOR SELECT 
USING (true);

ALTER TABLE public.listings ADD COLUMN IF NOT EXISTS likes_count INT DEFAULT 0;

CREATE OR REPLACE FUNCTION update_listing_likes_count()
RETURNS trigger AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    UPDATE public.listings SET likes_count = COALESCE(likes_count, 0) + 1 WHERE id = NEW.listing_id;
    RETURN NEW;
  ELSIF (TG_OP = 'DELETE') THEN
    UPDATE public.listings SET likes_count = GREATEST(COALESCE(likes_count, 0) - 1, 0) WHERE id = OLD.listing_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

drop trigger if exists on_like_inserted on public.listing_likes;
CREATE TRIGGER on_like_inserted
AFTER INSERT ON public.listing_likes
FOR EACH ROW EXECUTE FUNCTION update_listing_likes_count();

drop trigger if exists on_like_deleted on public.listing_likes;
CREATE TRIGGER on_like_deleted
AFTER DELETE ON public.listing_likes
FOR EACH ROW EXECUTE FUNCTION update_listing_likes_count();
