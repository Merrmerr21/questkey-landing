# CLAUDE.md — QuestKey App (Post-Landing Page)

## Project Overview

QuestKey is an AI-powered rental property underwriting platform. This CLAUDE.md governs
the build of everything **after** the marketing landing page: onboarding, the main app
dashboard, the property analysis flow, and account/settings pages. The deliverable is a
**single `index.html` file** — a fully functional static prototype using Tailwind CSS via CDN.

---

## What You Are Building

Four interconnected views rendered inside one `index.html`. Navigation between views is
handled with vanilla JS (show/hide sections — no page reloads).

| View | Route ID | Description |
|------|----------|-------------|
| Onboarding | `#onboarding` | Sign-up / account creation + strategy selection wizard |
| Dashboard | `#dashboard` | Property portfolio overview, recent analyses, quick-start CTA |
| Analysis | `#analysis` | Six-agent sequential underwriting flow (Avery → Rex → Rhea → Sloane → Uri → Pax) |
| Settings | `#settings` | Account info, subscription tier, notification prefs, connected integrations |

---

## Brand & Visual Identity

Match QuestKey's existing landing page aesthetic exactly. Extract color tokens, font
choices, spacing scale, and border radii from the reference image(s) provided before
writing a single line of CSS.

### Design Tone
- **Refined data-tool** — not playful, not corporate. Think: Bloomberg terminal meets
  modern fintech. Dense but legible. Dark-mode first.
- Typography: use a distinctive monospaced or geometric display font for numbers/data
  (e.g., IBM Plex Mono, Azeret Mono, DM Mono) paired with a clean sans for body copy.
  Avoid Inter, Roboto, Arial.
- Color palette anchor: deep navy/slate backgrounds, sharp accent (amber, emerald, or
  teal — match landing page), warm white/off-white text. Use CSS variables:

```css
:root {
  --qk-bg:         /* extracted from reference */;
  --qk-surface:    /* card/panel background */;
  --qk-border:     /* subtle border color */;
  --qk-accent:     /* primary CTA / highlight color */;
  --qk-accent-dim: /* muted version of accent */;
  --qk-text:       /* primary text */;
  --qk-muted:      /* secondary/label text */;
  --qk-success:    /* positive delta, green */;
  --qk-warning:    /* caution, amber */;
  --qk-danger:     /* red flags */;
}
```

---

## Six Agents — Core Product Logic

The Analysis view is the heart of QuestKey. It runs six AI agents **sequentially**.
Each agent has a name, role, and output section. Render them as a vertical stepper
(left sidebar or top progress rail) with collapsible output panels.

| # | Agent | Role |
|---|-------|------|
| 1 | **Avery** | Property intake & data normalization |
| 2 | **Rex** | Rental market comps & demand analysis |
| 3 | **Rhea** | Revenue projection (STR / MTR / LTR) |
| 4 | **Sloane** | Expense modeling & NOI calculation |
| 5 | **Uri** | Financing & debt service analysis |
| 6 | **Pax** | Final risk score, recommendation, summary memo |

Each agent card shows:
- Agent name + role tag
- Status badge: `Pending` / `Running` (animated pulse) / `Complete` / `Flagged`
- Collapsible output body (key metrics table + narrative paragraph)
- A "View Details" expand button

Pax's output includes a final **QuestKey Score** (0–100 gauge) and a one-page
underwriting summary memo that can be printed/exported.

---

## Onboarding Flow

A multi-step wizard. Do NOT use a `<form>` tag — use `div` + `onClick` handlers.

**Steps:**
1. **Welcome** — Logo, headline, "Let's set up your QuestKey account"
2. **Account info** — Name, email, password fields (styled inputs, no native browser UI)
3. **Strategy selection** — Radio/card picker: STR | MTR | LTR | All Three
4. **Market focus** — Checkbox list of states/metros they invest in
5. **Connect data** — Optional: upload a property CSV or skip
6. **Done** — Animated checkmark, "Go to Dashboard" CTA

Progress bar at top. Back/Next buttons. Each step validates before advancing.

---

## Dashboard Layout

Two-column layout (sidebar + main content) on desktop. Single column on mobile.

**Left Sidebar:**
- QuestKey logo + wordmark
- Nav links: Dashboard, New Analysis, Properties, Reports, Settings
- User avatar + name + tier badge (Free / Pro / Unlimited) at bottom

