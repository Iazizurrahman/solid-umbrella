# Overnight run — log

Branch: `exp-overnight`. Started from `57cdd83` (clean tree).

Standing constraints for the whole run:

- Nothing from **§0 of `docs/daita-rebrand.md`** is added, restored or invented. No
  investor logos, no funding claim, no percentage outcome claims, no "rated 5/5", no
  chasing/delay/leakage figures, no factory or user counts, no real client names, no
  "Rajneesh Kumarin". The only permitted real numbers (85→75 days, 90%→94%) stay gated
  behind §1.7 sign-off and are not used here.
- All demo data is fictional and labelled as such on screen.
- `TESTIMONIAL_SIGNED_OFF` and everything behind it is untouched.
- Design tokens are used exactly as built. No new colour, type or spacing tokens.
- Nothing is pushed. Nothing is deployed.

---

## Phase 1 — TNA Engine interactive demo (`/platform`)

**Shipped**

- `src/components/sites/daita/daita-site/tna-data.ts` — 6 fictional POs × 8 stages
  (sampling, fabric sourcing, cutting, sewing, quality check, finishing, packing,
  shipment), one season, Jan–May 2026. Planned dates come from a per-order start plus a
  fixed stage offset; actuals and slips are seeded per order; delta, projected delta,
  days-past-due and cell state are all derived. Quantities 1,650–4,800 pcs.
- `TnaProvider.tsx` — the grid's state lives in a context so a second component can
  drive it (Phase 2 needs this). `markComplete` records an actual, computes the delta
  against the current planned date, and shifts every downstream stage by that delta.
- `TnaEngineSection.tsx` — the grid, toolbar, legend, stage-detail panel and change
  history. Wired into `/platform` under `<Anchor id="tna-engine">`, after the product
  stack.

**Decisions**

- *"Existing semantic tokens" for the five states.* The palette has no status ramp, so
  I used the tokens that already exist for the job — `glass-green` (complete),
  `glass-secondary` (on track), `glass-orange` + `border-hover` (due soon),
  `destructive` at 15%/50% (overdue), dashed `border-primary` (No POC). No token was
  added. `glass-orange` is `#100902cc`, effectively black on this ground, so due-soon
  leans on the brightest border rather than its fill. Every state also carries a glyph
  (✓ · ! ▲ ?) and a full sentence in the cell's accessible name, so nothing is
  colour-only.
- *Frozen "today".* `AS_OF = 2026-04-14`, never `Date.now()`. A live clock would make
  the server and client render differently and would rot the sample states within a
  week. The date is printed in the sample-data banner.
- *Stage detail is non-modal.* A dialog would trap focus and force the visitor out of
  the grid to read one cell. The panel sits beside the grid, is `aria-live="polite"`,
  and Escape closes it and returns focus to the cell that opened it.
- *No buyer names.* Units, styles, fabrics and POC initials only. Naming a buyer, even
  a fictional one, is the shape of the claim §0 blocks.
- *No edge bleed on the grid scroller.* Matching `.ns-padding-global` with a negative
  margin needs a `max-[767px]` variant, which Tailwind compiles to
  `not all and (min-width: 767px)` and so fires one pixel later than the stylesheet's
  `max-width: 767px`. That left a 4px horizontal overflow at exactly 767. The scroller
  now stays inside the container.

**Fixed while building**

- The column headers' `sr-only` spans are absolutely positioned. Without a positioned
  scroll container they resolved against the section, escaped the `overflow-x` clip and
  widened the document to 915px at 479. `relative` on the scroller fixes it.
- An overdue cell with no upstream slip rendered `—`; it now reads `15d late`.

**Verified**

- 48 cells, all five states present (19 complete, 14 on track, 5 due soon, 7 overdue,
  3 No POC).
- Keyboard: arrows move, Enter opens the detail, Escape closes it and restores focus.
- Mark complete on `#5033` fabric sourcing → actual 14 Apr, +29d, six downstream stages
  moved +29d, change history records it, Reset restores the seed.
- Saved views, unit filter and group-by-unit all filter and reorder correctly.
- No horizontal document overflow at 1440 / 1280 / 991 / 767 / 766 / 479.
- `npm run check` clean.

**Needs review**

- The POC names are invented. If any collides with a real person at DAITA, swap them.

## Phase 2 — WhatsApp agent simulator

**Shipped**

- `WhatsAppSimulator.tsx` — the phone frame and the five-turn exchange, plus
  `WhatsAppSimulatorSection` for `/platform`.
