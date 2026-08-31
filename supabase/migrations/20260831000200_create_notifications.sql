CREATE TABLE IF NOT EXISTS public.notifications (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.profiles(id) on delete cascade not null,
    type text not null,
    title text not null,
    content text not null,
    link text,
    is_read boolean default false,
    created_at timestamptz default now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

drop policy if exists "Users can view their own notifications" on public.notifications;
CREATE POLICY "Users can view their own notifications" 
ON public.notifications FOR SELECT 
USING (auth.uid() = user_id);

drop policy if exists "Users can update their own notifications" on public.notifications;
CREATE POLICY "Users can update their own notifications" 
ON public.notifications FOR UPDATE 
USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION notify_seller_on_order()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.notifications (user_id, type, title, content, link)
    SELECT seller_id, 'order', 'New Order Received', 'An order has been placed for your listing.', '/dashboard'
    FROM public.listings WHERE id = NEW.listing_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

drop trigger if exists on_new_order on public.orders;
CREATE TRIGGER on_new_order
AFTER INSERT ON public.orders
FOR EACH ROW EXECUTE FUNCTION notify_seller_on_order();

CREATE OR REPLACE FUNCTION notify_on_message()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.notifications (user_id, type, title, content, link)
    VALUES (NEW.receiver_id, 'message', 'New Message', 'You have received a new private message.', '/messages?user=' || NEW.sender_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

drop trigger if exists on_new_message on public.messages;
CREATE TRIGGER on_new_message
AFTER INSERT ON public.messages
FOR EACH ROW EXECUTE FUNCTION notify_on_message();

CREATE OR REPLACE FUNCTION notify_on_order_message()
RETURNS trigger AS $$
DECLARE
    order_buyer_id uuid;
    order_seller_id uuid;
    recipient_id uuid;
BEGIN
    SELECT buyer_id INTO order_buyer_id FROM public.orders WHERE id = NEW.order_id;
    SELECT seller_id INTO order_seller_id FROM public.listings l JOIN public.orders o ON o.listing_id = l.id WHERE o.id = NEW.order_id;
    
    IF NEW.sender_id = order_buyer_id THEN
        recipient_id := order_seller_id;
    ELSE
        recipient_id := order_buyer_id;
    END IF;

    IF recipient_id IS NOT NULL THEN
        INSERT INTO public.notifications (user_id, type, title, content, link)
        VALUES (recipient_id, 'message', 'New Deal Message', 'You have received a new message regarding your deal.', '/messages?order=' || NEW.order_id);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

drop trigger if exists on_new_order_message on public.order_messages;
CREATE TRIGGER on_new_order_message
AFTER INSERT ON public.order_messages
FOR EACH ROW EXECUTE FUNCTION notify_on_order_message();
