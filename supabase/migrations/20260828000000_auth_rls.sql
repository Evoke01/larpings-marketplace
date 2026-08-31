-- Marketplace authorization. Authenticated users may only mutate their own
-- marketplace data; the database remains the final enforcement layer.

alter table if exists public.profiles enable row level security;

alter table if exists public.profiles add column if not exists display_name text;
alter table if exists public.profiles add column if not exists bio text;
alter table if exists public.profiles add column if not exists avatar_url text;
alter table if exists public.profiles add column if not exists banner_url text;
alter table if exists public.profiles add column if not exists website_url text;
alter table if exists public.profiles add column if not exists twitter_url text;
alter table if exists public.profiles add column if not exists instagram_url text;
alter table if exists public.profiles add column if not exists discord_url text;

insert into storage.buckets (id, name, public)
values ('profile-media', 'profile-media', true)
on conflict (id) do update set public = true;

drop policy if exists "public profile media is readable" on storage.objects;
create policy "public profile media is readable" on storage.objects for select to anon, authenticated
using (bucket_id = 'profile-media');

drop policy if exists "users can upload profile media" on storage.objects;
create policy "users can upload profile media" on storage.objects for insert to authenticated
with check (bucket_id = 'profile-media' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "users can update profile media" on storage.objects;
create policy "users can update profile media" on storage.objects for update to authenticated
using (bucket_id = 'profile-media' and owner_id = (select auth.uid())::text)
with check (bucket_id = 'profile-media' and owner_id = (select auth.uid())::text);

drop policy if exists "users can delete profile media" on storage.objects;
create policy "users can delete profile media" on storage.objects for delete to authenticated
using (bucket_id = 'profile-media' and owner_id = (select auth.uid())::text);
alter table if exists public.listings enable row level security;
alter table if exists public.orders enable row level security;
alter table if exists public.messages enable row level security;

do $$
begin
  if to_regclass('public.profiles') is not null then
    execute 'drop policy if exists "public profiles are readable" on public.profiles';
    execute 'drop policy if exists "users can update their profile" on public.profiles';
    execute 'drop policy if exists "public profiles are readable" on public.profiles;
create policy "public profiles are readable" on public.profiles for select to anon, authenticated using (true)';
    execute 'drop policy if exists "users can update their profile" on public.profiles;
create policy "users can update their profile" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id)';
  end if;

  if to_regclass('public.listings') is not null then
    execute 'drop policy if exists "active listings are public" on public.listings';
    execute 'drop policy if exists "sellers can create listings" on public.listings';
    execute 'drop policy if exists "sellers can update their listings" on public.listings';
    execute 'drop policy if exists "sellers can delete their listings" on public.listings';
    execute 'drop policy if exists "active listings are public" on public.listings;
create policy "active listings are public" on public.listings for select to anon, authenticated using (status = ''active'' or (select auth.uid()) = seller_id)';
    execute 'drop policy if exists "sellers can create listings" on public.listings;
create policy "sellers can create listings" on public.listings for insert to authenticated with check ((select auth.uid()) = seller_id)';
    execute 'drop policy if exists "sellers can update their listings" on public.listings;
create policy "sellers can update their listings" on public.listings for update to authenticated using ((select auth.uid()) = seller_id) with check ((select auth.uid()) = seller_id)';
    execute 'drop policy if exists "sellers can delete their listings" on public.listings;
create policy "sellers can delete their listings" on public.listings for delete to authenticated using ((select auth.uid()) = seller_id)';
  end if;

  if to_regclass('public.orders') is not null then
    execute 'drop policy if exists "buyers can read their orders" on public.orders';
    execute 'drop policy if exists "buyers can confirm their orders" on public.orders';
    execute 'drop policy if exists "buyers can read their orders" on public.orders;
create policy "buyers can read their orders" on public.orders for select to authenticated using ((select auth.uid()) = buyer_id' || case when exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'orders' and column_name = 'seller_id') then ' or (select auth.uid()) = seller_id' else '' end || ')';
    execute 'drop policy if exists "buyers can confirm their orders" on public.orders;
create policy "buyers can confirm their orders" on public.orders for update to authenticated using ((select auth.uid()) = buyer_id) with check ((select auth.uid()) = buyer_id)';
  end if;

  if to_regclass('public.messages') is not null then
    execute 'drop policy if exists "participants can read messages" on public.messages';
    execute 'drop policy if exists "users can send their own messages" on public.messages';
    execute 'drop policy if exists "recipients can update messages" on public.messages';
    execute 'drop policy if exists "participants can read messages" on public.messages;
create policy "participants can read messages" on public.messages for select to authenticated using ((select auth.uid()) = sender_id or (select auth.uid()) = receiver_id)';
    execute 'drop policy if exists "users can send their own messages" on public.messages;
create policy "users can send their own messages" on public.messages for insert to authenticated with check ((select auth.uid()) = sender_id)';
    execute 'drop policy if exists "recipients can update messages" on public.messages;
create policy "recipients can update messages" on public.messages for update to authenticated using ((select auth.uid()) = receiver_id) with check ((select auth.uid()) = receiver_id)';
  end if;
end $$;

-- Keep the profile bootstrap trigger idempotent. The username is profile data,
-- never an authorization claim.
do $$
begin
  if to_regclass('public.profiles') is not null
     and exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'profiles' and column_name = 'username') then
    execute $fn$
      create or replace function public.handle_new_user()
      returns trigger
      language plpgsql
      security definer set search_path = public
      as $body$
      begin
        insert into public.profiles (id, username)
        values (new.id, nullif(new.raw_user_meta_data ->> 'username', ''))
        on conflict (id) do nothing;
        return new;
      end;
      $body$;
    $fn$;
    execute 'revoke all on function public.handle_new_user() from public';
    execute 'drop trigger if exists on_auth_user_created on auth.users';
    execute 'drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user()';
  end if;
end $$;
