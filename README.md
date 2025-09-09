# Zolnoi Contact Form (Vite + React + Tailwind + Supabase)

A lightweight contact capture page for a startup (NASSCOM incubator showcase ready). Collects Name, Email, Company and stores submissions in a Supabase table `contact_submissions`.

## Stack

- Vite + React 18
- Tailwind CSS 3
- Supabase JS v2

## Quick Start

1. Install deps:
   ```bash
   npm install
   ```
2. Copy env:
   ```bash
   cp .env.example .env
   # then edit .env with your Supabase project values
   ```
3. Create the table in Supabase SQL editor:
   ```sql
   create table if not exists public.contact_submissions (
     id uuid primary key default gen_random_uuid(),
     name text not null,
     email text not null,
     company text not null,
     source text,
     created_at timestamptz default now()
   );
   -- (Optional) Add RLS
   alter table public.contact_submissions enable row level security;
   create policy "Allow insert" on public.contact_submissions for insert using (true) with check (true);
   ```
4. Run dev server:
   ```bash
   npm run dev
   ```

Visit http://localhost:5173

## Environment Variables

Defined in `.env` (never commit actual secrets):

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Notes

- Minimal client-side validation (presence + email format)
- Disabled button until valid
- Loading spinner + error state
- On success, shows founder connect panel with LinkedIn + Website links

## Production Build

```bash
npm run build
npm run preview
```

---

Built with care for fast iteration.
