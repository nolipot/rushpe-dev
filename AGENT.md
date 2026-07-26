# AGENT.md

The public website for Rutgers SHPE (Society of Hispanic Professional Engineers): a Next.js 14 App Router site with marketing pages, an executive-board directory, event listings, an alumni spotlight, and a client-side merch shop preview. Most content lives in colocated TypeScript data files rather than a CMS, so editing a section usually means editing a `.ts` file, not wiring a backend.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve a production build
npm run lint     # next lint (next/core-web-vitals)
```

There is no test runner in this repo (no Jest/Vitest/Playwright) — don't assume one. Deploys go through Vercel (see `vercel.json`); there is no manual deploy command.

## Directory structure

- `src/app/*` — App Router routes; most are static marketing pages. Route-specific UI, data, and CSS live inside each route folder.
- `src/app/api/*/route.ts` — three example/scaffold endpoints (`test`, `azure-test`, `calendar`) demoing Firestore+Storage, MSSQL insert, and Google Calendar read. Reference patterns, not production-hardened.
- `src/components/*` — site-wide shared components only (navbar, footer, event calendar, carousels). Route-local components do NOT go here.
- `backend.ts` (repo root, outside `src/`) — initializes and exports shared clients: Firebase (`db`, `fireStorage`), MSSQL/Azure (`msDatabase`, `azureConfig`), Google API deps.
- `public/*` — static image/font assets, deployed as-is (see Images convention).
- `src/types/` — global type/style declarations (`styles.d.ts`).

## Conventions

- **Content-as-data**: Sections are driven by plain TS files colocated with the route, not a database. Key files: `src/app/shop/data.ts` (products), `src/app/executive-board/eboard-data-<year>.ts` (one per year), `src/app/corporate/data/*.ts` (sponsors), `src/app/ru-shine/data.ts` (alumni). Read the file's own header comments before editing.
- **Adding an e-board year**: create a new `eboard-data-<year>.ts` AND push it into the `PREVIOUS_BOARDS` array in `executive-board/page.tsx` — the file alone does nothing.
- **Adding an `/info/*` page**: add a component and register it in the `linkMap` lookup in `src/app/info/[infoPage]/page.tsx`. Do not create a new route folder.
- **Shared vs. route-local UI**: put route-specific components/CSS under `src/app/<route>/`; only truly site-wide components go in `src/components/`. Check the route folder first.
- **Component CSS pairing**: complex hand-written styles live in a `*.component.css` / `*-page.css` file next to the component, layered on top of Tailwind for effects utilities can't cover cleanly.
- **Path alias**: `@/*` → `./src/*` (`tsconfig.json`). `backend.ts` lives outside `src/`, so API routes import it by relative path (e.g. `../../../../backend`), not the alias.
- **Images**: `next.config.mjs` sets `images.unoptimized: true` — `next/image` does no optimization; assets ship from `public/` as-is.
- **Styling**: Tailwind (`tailwind.config.ts`) with a small custom palette (`main`, `main-hover`, `light-main`, `dark-main` — SHPE red) and a custom `alex` font family.

## Domain jargon

- **e-board / eboard** — executive board (the officer directory).
- **RU-SHINE** — alumni spotlight section (`src/app/ru-shine/`).
- **SHPEtinas**, **estamos-aqui**, **shadow-program** — named program/marketing routes under `src/app/`.
- **Shop** — merch preview with no real backend: cart state is in `localStorage` (`SHOP_CART_STORAGE_KEY`); "checkout" hands off to a Google Form (`SHOP_GOOGLE_FORM_URL`).

## Boundaries

- `.env` is gitignored and holds real credentials (Firebase, MSSQL, Google, Supabase) — never commit it or paste its values.
- Don't hand-edit generated/vendored paths: `node_modules/`, `.next/`, `next-env.d.ts`.
- **Security issue — flag, don't normalize**: `src/app/api/calendar/route.ts` has a Google service-account private key hardcoded in source and committed to git history. If you touch this file, tell the user: it should be rotated and read from `GOOGLE_CLIENT_EMAIL`/`GOOGLE_CLIENT_KEY` (already in `.env`, currently unused).

## Child AGENT.md candidates

These directories have enough self-contained conventions to warrant their own child AGENT.md if they grow: `src/app/shop/` (data-file catalog format, localStorage cart, Google Form checkout), `src/app/executive-board/` (per-year data + `PREVIOUS_BOARDS` registration), `src/app/corporate/` (tiered sponsor data typed via `data/types.ts`).

## Pointers

- `README.md` — default create-next-app getting-started + Vercel deploy notes.
- Next.js App Router docs for routing/data-fetching specifics.
