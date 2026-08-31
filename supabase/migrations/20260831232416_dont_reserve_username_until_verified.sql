-- Delete profiles that belong to unverified users to free up their usernames
delete from public.profiles
where id in (
  select id from auth.users where email_confirmed_at is null
);

-- Update the handle_new_user trigger to only create profiles for verified users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $body$
declare
  v_username text;
  v_count int;
begin
  if new.email_confirmed_at is not null then
    v_username := nullif(new.raw_user_meta_data ->> 'username', '');
    
    if v_username is not null then
      select count(*) into v_count from public.profiles where username = v_username;
      if v_count > 0 then
        v_username := null;
      end if;
    end if;

    insert into public.profiles (id, username)
    values (new.id, v_username)
    on conflict (id) do nothing;
  end if;
  return new;
end;
$body$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert or update on auth.users
for each row
execute procedure public.handle_new_user();
