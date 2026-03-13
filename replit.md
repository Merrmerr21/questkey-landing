# YieldKey Workspace

## Overview

pnpm workspace monorepo using TypeScript. Full-stack landing page for YieldKey — a rental property investment analysis platform.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS (artifacts/yieldkey)
- **API framework**: Express 5 (artifacts/api-server)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Forms**: react-hook-form + @hookform/resolvers
- **Animations**: framer-motion
- **Icons**: lucide-react

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── yieldkey/               # YieldKey landing page (React + Vite, served at /)
│   └── api-server/             # Express API server (served at /api)
├── lib/
│   ├── api-spec/               # OpenAPI spec + Orval codegen config
│   ├── api-client-react/       # Generated React Query hooks
│   ├── api-zod/                # Generated Zod schemas from OpenAPI
│   └── db/                     # Drizzle ORM schema + DB connection
│       └── src/schema/
│           └── waitlist.ts     # Waitlist table schema
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Waitlist System

### How it works

- Users submit their name, email, and investor type via the form on the landing page
- POST `/api/waitlist` stores the entry in PostgreSQL
- Duplicate emails are rejected with a 409 response
- Success response includes the user's position number on the waitlist

### Where signups are stored

PostgreSQL table: `waitlist`
Columns: `id`, `first_name`, `email`, `investor_type`, `created_at`, `ip_address`

### How to export leads

```bash
# Replace 'yieldkey-admin' with your ADMIN_KEY env var (or use the default)
curl "https://your-domain.replit.app/api/waitlist/export?adminKey=yieldkey-admin" -o waitlist.csv
```

Set `ADMIN_KEY` environment variable to change the default admin key.

## Running Locally

```bash
# Install dependencies
pnpm install

# Push DB schema
pnpm --filter @workspace/db run push

# Start API server
pnpm --filter @workspace/api-server run dev

# Start frontend (separate terminal)
pnpm --filter @workspace/yieldkey run dev
```

## API Routes

- `POST /api/waitlist` — join the waitlist
- `GET /api/waitlist/export?adminKey=<key>` — export all entries as CSV
- `GET /api/healthz` — health check

## Customization Guide

### What to swap first:
1. **Branding** — `artifacts/yieldkey/src/App.tsx` and nav logo in `Home.tsx`
2. **Color theme** — `artifacts/yieldkey/src/index.css` (CSS variables)
3. **Copy** — `artifacts/yieldkey/src/pages/Home.tsx`
4. **Agent avatars** — `artifacts/yieldkey/src/pages/Home.tsx` (team section)
5. **Admin key** — Set `ADMIN_KEY` environment variable
6. **Dashboard mockup** — `artifacts/yieldkey/src/components/MockDashboard.tsx`

## TypeScript & Composite Projects

- `lib/*` packages are composite and emit declarations via `tsc --build`.
- Root `tsconfig.json` is a solution file for libs only.
- Always typecheck from root: `pnpm run typecheck`