**Main Content:**
- Header row: "Good morning, [Name]" + "New Analysis" primary button
- **Stats row** (4 cards): Properties Analyzed · Avg QuestKey Score · Best Deal (address) · Analyses This Month
- **Recent Analyses table**: Address | Strategy | Score | Status | Date | Actions
- **Quick Start CTA** (if 0 analyses): large empty-state card with upload prompt

---

## Analysis View

Triggered by clicking "New Analysis" or a row in the Recent Analyses table.

**Layout:**
- Top bar: property address (editable inline) + strategy toggle (STR / MTR / LTR)
- Left rail: vertical agent stepper (names + status icons)
- Main panel: active agent's output card, expands to full width
- Right panel (collapsible): raw input data / assumptions editor

**Interaction flow (simulated — no real API calls in prototype):**
- "Run Analysis" button triggers a fake async sequence
- Each agent's status badge animates from Pending → Running (500ms) → Complete
- Output panels populate with realistic placeholder data
- After Pax completes, the QuestKey Score gauge animates to its value
- "Export Memo" button appears, triggers browser print dialog

---

## Settings View

Four tab sections (horizontal tabs):

1. **Account** — Name, email, password change, profile photo placeholder
2. **Subscription** — Current plan card, upgrade CTA, billing history table
3. **Notifications** — Toggle switches for email/in-app alerts
4. **Integrations** — Cards for: Zillow, CoStar, Airbnb (connected status + connect/disconnect button)

---

## Technical Requirements

### Stack
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Vanilla JS only — no React, no Vue, no build step
- All views in a single `index.html`
- Placeholder images from `https://placehold.co/`
- Google Fonts loaded via `<link>` in `<head>`

### Navigation
```js
function showView(id) {
  document.querySelectorAll('.qk-view').forEach(v => v.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
```
Each view div has class `qk-view` and a unique id (`onboarding`, `dashboard`, `analysis`, `settings`).

### No `<form>` Tags
Use `<div>` containers with `onClick` / `onChange` handlers for all interactive inputs.
Native browser form submission must never fire.

### Responsive
- Mobile breakpoint: `< 768px` → single column, sidebar becomes bottom nav bar
- Desktop: full two-column layout with fixed sidebar

### Animations
- Agent status transitions: CSS `transition` on badge color + a pulsing ring on `Running`
- QuestKey Score gauge: SVG circle stroke-dashoffset animation on mount
- Onboarding step transitions: slide-left/right with CSS `transform + opacity`
- Page load: staggered fade-in on dashboard stat cards (`animation-delay`)

---

## Screenshot & Comparison Workflow

After generating the file:

1. Screenshot the full page with Puppeteer
2. Screenshot each view individually (onboarding, dashboard, analysis, settings)
3. Compare against reference image(s). Check:
   - Spacing/padding (px-level accuracy)
   - Font sizes, weights, line heights
   - Exact hex colors — use eyedropper on reference if needed
   - Card border radii, shadows, divider lines
   - Icon sizing and alignment
   - Table column widths and row heights
4. Fix every mismatch. Re-screenshot.
5. Repeat until delta is ≤ 3px everywhere.
6. Do NOT stop after one pass. Minimum 2 comparison rounds.

---

## What NOT To Do

- Do not add features not listed in this file
- Do not use purple gradients, Inter font, or generic SaaS aesthetics
- Do not use `<form>` tags anywhere
- Do not use localStorage or sessionStorage
- Do not link to external JS libraries beyond Tailwind CDN
- Do not "improve" the design beyond what the reference shows — match it exactly
- Do not use placeholder text like "Lorem ipsum" — use realistic real-estate data

---

## Realistic Placeholder Data

Use these throughout the prototype:

**Properties:**
- 4218 Cedar Falls Rd, Memphis TN — LTR — Score: 74
- 812 Birchwood Ave, Little Rock AR — MTR — Score: 88
- 3301 Lake Shore Dr, Minneapolis MN — STR — Score: 61
- 7704 Ridgeline Ct, Fayetteville AR — LTR — Score: 79

**User:** Alex Merritt · Pro Plan · alex@questkey.com

**Stats:** 14 properties analyzed · Avg score 75.5 · Best deal: 812 Birchwood Ave · 3 analyses this month.
