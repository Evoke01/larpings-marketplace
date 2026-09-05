-- Fix: handle_new_user trigger was inserting NULL into profiles.username (NOT NULL column)
-- when no username was provided in raw_user_meta_data, causing "Database error granting user".
-- Now auto-generates a username from email prefix + random 4-digit suffix if needed.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
declare
  v_username text;
  v_count int;
begin
  if new.email_confirmed_at is not null then
    -- Try to use the username from metadata
    v_username := nullif(trim(new.raw_user_meta_data ->> 'username'), '');

    -- If username is absent, generate one from email prefix
    if v_username is null then
      v_username := split_part(new.email, '@', 1);
      -- Sanitise: keep only alphanumeric and underscores
      v_username := regexp_replace(v_username, '[^a-zA-Z0-9_]', '', 'g');
      -- Ensure it's not empty after sanitising
      if v_username = '' then
        v_username := 'user';
      end if;
    end if;

    -- Append random 4-digit suffix until unique
    loop
      select count(*) into v_count from public.profiles where username = v_username;
      exit when v_count = 0;
      v_username := v_username || floor(random() * 9000 + 1000)::text;
    end loop;

    insert into public.profiles (id, username)
    values (new.id, v_username)
    on conflict (id) do nothing;
  end if;
  return new;
end;
$$;
