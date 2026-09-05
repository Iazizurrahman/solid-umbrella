# Output Plan — nscale.com clone

Status: **blocked on browser automation** (see Pre-Flight Blocker below). No source files
have been modified. This plan is fixed and ready to execute once a browser MCP tool is available.

## Targets

| Field | Value |
| --- | --- |
| Source URL | `https://www.nscale.com/` |
| Normalized origin | `https://www.nscale.com` |
| Normalized pathname | `/` |
| Query / fragment state | none |

Exactly one target URL. No same-pathname query/fragment variants, no multi-origin conflict,
so a single `<app-root>` and a single shared foundation apply.

## Keys

- `<app-root>` = `.` (repository root — the existing Next.js 16 scaffold)
- `<site-key>` = `www-nscale-com-782295e3`
  - readable origin slug `www-nscale-com`, no non-default port
  - `782295e3` = first 8 hex chars of `SHA-256("https://www.nscale.com")`
- `<page-key>` = `root-8a5edab2`
  - pathname is `/`, so the `root-<hash>` form applies
  - `8a5edab2` = first 8 hex chars of `SHA-256("/")`

## Roots

| Purpose | Path |
| --- | --- |
| Artifact root | `docs/research/www-nscale-com-782295e3/root-8a5edab2/` |
| Component specs | `docs/research/www-nscale-com-782295e3/root-8a5edab2/components/` |
| Screenshot root | `docs/design-references/www-nscale-com-782295e3/root-8a5edab2/` |
| Component root | `src/components/sites/www-nscale-com-782295e3/root-8a5edab2/` |
| Same-site shared components | `src/components/sites/www-nscale-com-782295e3/shared/` |
| Asset root | `public/sites/www-nscale-com-782295e3/root-8a5edab2/` |
| Same-site shared assets | `public/sites/www-nscale-com-782295e3/shared/` |
| Download script | `scripts/download-assets-www-nscale-com-782295e3-root-8a5edab2.mjs` |

## Destination Route

`src/app/page.tsx` → serves the clone at `/`.

Justification: this is the first clone into an untouched template. `src/app/page.tsx` currently
contains only the scaffold placeholder ("Clone target not yet built. Run /clone-website to start."),
which the skill's routing defaults explicitly permit replacing for a first single-URL clone.

## Existing-Output Inventory (pre-run)

Verified before planning. Nothing here is user-authored work at risk:

- Routes: `src/app/page.tsx` (scaffold placeholder only), `src/app/layout.tsx` (Geist scaffold).
  No other `src/app/**/page.tsx` exists.
- `src/components/` — only `ui/button.tsx` (shadcn primitive). No `sites/` namespace yet.
- `public/images/`, `public/videos/`, `public/seo/` — all empty.
- `docs/research/` — only `INSPECTION_GUIDE.md`. No prior clone artifacts.
- `docs/design-references/` — only `comparison.png` (template README asset, unrelated).
- `scripts/` — `sync-agent-rules.sh`, `sync-skills.mjs`. No downloader name collision.

No collisions across any planned output. No explicitly approved replacement is required
beyond the scaffold `page.tsx`.

## Shared Foundation Files That Must Change

Single-site app, so these are edited globally rather than route-scoped:

1. `src/app/layout.tsx` — replace Geist with nscale.com's actual font families via
   `next/font`; set route metadata and favicon links.
2. `src/app/globals.css` — merge nscale.com's extracted design tokens into the Tailwind v4
   `@theme` block, mapped onto shadcn token names where they fit. No existing route depends
   on the current palette, so no scoping wrapper is needed.
3. `src/types/` — new namespaced content interfaces.
4. `src/components/sites/www-nscale-com-782295e3/shared/icons.tsx` — extracted SVGs.

## Baseline Verification

`npm run build` on the untouched scaffold: **passing** (Next.js 16.3.0 / Turbopack,
routes `/` and `/_not-found`).

## Pre-Flight Blocker

Browser automation is required by this skill and is not available in this session.
The Claude in Chrome extension is installed but its tools are not enabled. No other browser
MCP server (Playwright, Browserbase, Puppeteer) is connected.

Every downstream phase depends on it: full-page screenshots, `getComputedStyle()` extraction,
the mandatory interaction sweep (scroll/click/hover/responsive), per-state extraction, and
the Phase 5 visual QA diff. Fabricating any of these from memory of the site would violate
the skill's core contract.

To unblock: run `/chrome` to enable browser tools, or restart Claude Code for a one-time
enable prompt.
