-- Clearly marked sandbox fixture for exercising the hosted checkout.
insert into public.listings (seller_id, handle, description, category, platform, price, status)
select '68b0e8e8-2eca-4ab9-b9b1-06dedbbccafa'::uuid,
       'sandbox-payment-test',
       'TEST ONLY — sandbox payment-flow listing. Do not purchase as a real item.',
       'service',
       'sandbox',
       1.00,
       'active'
where not exists (select 1 from public.listings where handle = 'sandbox-payment-test');
