-- Update Orders RLS for Middlemen
CREATE POLICY "Middlemen can view their assigned orders"
  ON public.orders FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = mm_id);

CREATE POLICY "Middlemen can update their assigned orders"
  ON public.orders FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = mm_id)
  WITH CHECK ((SELECT auth.uid()) = mm_id);

-- Update Order Messages RLS for Middlemen
CREATE POLICY "Middlemen can view messages for their orders"
  ON public.order_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_messages.order_id
      AND orders.mm_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Middlemen can insert messages for their orders"
  ON public.order_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    (SELECT auth.uid()) = sender_id AND
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_messages.order_id
      AND orders.mm_id = (SELECT auth.uid())
    )
  );

-- Update Profiles RLS for Middlemen fields
GRANT UPDATE (mm_fee_percent, mm_fee_flat, mm_bio) ON TABLE public.profiles TO authenticated;

-- Allow buyers to assign an MM to an order if it's currently NULL
CREATE POLICY "Buyers can assign an MM to their pending orders"
  ON public.orders FOR UPDATE
  TO authenticated
  USING (
    (SELECT auth.uid()) = buyer_id AND mm_id IS NULL
  )
  WITH CHECK (
    (SELECT auth.uid()) = buyer_id
  );
