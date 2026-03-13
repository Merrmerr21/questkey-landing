# YieldKey — Full-Stack Platform

## Product Overview

YieldKey is a full-stack rental property investment platform. Users register, add properties, and receive analysis from a team of 15 AI agents spanning every business function.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS (artifacts/yieldkey, served at /)
- **API framework**: Express 5 (artifacts/api-server, served at /api)
- **Database**: PostgreSQL + Drizzle ORM
- **Auth**: JWT (30-day tokens) + bcryptjs password hashing
- **Validation**: Zod (server) + react-hook-form (client)
- **API codegen**: Orval from OpenAPI spec
- **Animations**: framer-motion
- **Icons**: lucide-react

## Structure

```
artifacts/
  yieldkey/                  # Landing page + full app (React + Vite)
    src/
      pages/
        Home.tsx              # Public landing page
        Login.tsx             # Login page
        Register.tsx          # Register page
        dashboard/
          Dashboard.tsx        # Property list dashboard
          PropertyDetail.tsx   # Per-property agent analysis
          Agents.tsx           # All 15 agents showcase
          Settings.tsx         # Account + subscription settings
      components/
        Layout.tsx             # Sidebar layout for dashboard
        AddPropertyModal.tsx   # Property creation form
        WaitlistForm.tsx       # Public waitlist form
        MockDashboard.tsx      # Hero section visual
      hooks/
        use-auth.ts            # Auth hooks (useUser, useLogin, useRegister, useLogout)
        use-properties.ts      # Property CRUD hooks
        use-analyses.ts        # Analysis hooks
      lib/
        api.ts                 # fetchApi utility (token injection, 401 handling)
        agents.ts              # Agent catalog constant
  api-server/                 # Express 5 backend
    src/
      routes/
        auth.ts                # POST /auth/register, /auth/login, /auth/logout, GET /auth/me
        properties.ts          # CRUD /properties + /properties/:id/analyses
        waitlist.ts            # POST /waitlist, GET /waitlist/export
      lib/
        auth.ts                # JWT sign/verify + requireAuth middleware

lib/
  db/src/schema/
    users.ts                  # users table
    properties.ts             # properties table
    analyses.ts               # analyses table
    waitlist.ts               # waitlist table
```

## Auth System

- JWT tokens stored in `localStorage` as `yk_token`
- 30-day expiry
- All dashboard routes protected — redirect to /login if no token
- 401 responses auto-clear token and redirect to /login
- Change JWT_SECRET env var in production

## The 15 Agent Roster

| Category | Name | Role |
|---|---|---|
| underwriting | Miles | Runs the numbers, STR/MTR/LTR comparison |
| acquisitions | Avery | Market fit and acquisition opportunity |
| risk | Rhea | Downside risk, regulation, weak assumptions |
| revenue | Kai | Pricing and revenue strategy |
| setup | Sloane | Setup, furnishing, guest-readiness |
| portfolio | Theo | Portfolio thinking, not one-off deals |
| accounting | Morgan | Income, expenses, financial reporting |
| tax | Quinn | Tax strategy, deductions, entity structure |
| financing | Blake | Loan options, rates, leverage strategy |
| marketing | Sage | Brand, listings, guest acquisition |
| legal | Drew | Contracts, compliance, liability |
| hr | Jordan | Hiring, contractors, team operations |
| operations | Casey | Systems, processes, efficiency |
| property_management | Riley | Tenant relations, maintenance, retention |
| design | Finley | Interior design, staging, visual appeal |

## Analysis Engine

Currently uses smart placeholder analysis responses per agent category. Once the master spreadsheet is provided, the `runAnalysis()` function in `artifacts/api-server/src/routes/properties.ts` should be updated to:
1. Parse the spreadsheet inputs for the property
2. Run calculations against the spreadsheet template
3. Return structured outputs per agent

## API Routes

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login |
| POST | /api/auth/logout | No | Logout |
| GET | /api/auth/me | Yes | Current user |
| GET | /api/properties | Yes | List user properties |
| POST | /api/properties | Yes | Add property |
| GET | /api/properties/:id | Yes | Get property |
| DELETE | /api/properties/:id | Yes | Delete property |
| GET | /api/properties/:id/analyses | Yes | List analyses |
| POST | /api/properties/:id/analyses | Yes | Run agent analysis |
| POST | /api/waitlist | No | Join waitlist |
| GET | /api/waitlist/export?adminKey= | No | Export waitlist CSV |

## Waitlist Export

```bash
curl "https://your-domain/api/waitlist/export?adminKey=yieldkey-admin" -o leads.csv
```

Set `ADMIN_KEY` env var to change the default key.

## Customization Priority

1. **Branding/logo** — `artifacts/yieldkey/src/components/Layout.tsx` and page headers
2. **Spreadsheet integration** — `artifacts/api-server/src/routes/properties.ts` → `runAnalysis()`
3. **Subscription tiers** — connect Stripe to `users.subscriptionTier`
4. **Agent copy** — `artifacts/yieldkey/src/lib/agents.ts`
5. **JWT secret** — Set `JWT_SECRET` env var in production
6. **Admin key** — Set `ADMIN_KEY` env var in production

## Running Locally

```bash
pnpm install
pnpm --filter @workspace/db run push
# Terminal 1: pnpm --filter @workspace/api-server run dev
# Terminal 2: pnpm --filter @workspace/yieldkey run dev
```
