-- This function is invoked only by the auth.users trigger. It is not an API
-- endpoint and must not be callable through PostgREST by client roles.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
