-- MAS Alpha Securities — "leads" table for partner inquiries.
-- Run once in the Supabase SQL editor. The contact API route inserts with the
-- service-role key (bypasses RLS); RLS denies everything to anon/authenticated.

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  message     text,
  source      text not null default 'website',
  user_agent  text,
  status      text not null default 'new'
);

alter table public.leads enable row level security;
-- No policies on purpose: anon/authenticated get nothing; service role bypasses RLS.

comment on table public.leads is 'Partner inquiries from the marketing site contact form.';
