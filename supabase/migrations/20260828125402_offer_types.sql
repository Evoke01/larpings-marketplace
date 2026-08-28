-- Product-specific listing metadata. Existing listings remain valid with an empty object.
alter table public.listings
  add column if not exists details jsonb not null default '{}'::jsonb;

alter table public.listings
  drop constraint if exists listings_details_object_check;

alter table public.listings
  add constraint listings_details_object_check
  check (jsonb_typeof(details) = 'object');

comment on column public.listings.details is
  'Structured offer data: fansign recipient/message/delivery or service category/subcategory/options.';