- The platform stack's **chase** card now renders the simulator instead of the static
  nudge timeline (`ChasePanel` is kept and still exported as the static fallback).
- `/platform` gets `<Anchor id="whatsapp-agent">` immediately after the TNA grid,
  inside the same `TnaProvider`.
- `shared/typography.ts` — the Indic-capable family stack, extracted from
  `TrustedLogosSection` so both places share one definition.

**The flow — five turns, under the six-turn cap**

1. Agent nudge, trilingual: `#4840 · Sewing was due 23 Mar and is still open. இன்று
   எத்தனை பீஸ் தைச்சீங்க? · आज कितने पीस सिले?`
2. Supervisor sends a quantity (prefilled with the 480 pcs outstanding, clamped 1–480).
3. Agent reads it back and asks for Y, in Tamil and English.
4. Supervisor replies Y.
5. Agent confirms in Hindi and English, and the milestone closes.

**Decisions**

- *Which order.* `#4840 · Sewing`, Unit 3. It is overdue in the seed, so closing it
  produces a visible +22d reflow across four downstream stages rather than a no-op.
- *Partial reports are a real branch.* Entering less than the balance logs the quantity
  and leaves the milestone open, with the agent saying it will ask again tomorrow. It
  writes a change-history line but moves no dates. Making every number close the
  milestone would have been the easier demo and the dishonest one.
- *The stack's chase card is NOT wired to the grid, even on `/platform`.* Two
  simulators on one page both driving one grid would let a visitor close the same stage
  twice from two places while each frame showed a different local step. The dedicated
  section is the one that drives the grid; the card is a self-contained demo. Belt and
  braces, `markComplete` is now idempotent per stage, so a double close cannot
  double-shift the plan.
- *Trilingual because the group is.* Tamil for the sewing floor, Hindi for a migrant
  line, English for the merchandising desk — that is the actual reason a garment WhatsApp
  group is mixed, and it is what the Noto faces were loaded for.

**Fixed while building**

- The stack cross-fades its panels with `aria-hidden` + `opacity-0`. One of them is now
  interactive, so inactive panels also get `inert` — otherwise the faded-out phone frame
  stayed in the tab order.

**Verified**

- Five turns end to end; grid row `#4840` goes from `23 Mar ▲ 16d late` to
  `23 Mar ✓ 14 Apr` with finishing/packing/shipment all +22d, and change history records
  `WA · #4840 · Sewing closed · 480 pcs reported from Unit 3 · 4 downstream stages moved +22d`.
- Partial path (120 pcs): logs `360 still to sew, milestone stays open`, grid unchanged.
- "Start over" resets both the thread and the grid.
- Tamil and Devanagari resolve to the Noto faces; Latin stays in DM Sans.
- Stack section 1565px → 1685px, both columns equal at 1188px. No horizontal overflow.
- `npm run check` clean.

## Phase 3 — Hero variant test

**Shipped**

- `HomeComposition.tsx` — the whole homepage, hero included, with the hero taking
  overrides. `src/app/page.tsx` is now four lines and renders it with no overrides.
- `/hero-a`, `/hero-b`, `/hero-c` — each renders `HomeComposition` with one changed
  headline plus the switcher.
- `HeroVariantSwitcher.tsx` — fixed bottom-right, labelled "Hero test", three links with
  `aria-current="page"` on the active one and the variant's rationale in each link's
  accessible name.
- `src/app/robots.ts` and `src/app/sitemap.ts`.

**The three**

| | Headline | Eyebrow |
|---|---|---|
| A | Coordinator | AI Textile Supply Chain |
| B | Your production floor is instrumented. Your order desk isn't. | AI Textile Supply Chain |
| C | Coordinating garment production | AI Textile Supply Chain |

**Decisions**

- *Only the h1 varies.* The brief names an eyebrow for A only, which is the eyebrow the
  site already ships. I read that as "A is the control" rather than "B and C lose their
  eyebrow", so eyebrow, subtitle, both CTAs and the hero film are held constant. A test
  that moves two variables measures neither.
- *Below the fold is shared, not copied.* One composition component, four routes. A
  section added to the homepage later cannot silently miss the variants.
- *Switcher is bottom-right.* Bottom-left is where the old floating badge sat and was
  removed from; reusing that corner would read as its return.
- *Three layers of exclusion.* `noindex, nofollow` in each route's metadata, absent from
  `sitemap.ts`, and `Disallow:` in `robots.txt`. A shared link should not put a second
  copy of the homepage in the index.

**Verified**

- Page height identical across `/`, `/hero-a`, `/hero-b`, `/hero-c` (8454px at 1440) —
  below the fold really is the same.
