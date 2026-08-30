-- Add Middleman fields to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_middleman BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS mm_fee_percent NUMERIC(5,2) DEFAULT 0.00;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS mm_fee_flat NUMERIC(10,2) DEFAULT 0.00;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS mm_bio TEXT;

-- Add Middleman fields to orders
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS mm_id UUID REFERENCES public.profiles(id);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS mm_fee NUMERIC(10,2);
