-- Webfit Solutions Limited - Industry Experience Programme
-- Run this entire script once in a NEW Supabase project's SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.industry_experience_applications (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  first_name text not null,
  last_name text not null,
  email text not null,
  mobile text not null,
  city text not null,
  linkedin_url text,

  institution text,
  qualification text,
  study_area text,
  graduation_date date,

  visa_type text not null,
  visa_expiry date,
  visa_work_eligibility text not null check (visa_work_eligibility in ('Yes','No','Unsure')),
  target_role text not null,

  track_slug text not null,
  track_name text not null,
  package_code text not null,
  package_name text not null,
  duration_months integer not null check (duration_months in (1,3,6)),
  fee_nzd numeric(10,2) not null check (fee_nzd >= 0),

  availability text,
  hours_per_week integer check (hours_per_week is null or (hours_per_week between 1 and 40)),
  notes text,

  nda_accepted boolean not null default false,
  nda_accepted_at timestamptz,
  terms_accepted boolean not null default false,
  terms_accepted_at timestamptz,
  privacy_accepted boolean not null default false,
  visa_declaration_accepted boolean not null default false,

  status text not null default 'submitted' check (status in ('submitted','under_review','approved','rejected','active','completed','withdrawn','cancelled')),
  payment_status text not null default 'not_requested' check (payment_status in ('not_requested','pending','paid','failed','refunded','waived')),
  stripe_customer_id text,
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  paid_at timestamptz,

  intake_date date,
  start_date date,
  completion_date date,
  verification_code text unique,
  internal_notes text,
  source text not null default 'webfitt.co.nz'
);

create index if not exists idx_industry_exp_email on public.industry_experience_applications (lower(email));
create index if not exists idx_industry_exp_status on public.industry_experience_applications (status);
create index if not exists idx_industry_exp_track on public.industry_experience_applications (track_slug);
create index if not exists idx_industry_exp_created on public.industry_experience_applications (created_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_industry_experience_updated_at on public.industry_experience_applications;
create trigger trg_industry_experience_updated_at
before update on public.industry_experience_applications
for each row execute function public.set_updated_at();

-- Browser/client access is intentionally blocked. All writes go through Webfit server routes
-- using SUPABASE_SERVICE_ROLE_KEY, which must never be exposed in NEXT_PUBLIC variables.
alter table public.industry_experience_applications enable row level security;

revoke all on table public.industry_experience_applications from anon, authenticated;

-- Optional public verification view for a later /verify/[code] page.
create or replace view public.industry_experience_public_verification as
select
  verification_code,
  first_name,
  last_name,
  track_name,
  start_date,
  completion_date,
  status
from public.industry_experience_applications
where status = 'completed' and verification_code is not null;

revoke all on public.industry_experience_public_verification from anon, authenticated;