- Hero height stays 900px on all three, so B's three-line headline changes nothing but
  the headline.
- Switcher present on the three variants, absent on `/`; `robots` meta present on the
  three, absent on `/`.
- `robots.txt` and `sitemap.xml` both render correctly; the sitemap lists four URLs and
  no variant.
- `npm run check` clean; the build now emits 10 routes including `/robots.txt` and
  `/sitemap.xml`.

**Needs review**

- `sitemap.ts` and `robots.ts` hardcode `https://www.daitalabs.com`, matching the
  `metadataBase` already in `layout.tsx`. If the production host differs, both need
  changing.

## Phase 4 — Sand theme toggle

**Shipped**

- `globals.css` gains a `:root[data-theme="sand"]` block that redefines **only** the raw
  `--ns-*` values. The `@theme inline` mapping, every spacing token, the type scale and
  every transition are untouched, so no component changed shape.
- `layout.tsx` loads Cormorant Garamond, IBM Plex Sans and IBM Plex Mono, and carries an
  inline bootstrap script that applies the stored theme before first paint.
- `ThemeToggle.tsx` in the header (≥992) and in the mobile menu (<992). Persists to
  `localStorage["daita-theme"]`. Dark is the default: no attribute means dark.

**How the fonts switch without touching a component**

Under `[data-theme="sand"]` the stylesheet re-points `--font-dm-sans` at
`--font-plex-sans` and `--font-dm-mono` at `--font-plex-mono`. Every `font-sans` and
`font-mono` utility follows. Cormorant is applied by one theme-scoped rule on
`h1, h2, h3`. `:root[data-theme="sand"]` is specificity (0,2,0) against next/font's
class (0,1,0), so the override wins.

**Palette**

| | Dark | Sand |
|---|---|---|
| background primary | `#0c0c0e` | `#e9e1d1` (sand) |
| background secondary | `#161618` | `#f4f3ef` (sand-2) |
| content primary | `#ffffff` | `#101010` (ink) |
| content tertiary | `#ffffff80` | `#5c5648` (muted) |
| border secondary | `#ffffff1a` | `#10101024` |

Where dark layers white at an alpha, sand layers ink at the same alpha, so the surface
hierarchy keeps its exact structure. The one deliberate departure is
`--ns-border-secondary`: ink at 10% is too faint on sand, so it takes the Sand bundle's
own `--line: rgba(16,16,16,.14)`.

**What broke, and what I did about it**

