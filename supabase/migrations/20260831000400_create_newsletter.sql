CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id uuid primary key default gen_random_uuid(),
    email text unique not null,
    created_at timestamptz default now()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe" 
ON public.newsletter_subscribers FOR INSERT 
WITH CHECK (true);
