-- Recipients may only mark their own messages read; message identity/content stay immutable.
revoke update on table public.messages from authenticated;
grant update (read) on table public.messages to authenticated;
