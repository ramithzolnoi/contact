-- Run this in Supabase SQL editor to create the table used by the app
create extension if not exists pgcrypto;

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text not null,
  source text,
  created_at timestamptz default now()
);

alter table public.contact_submissions enable row level security;
-- For INSERT policies only WITH CHECK is valid (USING not allowed) -> removing USING fixes 42601 error
create policy "Allow inserts" on public.contact_submissions for insert with check (true);

-- Enforce uniqueness on email (case-insensitive) to prevent duplicates
create unique index if not exists contact_submissions_email_lower_idx
  on public.contact_submissions (lower(email));
