# DailyChapter

A production-ready reading tracker and habit formation web app built with Next.js, Supabase, and Vercel.

## Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, TanStack Query
- **Backend:** Supabase (PostgreSQL, Auth, Realtime)
- **Hosting:** Vercel
- **Observability:** Sentry (free tier)
- **Migrations:** GitHub Actions + Supabase CLI

## Project Structure

```
src/
├── app/           # Routes (landing, auth, dashboard, progress, settings, setup)
├── components/    # UI components
├── lib/           # Supabase clients, utilities (date, reading targets)
└── types/         # Database TypeScript types

supabase/
├── config.toml
└── migrations/    # Versioned SQL schema + RLS policies

legacy/            # Original vanilla JS prototype (reference)
```

## Getting Started

1. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

2. In Supabase Dashboard → Authentication → Providers, enable:
   - Email
   - Google OAuth
   - GitHub OAuth
   - Add redirect URL: `http://localhost:3000/auth/callback`

3. Install dependencies and run:

   ```bash
   npm install
   npm run dev
   ```

4. Apply migrations locally (requires [Supabase CLI](https://supabase.com/docs/guides/cli)):

   ```bash
   supabase start
   supabase db reset
   ```

## Auth & Onboarding Flow

1. Sign up via email/password, Google, or GitHub
2. New users are redirected to `/setup` to add books manually, import a template, or skip
3. After setup, users access `/dashboard`, `/progress`, and `/settings`
4. Timezone defaults to browser detection; override in Settings

## Development: Mock Date

Set `NEXT_PUBLIC_MOCK_DATE=YYYY-MM-DD` in `.env.local` to test streak and calendar logic without changing production code.

## Database

See `supabase/migrations/20250614000001_initial_schema.sql` for the full schema with Row Level Security on all user tables.

New users start with an **empty curriculum** and editable defaults for categories and reading identity levels.

## Legacy Prototype

The original single-file prototype lives in `legacy/` for reference during the UI port.
