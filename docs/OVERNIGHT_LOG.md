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
