-- Add seller_accepted to orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS seller_accepted BOOLEAN DEFAULT false;

-- Create chat-media bucket
insert into storage.buckets (id, name, public) 
values ('chat-media', 'chat-media', true) 
on conflict (id) do nothing;

create policy "Users can upload to chat-media"
  on storage.objects for insert
  with check (
    bucket_id = 'chat-media' and auth.role() = 'authenticated'
  );

create policy "Anyone can read chat-media"
  on storage.objects for select
  using ( bucket_id = 'chat-media' );