1. **The three brand-gradient panels** (hero, who it's for, integrations) are hardcoded
   `linear-gradient(45deg, #0f41f3 16%, #289dd0)` — they are the brand, not a token. Ink
   type on that blue was unreadable. *Fixed:* tagged them `data-brand-gradient` and the
   sand theme restates the same 45°/16° gradient in sand. **This is a design decision
   someone should confirm** — it means the warm theme has no blue panels at all.
2. **The Rive artboard** is white line-art with a blue highlight, authored for a dark
   ground. On sand it was all but invisible. *Stopgap:* `invert(1) hue-rotate(180deg)`
   on the canvas, which flips lightness and returns the hue roughly to source. It reads
   well, but the real fix is a light artboard.
3. **Integration logos** are forced white by `brightness(0) invert(1)`. White on sand is
   nothing. *Fixed:* `data-mono-logo` + a sand rule that drops the inversion, so they
   render ink.
4. **Hardcoded whites in four components** — `#ffffff33`, `#ffffff1a`, `#ffffff14`,
   `#ffffff1f`/`#ffffff0f`, and three `bg-white` hamburger rules. *Fixed:* swapped for
   the tokens they already equalled, or for `ns-content-primary/12` and `/6` where the
   integration pills' 12%/6% spec has no matching token.

**What still breaks, unfixed**

- **The section films.** Five dark stock films play inside the "why DAITA" cards and the
  hero. They read as dark rectangles on sand — not broken, but the warm theme wants warm
  footage. Needs new media, not code.
- **The footer wordmark** stays sans (IBM Plex under sand) rather than becoming
  Cormorant. It is a brand mark rendered as SVG text, not a heading. Arguably correct;
  flagging it because it is the one large display element that does not turn serif.
- **Cormorant is much lighter than DM Sans at the same size tokens.** Headings read
  smaller and more delicate. That is the Sand bundle's own intent and no size token was
  changed, but it is a visible character shift, not a like-for-like swap.
- **The DAITA logo mark** is a dark mark. It was previously reported as nearly invisible
  on the dark header; on sand it is finally correct. The asset is right for one theme and
  wrong for the other — a light cut is still needed.

**Verified**

- Default is dark on a fresh profile; toggling writes `sand` to localStorage; a hard
  navigation to `/platform` comes back sand with no flash; toggling back restores
  `rgb(12,12,14)`.
- Contrast survey across the homepage in sand: **0** text nodes below 3:1 against their
  own background.
- All five TNA states stay distinguishable on sand — green-tinted complete, 5% ink on
  track, warm amber due soon, red overdue, dashed No POC — with the glyphs unchanged.
- Tamil and Devanagari still resolve to Noto under sand.
- `npm run check` clean.

## Phase 5 — Timeline moved to the homepage, scroll-pinned

**Shipped**

- `TimelineSection` removed from `/our-story` and added to the homepage as
  `<Anchor id="order-trail">`, between the platform stack and the "why DAITA" pillars.
  Nothing linked to the old `#timeline` anchor, so no link map change was needed.
- `TimelineSection` rewritten as a client component with the pin.
- `shared/useMediaQuery.ts` — a `useSyncExternalStore` media-query hook.

**How the pin works**

A tall wrapper (`100vh + 4 × 65vh = 360vh`) holds a `position: sticky; top: 0` panel. The
panel holds still for the wrapper's whole length while the page scrolls past; a
rAF-throttled scroll read turns the distance travelled into a 0–1 progress value, which
fills the rail and picks the active stop. Five stops over four viewport-heights of
travel — one stop per scroll step. **No library.** GSAP is not a dependency of this
project and `position: sticky` plus one scroll listener does the whole job.

**Two static fallbacks**

- `prefers-reduced-motion: reduce` — no pin, no progressive reveal, every stop lit.
- Below 768px — same. A panel taller than a phone viewport cannot stick, and a
  four-viewport scroll hijack on a phone is hostile.

Both render exactly the markup the animated build renders at its final step, so there is
no second layout to keep in sync. The server and first client render assume the static
build, so that is what hydrates and the pin is added after.

**Decisions**

- *Cumulative lighting, not a spotlight.* Stops stay lit once passed, with the current
  one emphasised. The point of the section is that a handoff trail accumulates.
- *A visible step counter.* "Stop 3 of 5", `aria-live="polite"`, plus `aria-current="step"`
  on the active row. Without it the pin is invisible to anyone not watching the animation.
- *The rail is `aria-hidden`.* It duplicates information already carried by
  `aria-current` and the counter.

**Verified**

- At 1440 with motion on: wrapper 3240px, panel `position: sticky` holding at `top: 0`
  through the whole scroll, rail 0% → 99%, counter Stop 1 → Stop 5, active row advancing
  02 APR → 04 → 07 → 11 → 28 APR.
- Reduced motion at 1440: section 688px, no sticky, all five rows at opacity 1.
- 767 and 479 with motion on: identical static build, no horizontal overflow.
- `npm run check` clean.

**Note on the harness** — headless Chrome reports `prefers-reduced-motion: reduce` by
default and ignores `--force-prefers-reduced-motion`. The CDP harness now sets it
explicitly with `Emulation.setEmulatedMedia`. Worth knowing: the first pin test looked
broken and was in fact the reduced-motion fallback working.

## Phase 6 — Audit

Seven routes (`/`, `/platform`, `/our-story`, `/contact`, `/hero-a`, `/hero-b`,
`/hero-c`) at 1440, 1280, 991, 767 and 479, against the **production** build.

### Layout

| | Before | After |
|---|---|---|
| Horizontal document overflow | 0 / 35 viewports | 0 / 35 |
| Aspect-ratio drift > 3% | 0 | 0 |
| Unequal sibling heights | 4 distinct | 3, all of them footer nav columns |
| Distinct orphaned last words | 42 | 28 |

**Unequal card heights.** Three of the four hits were the footer's `items-start` link
columns — deliberately top-aligned lists of different lengths, not cards. The real one
was the mobile platform carousel, whose content track was `items-start`, so slides were
353/353/353/353/353/300 at 479. Changed to `items-stretch`; the track already sized to
the tallest, so nothing else moved.

**Orphaned words.** Fixed structurally rather than by rewriting copy:

- `p, li, dd { text-wrap: pretty }` in `@layer base` — pulls a word down when a
  paragraph would end on a single short one. It does **not** rebalance earlier lines, so
  line counts, and therefore every measured section height, are unchanged.
- `h3, h4, h5 { text-wrap: balance }`. **h1 and h2 deliberately excluded**: they carry
  the source-matched display type whose breaks were measured line for line, and
  `balance` would re-break all of them. Verified after the change that every section
  height on `/`, `/platform` and `/our-story` is byte-identical to before.
- One non-breaking space, in the CTA heading — "Stop paying the coordination tax."
  stranded "tax." on its own line at every width from 479 to 1440.

28 orphans remain, all in body copy, all single short trailing words ("it.", "risk",
"to.", "is."). They are listed in the audit output. Chasing them with hard spaces would
fix one width and break another; they are normal typographic behaviour and I left them.

### Accessibility

| | Before | After |
|---|---|---|
| Images with no `alt` | 0 | 0 |
| Controls with no accessible name | 0 | 0 |
| `aria-expanded` with no `aria-controls` | 3 | 0 |
| Interactive targets under 24×24 | 2 | 0 |
| Duplicate ids | 0 | 0 |
| Tab stops with no visible focus ring | 0 / 71 | 0 / 71 |
| Focusable elements inside `[inert]` | 0 | 0 |
| Focusable but zero-size | 0 | 0 |

Fixed:

- The hamburger and both desktop dropdown triggers had `aria-expanded` and nothing to
  point at. `MOBILE_MENU_ID` and `DROPDOWN_PANEL_IDS` now give each a real
  `aria-controls`, and all 21 `aria-expanded` elements on the homepage resolve to a real
  element.
- The header logo link (23×20) and the footer social links (20×20) were under the 24×24
  minimum. `p-1 -m-1` grows the hit area to 31×28 / 28×28 without moving a pixel.

Checked and already correct: every one of the 71 tab stops on `/` has a visible focus
ring; the header dropdown opens on focus, so tabbing into it is not tabbing into
something invisible; the platform stack's inactive panels are `inert`, so the faded-out
phone frame is out of the tab order; the TNA grid is a full APG grid (arrows, Enter,
Escape, roving tabindex, `aria-current`, per-cell accessible names); the scroll-pinned
timeline has a complete static fallback under `prefers-reduced-motion`.

Not done, deliberately: no global `prefers-reduced-motion` kill switch for the existing
200–500ms colour and opacity transitions. That would change motion the rebrand brief
said to keep, and colour/opacity transitions are not a vestibular trigger. The one
scroll-linked animation added tonight has a full static path. **Recommend** adding one
before launch anyway.

### Page weight

Production build, cold cache, 1440, full-page scroll to trigger lazy media. KB.

| route | non-media before | non-media after | of which Rive `.riv` | fonts | scripts | video |
|---|---|---|---|---|---|---|
| `/` | 3927 | 3831 | 2205 | 425.5 → 328.5 | 233.2 | ~7.8–12 MB |
| `/platform` | 3822 | 3725 | 2192 | 425.5 → 328.5 | 225.1 | ~10–14 MB |
| `/our-story` | 1517 | 1420 | — | 425.5 → 328.5 | 146.8 | ~8–16 MB |
| `/contact` | 1091 | 994 | — | 425.5 → 328.5 | 146.8 | 0 |
| `/hero-a`,`-b`,`-c` | 3958 | 3861 | 2234 | 425.5 → 328.5 | 233.2 | ~8–12 MB |

The audit's own fixes cost about 1 KB of CSS. The 97 KB saving per route is the font
change below. **Video totals are not reproducible run to run** — they load progressively
and the measurement window cuts them at different points, which is why they are a range.
Everything else is stable to a tenth of a kilobyte.

Two findings, both acted on:

- **Fonts were 425 KB on every page load, 9 files, all preloaded**, including Cormorant
  Garamond, IBM Plex Sans and IBM Plex Mono — which the large majority of visitors, who
  never leave the dark theme, will never see. `preload: false` on all three: 425.5 →
  328.5 KB and 9 → 5 files fetched.
- **Noto Sans Tamil and Noto Sans Devanagari are 168 KB between them** — over half of
  what remains — for one caption line, below the fold, on one section. They are no longer
  preloaded (9 → 3 preload hints), so they are off the critical path, but the bytes still
  transfer. **Needs a decision:** subsetting the two faces to the eleven codepoints
  actually used would take this from 168 KB to under 5 KB. `next/font` cannot express
  that; it needs a build step or the line rendered as inline SVG.

Two more worth knowing, not acted on:

- **The Rive artboard is 2.2 MB**, fetched by XHR on `/`, `/platform` and the hero
  variants — 56% of all non-media weight on those routes.
- **Video is 8–16 MB per route.** Five section films plus the hero. It dwarfs everything
  else on the page and is the single biggest thing anyone could do about load time.
