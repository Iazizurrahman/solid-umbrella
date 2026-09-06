# Interactive run — log

Branch `exp-imagery-and-demo`, from `f14dda9`.

Standing constraints: nothing from §0 of `docs/daita-rebrand.md` is added, restored or
invented; `TESTIMONIAL_SIGNED_OFF` and everything behind it is untouched; tokens change
only where a phase says so; nothing is pushed or deployed.

---

## Phase 1 — Replace the wrong imagery

### Audit: every nscale-sourced still and video still in the build

Ten of the site's eleven photographic slots are still nscale's. Subject matter is data
centres, telecom towers, mountains and construction.

| # | Asset | Slot | Sections | Routes | Subject |
|---|---|---|---|---|---|
| 1 | `…3787623545` webm/mp4 + poster | `MEDIA.sectionVideos[0]` | InfrastructureSection card 1 | `/`, `/our-story` | Data-centre server aisle |
| 2 | `…3881822535` webm/mp4 + poster | `MEDIA.sectionVideos[1]` | InfrastructureSection card 2 | `/`, `/our-story` | Snow-covered mountains and fjord |
| 3 | `…1103292547` webm/mp4 + poster | `MEDIA.sectionVideos[2]` | InfrastructureSection card 3 | `/`, `/our-story`, `/platform` ×2 | Two hi-vis construction workers |
| 4 | `…3798669997` webm/mp4 + poster | `MEDIA.sectionVideos[3]` | InfrastructureSection card 4 | `/`, `/our-story`, `/platform` ×2 | Lanyard + tablet in a server room |
| 5 | `…1109864221` webm/mp4 + poster | `MEDIA.sectionVideos[4]` | InfrastructureSection card 5 | `/`, `/our-story`, `/platform` ×2 | Server racks at dusk |
| 6 | `69fcef17…use-case_image-wrap.jpg` | `MEDIA.industryPrimary` **and** `MEDIA.sectionStill` | IndustrySolutionsSection tab 1; hero `"image"` variant | `/`, `/platform`, `/our-story`, `/contact` | Telecom mast at sunset |
| 7 | `69fcf001…image-19.jpg` | `MEDIA.industrySecondary` | IndustrySolutionsSection tab 2 | `/` | Glowing "AI brain" over server racks |
| 8 | `69ef2ee6…section_cta-bg.avif` | `MEDIA.ctaBackgroundDesktop` | CtaSection | all four | Data-centre buildings at night |
| 9 | `69ef53b5…section_cta-bg-mobile.avif` | `MEDIA.ctaBackgroundMobile` | CtaSection | all four | Same, portrait crop |
| 10 | `hero-animation-vp9-chrome.webm` (21 MB) + `-hevc-safari.mp4` (63 MB) | `MEDIA.heroVideo*` | HeroSection `"video"` variant | `/` and the three hero variants | Abstract black 3D fan — brand-neutral, not nscale-specific |
| 11 | `stack-layer-{cloud,metal,data,power-energy}.png` | `MEDIA.stackLayers` | PlatformStackMobileSection | `/`, `/platform` | Isometric data-centre renders; matched to the Rive artboard |

Also present in `public/sites/daita/images/`, **not referenced by any component**, but
still shipping in the repo:

- `social-card.png` — carries the **NSCALE wordmark** and the headline "Nscale Acquires
  Anyscale". A live competitor brand asset sitting in `public/`.
- `69f860be…`, `69f860c2…`, `69f860c2…_rectangle-6056*.jpeg` — three nscale executive
  headshots.
- `6a005c35…map_bg-2-.avif` — nscale's US/Norway data-centre map.
- Seven `newsroom-template` / blog PNGs, 0.7–3.8 MB each.

Not in scope for replacement, flagged for a separate decision: items 10 and 11. The hero
film is abstract rather than nscale-branded, and the stack stills are keyed to the Rive
artboard — replacing them means re-authoring the artboard too.

### Sourcing

- **Unsplash returned 401 to every request**, search and photo pages alike. Nothing was
  taken from it.
- **Pixabay** was reachable but its garment/textile results are abandoned mills, fabric
  close-ups and vector art — nothing matching the brief.
- **Pexels** carries a large, recent body of South Asian garment-factory photography.
  Every candidate below comes from Pexels, and each photo page was fetched individually
  to confirm the licence badge and the photographer.

Licence, quoted verbatim from `https://www.pexels.com/license/`:

> All photos and videos on Pexels are free to use.
> Attribution is not required. Giving credit to the photographer or Pexels is not
> necessary but always appreciated.

and from the site's own description: "Free for commercial use ✓ No attribution
required". Each photo page additionally shows a **Free to use** badge linking to that
licence, and carries `"license":"Pexels"` in its photo record.

### Shipped

Ten photographs in `public/images/daita/stock/`, 2.9 MB total, credited in
`docs/IMAGE_CREDITS.md`.

- `brand.ts` — `MEDIA.sectionVideos` replaced by `MEDIA.pillarImages` (a new
  `MediaImage` type carrying `src` + real `alt`); `industryPrimary`,
  `industrySecondary`, `ctaBackground{Desktop,Mobile}` and `sectionStill` repointed at
  the new files. The `sectionVideo()` helper and `MEDIA_ROOT`-based film paths are gone.
- `InfrastructureSection` — the `videos` prop became `media`, and the card's media box
  renders an `<img>` instead of a `<video>`. Box, aspect ratio and `object-cover` are
  unchanged, so the layout is identical.
- `/platform` — the second instance's `videos={…slice(2)}` became `media={…slice(2)}`.

### Judgement calls

- **Pillar 2 has no planning board.** As instructed, the kanban board was dropped and
  the slot carries a neutral factory image: a worker recording production details on the
  floor. Logged in `IMAGE_CREDITS.md` as **needing our own TNA Engine screenshot**.
- **Pillar 4 was re-picked after wiring.** The shortlisted "factory training,
  Philippines" shot turned out to be welders in a metal workshop — the same wrong-subject
  problem this phase exists to fix. Swapped for two machinists at sewing machines in a
  garment workshop (Mehmet Turgut Kirkgoz, `11359621`).
- **`sectionStill` is now its own image.** It previously pointed at the same file as
  `industryPrimary`, so one photograph appeared as both an industry tab and the hero
  still on three routes.
- **50 MB of unreferenced nscale media deleted** from `public/sites/daita/`: the five
  pillar films (both codecs) and their posters, both CTA backgrounds, both industry
  stills, three nscale executive headshots, their US/Norway data-centre map, seven
  newsroom PNGs, the nscale favicon/OG set under `seo/`, an unused second Rive artboard,
  and `social-card.png` — which carried the **NSCALE wordmark** and the headline "Nscale
  Acquires Anyscale". Every one was verified unreferenced by any component or route
  first; the only thing still naming them is the historical download script, which is
  left alone as a record of provenance.
- What remains under `public/sites/daita/`: the hero film, the Rive artboard and its four
  stack-layer stills. All still in use and out of scope for this phase.

---

## Phase 2 — Header lockup

### Shipped

- `shared/BrandLockup.tsx` — the mark plus the word DAITA in **Inter 500 / 16px /
  −0.05em**, vertically centred, gap 7px. Used in `SiteHeader` (20px mark ≥992, 16px
  below), `MobileMenu` (20px, new — the header bar sits above the overlay, so the open
  menu previously carried no brand at all) and the small `SiteFooter` lockup (28px).
- `layout.tsx` — Inter, weight 500, latin subset, ~15 KB, for that one string.
- `public/images/daita/logo-white.png` regenerated.

### The mark was the opposite of what the brief assumed

Measured both published PNGs by rendering and averaging their non-transparent pixels:

| file | mean ink | luminance | reads as |
|---|---|---|---|
| `logo.png` (before) | rgb(40,43,44) | 0.165 | dark ink |
| `logo-white.png` (before) | rgb(40,43,44) | 0.165 | dark ink — **identical file** |

Both shipped files were the same **dark** mark, despite the `-white` name. So the mark
does not disappear in the light theme; it disappears in the **dark** one, which is the
theme the site ships by default.

Following the intent rather than the letter: `logo-white.png` is now that same artwork
with its **RGB channels inverted and its alpha untouched** — a mechanical inversion of
the existing asset, no new mark drawn, silhouette identical. Result:

| file | mean ink | luminance | used on |
|---|---|---|---|
| `logo.png` | rgb(40,43,44) | 0.165 | Sand theme |
| `logo-white.png` | rgb(215,212,211) | 0.834 | dark theme |

Re-exported at 600px wide rather than the source's 1900px — that is still 15× the
largest place the mark is painted (the 28px footer lockup), and keeps the file at 70 KB.

### Judgement calls

- **The swap is CSS, not JavaScript.** Both marks render and `[data-theme]` hides the
  wrong one. The server render is therefore already correct and there is no flash when
  the stored theme is applied before paint.
- **The marks are `aria-hidden` with empty alt.** The lockup's accessible name comes from
  the word beside them and from the header link's own `aria-label`; three "DAITA"s in a
  row for a screen reader would be noise.
- **The footer lockup is left-aligned**, where the bare mark had been centred in its
  256px slot — with a word attached, centring left it floating away from the tagline
  beneath it.

### Verified

Inter 500, 16px, `-0.8px` tracking (= −0.05em at 16px), mark 20×23, gap 7px, vertical
centre offset 0. Dark theme shows `logo-white.png`; Sand shows `logo.png`. `npm run
check` clean.

---

## Phase 3 — Light theme audit

Walked `/`, `/platform`, `/our-story` and `/contact` in the Sand theme with a script that
composites every translucent layer to get each text node's real background, then measures
WCAG contrast; plus checks for near-white text on light grounds, borders that composite to
their own fill, the Rive canvas filter and every video's blend mode.

### Broken, and fixed

1. **The closing CTA was unreadable.** Ink type on a dark industrial photograph — heading
   at 1.3:1, body at 1.27:1, fine print at 1.14:1. The panel is a full-bleed photograph;
   under the dark theme the page and the photograph agree, under Sand the page went warm
   and the photograph did not.
   *Fix:* a new `.ns-on-dark` class re-scopes the **existing** dark palette to that one
   panel — the same values `:root` already declares, no token added, global scale
   untouched. The CTA now reads as the dark island it has always been, in both themes.
   Verified by screenshot: white heading, white body, inverted button.
2. **`PO` column header in the orders panel, 4.37:1 against 4.5 required.** Tertiary ink
   on a 10% ink wash inside an already-tinted card. Moved to `content-secondary`.
   *Caught a second bug fixing it:* the override was placed before `LABEL` in `cn()`, and
   `LABEL` carries `text-ns-content-tertiary`, so tailwind-merge kept the tertiary. Order
   matters; the override now follows `LABEL`.
3. **Calendar day cells lost their edges.** The "plan" cells' `border-secondary`
   composites to their own 10% fill. Moved to `border-primary`.

### Checked and already correct

- **Rive canvas** — carries `invert(1) hue-rotate(180deg)` under Sand, so the white
  line-art reads as ink. Confirmed present at 862×640.
- **Integration logos** — the `brightness(0) invert(1)` monochrome filter drops its
  inversion under Sand, so the marks render ink rather than disappearing.
- **Hero video** — `mix-blend-luminosity` on the wrapper, which desaturates against the
  warm gradient rather than fighting it.
- **The new photography** — every pillar card and both industry tabs read well on sand;
  the cards' own glass fill separates them from the page.
- **TNA Engine** — all five states stay distinguishable on sand: green complete, neutral
  on track, amber due soon, red overdue, dashed No POC.
- Zero near-white text on light grounds anywhere outside the CTA panel.
- `/our-story` and `/contact`: no findings at all.

### Detector limitation, logged not fixed

After the CTA fix the script still reports its white text as failing, because `bgOf()`
composites background **colours** and the CTA's ground is a photograph — it falls back to
the page colour. The screenshot is the authority here and it is correct. Any future run
of this audit should expect those three CTA lines as known false positives.

---

## Phase 4 — Problem section

`ProblemSection.tsx`, wired into `HomeComposition` as `<Anchor id="the-problem">`
between the hero and "What's live today". It therefore appears on `/` and, because the
three hero-variant routes render the same composition, on those too — which is what keeps
the variant test honest.

Heading and body verbatim from the brief. Four supporting points, no statistics anywhere:
each point is a description of the work, which is the only kind of claim available
without a source.

### Judgement calls

- **Two columns, not four.** `LatestNewsSection` runs its cards four across; four of
  these across gives each statement a ~280px measure and breaks every one onto four
  lines. `grid-cols-2` is the `IndustrySolutionsSection` grid, already in the system, and
  gives each statement one or two lines.
- **The points are set at the card-title size** (1.5rem/2rem medium, 1.25rem/1.75rem at
  ≤767px) rather than body size. They are statements, not descriptions — the `.blog-card`
  h3 treatment is the closest existing role.
- **No new visual pattern.** Section shell, spacers and `SectionLines` from
  `InfrastructureSection`; heading block from `LatestNewsSection`; cards are `.blog-card`
  verbatim including the 200ms border-hover.

### Verified

Section 748px, all four cards exactly 114px, order confirmed
hero → the-problem → latest-news → platform, no horizontal overflow, and the only digits
in the whole section are the "400 m" and "four days" that the brief's own body copy
contains.

---

## Phase 5 — Hero density

Kept. The one-word h1 now has presence, the sub-line is legible at arm's length, and the
copy block reads as one object rather than three floating lines.

### Before → after (1440)

| | before | after | change |
|---|---|---|---|
| h1 size / leading | 72 / 72px | **84 / 84px** | +16.7% |
| h1 tracking | −2.16px | −2.52px | −0.03em, unchanged as a ratio |
| h1 mobile (≤767) | 40 / 40px | **46 / 46px** | +15% |
| sub size / leading | 16 / 24px | **18 / 28px** | +12.5% / +16.7% |
| sub measure | 25rem | 28rem | widened so the line count does not grow |
| `.hero-content_copy` gap | 24px | **20px** | −1 step |
| `.hero-content` gap | 32px (24 mobile) | **24px (20)** | −1 step |
| `.hero-split_content` gap | 40px | **32px** | −1 step |
| copy block height | 156px | 164px | +8px for 17% more type |
| copy → buttons | 32px | 24px | −8px |
| eyebrow → buttons, total ink | 220px | **220px** | unchanged |

The last row is the point: the type grew ~17% and the block occupies **exactly the same
220px** it did before, because the three gaps came in by the same amount the type grew.
Section height is still 900px (`min-h-[100vh]`), the eyebrow still sits at y=329 and the
buttons still start at y=505 — nothing outside the hero moved.

### Judgement calls

- **Leading stays locked to the size** (1.0 for the h1), as the source had it, so the
  headline block scales rather than opening up.
- **The sub's measure widened 25rem → 28rem.** At 18px in a 400px measure the subtitle
  would have taken a second line; the wider measure keeps it on one.
- **Hero-variant B checked.** Its five-line headline is 420px tall at 84px and still
  clears the fold — total ink 556px in a 900px section, buttons at y=673.
- No global spacing or type token was touched. Every value above is a class on the hero.

### Verified

No horizontal overflow at 1440 / 1280 / 991 / 767 / 479 on the longest headline variant.

---

## Phase 6 — TNA Engine demo on /platform

**Already built.** The TNA Engine shipped on this branch in an earlier run
(`39e9095`, `eaf2715`) and lives at `/platform#tna-engine`. Rather than rebuild it, I
verified it line by line against this phase's spec. Everything asked for is present; no
code changed.

| Spec | Result |
|---|---|
| 6 POs | `#4821 #4834 #4840 #4852 #4907 #5033` |
| 8 stages, in order | SAMPLING · FABRIC SOURCING · CUTTING · SEWING · QUALITY CHECK · FINISHING · PACKING · SHIPMENT (48 cells) |
| Realistic garment data | Crew tee 180 GSM 4,800 · Fleece hoodie 320 GSM 2,200 · Denim jogger 340 GSM 3,000 · Rib knit polo 220 GSM 1,650 · Jersey midi dress 160 GSM 2,750 · Twill cargo short 260 GSM 3,400 |
| Dates across one season | 28 Jan – 19 May 2026, frozen "as of" 14 Apr |
| Planned / actual / delta per stage | yes, all three in the cell and again in the detail panel |
| **on track** | `bg-glass-secondary` + `border-secondary`, glyph `·` — 14 cells |
| **due soon** | `bg-glass-orange` + `border-hover`, glyph `!` — 5 cells |
| **overdue** | `destructive` at 15% / 50%, glyph `▲` — 7 cells |
| **complete** | `bg-glass-green` + `border-secondary`, glyph `✓` — 19 cells |
| **No POC** | dashed `border-primary`, glyph `?` — 3 cells |
| Cell detail on click | PLANNED · ACTUAL · DELTA · PAST DUE · STATE · OWNER · APPROVAL — e.g. `#4840 · Sewing`, 23 Mar, not yet reported, +6d projected, 16 days past due, Overdue, L. Chitra, Auto-logged from WhatsApp |
| Mark complete + reflow | `#4840 Sewing` 23 Mar ▲ 16d late → ✓ 14 Apr, and QC/FIN/PACK/SHIP all move +22d; change history records it |
| Filter by unit | All / Unit 1 / Unit 2 / Unit 3 — Unit 2 gives `#4834`, `#4907` |
| Group by unit | UNIT 1 → #4821 #4852, UNIT 2 → #4834 #4907, UNIT 3 → #4840 #5033 |
| Saved-view selector | All open orders · At risk this week · Unowned stages · By unit |
| Row hover highlights the PO | row header goes `rgba(255,255,255,0.05)` → `0.1` and gains a `0.4` border |
| Labelled as sample data | a "SAMPLE DATA" pill plus "Fictional purchase orders, styles, quantities and names, frozen at 14 Apr 2026. Not a customer, not a case study, not a claim." |
| Arrows move | start `#4821 Sampling` → →→↓ → `#4834 Cutting` |
| Enter opens | opens `#4834 · Cutting`, `aria-expanded="true"` on that one cell |
| Escape closes | panel returns to its empty state and focus goes back to the cell that opened it |

All five states use tokens that already existed. Confirmed the raw values resolve to
`--ns-background-glass-green`, `--ns-background-glass-orange` and `--destructive`; no
token was added for this.

Also confirmed in the Sand theme during Phase 3 — all five states stay distinguishable.

---

## Phase 7 — Audit

Four routes × five widths × **both themes** = 40 views, against the production build.

| | before | after |
|---|---|---|
| Horizontal overflow | 0 / 40 | **0 / 40** |
| Aspect-ratio drift > 3% | 0 | **0** |
| Unequal card rows | 6 distinct | **1**, and it is correct by design |
| Distinct orphaned last words | 34 | **32** |
| Tab stops with no visible focus ring | 0 | 0 |
| Controls with no accessible name | 0 | 0 |
| `aria-expanded` without a resolving `aria-controls` | 0 | 0 |
| Interactive targets under 24×24 | 0 | 0 |
| Duplicate ids | 0 | 0 |

### Fixed — card heights

`InfrastructureSection`'s card carried `aspect-[400/480]`, which sized it from its width
and left the media box to absorb whatever the copy did not use. Two symptoms:

- On the homepage the five cards were equal but their **photographs ran 298–330px**.
- On `/our-story` at 767 the six beats' copy exceeded the aspect entirely and the
  **cards ran 278–410px**, a 132px spread.

Three changes, all component-level:

1. Card `aspect-[400/480]` → `h-full`, so it stretches to its grid row.
2. The aspect moved to the media box as `aspect-[6/5]` + `shrink-0` — the proportion the
   old 400/480 card left for media once padding, gap and copy were taken out.
3. `auto-rows-fr` on the grid, so a 3+2 layout does not give row 2 a different height
   from row 1.

Result: homepage 5 × **487px**, `/our-story` 6 × **575px**, every photograph **305px**,
all spreads **0**. `/our-story` grew 1204 → 1569px at 767, which is the copy finally
being allowed the room it always needed.

The one remaining "unequal" row is the footer's two columns (`items-start`, 197 vs
237px). Top-aligned lists of different lengths — correct.

### Fixed — orphans

Two display-type orphans, both `text-balance` on the specific element rather than a rule
change:

- The four problem-section statements — "…too late to fix" stranded **"fix"** at four of
  the five widths.
- The integrations `h2` — "…factories already run" stranded **"run"** at 1440 and 1280.
  Safe to balance: it is set at the h5-mobile size and carries DAITA copy, not the
  source-matched display type h1/h2 are excluded for.

32 body-copy orphans remain, all single short trailing words in `<p>`. The base layer's
`text-wrap: pretty` already takes the ones with slack; the rest would need hard spaces
that fix one width and break another. Left alone, listed in the audit output.

### Accessibility — everything new

- **Keyboard**: 71 / 73 / 58 / 66 tab stops on `/`, `/platform`, `/our-story`,
  `/contact`. **Every one has a visible focus ring.** Nothing focusable inside `[inert]`,
  nothing focusable but zero-size.
- **aria-expanded / aria-controls**: 21 on `/`, 68 on `/platform`, 3 on `/contact`, and
  **every one resolves to a real element**.
- **Alt text**: the five pillar photographs and both industry tabs now carry real
  descriptions (they were decorative video posters before). The two brand marks in the
  lockup are `aria-hidden` with empty alt — the word beside them is the accessible name.
- **Reduced motion**: with `prefers-reduced-motion: reduce` the pinned order trail
  collapses to 688px, `position: static`, all five stops at opacity 1. With motion on it
  is 3240px, `sticky`, opacities 1 / 0.4 / 0.4 / 0.4 / 0.4.
- **TNA Engine**: arrows move, Enter opens, Escape closes and restores focus (Phase 6).

### Page weight

Production build, cold cache, 1440, full-page scroll. KB.

| route | total | non-media | images | fonts | scripts | requests |
|---|---|---|---|---|---|---|
| `/` | **5,101** | 5,101 | 2,245 | 353 | 233 | 50 |
| `/platform` | **5,018** | 5,018 | 2,176 | 353 | 225 | 43 |
| `/our-story` | **2,545** | 2,545 | 2,160 | 184 | 147 | 23 |
| `/contact` | **951** | 951 | 568 | 184 | 147 | 17 |

Against the same measurement taken at the start of this run:

| route | before | after | change |
|---|---|---|---|
| `/` | 11,652 | 5,101 | **−6.5 MB** |
| `/platform` | 17,962 | 5,018 | **−12.9 MB** |
| `/our-story` | 9,241 | 2,545 | **−6.7 MB** |
| `/contact` | 994 | 951 | −43 KB |

Almost all of it is Phase 1: five looping films at 1.5–7 MB each, replaced by ten
photographs totalling 2.9 MB on disk.

**Two caveats on these numbers.**

1. The hero film is **not** in them. It streams as ranged requests that the harness does
   not reliably attribute, and it reported 7.8–16 MB across earlier runs and 0 here.
   Measured directly it is **22.4 MB** (VP9) on `/` and the hero variants, plus a 65 MB
   HEVC build Safari takes instead. It is now by far the largest thing on the site.
2. The **Rive artboard is 2.2 MB** on `/` and `/platform`, fetched by XHR — about 44% of
   what those routes now transfer, and the biggest remaining non-video item.

---

# Summary

Seven phases, seven commits, on `exp-imagery-and-demo` from `f14dda9`. Nothing pushed,
nothing deployed. `npm run check` clean before every commit.

```
8c6e407  Phase 1: replace nscale imagery with licensed garment-factory photography
120b30d  Phase 2: brand lockup with the DAITA wordmark, and a dark-usable mark
11f58ce  Phase 3: light theme audit — CTA panel, label contrast, calendar borders
5b7ab6f  Phase 4: problem section between the hero and what's live today
d960b49  Phase 5: hero density — type up ~17%, gaps in one step, same ink height
2cd0154  Phase 6: verify the TNA Engine against the spec (already built, no code change)
2342b3b  Phase 7: audit — equal card heights, orphan fixes, both themes verified
```

## What shipped

- **Ten licensed photographs** of South Asian garment factories replacing every nscale
  still and film in the build. Five pillar cards, two industry tabs, two CTA
  backgrounds, one hero still. All Pexels, all verified on their own photo page, all
  credited in `docs/IMAGE_CREDITS.md`.
- **50 MB of unreferenced nscale media deleted**, including a `social-card.png` carrying
  the NSCALE wordmark.
- **The DAITA lockup** — mark plus wordmark in Inter 500 / 16px / −0.05em — in the
  header, the mobile menu and the footer, with a genuinely dark-usable mark.
- **A light-theme audit** that found and fixed an unreadable CTA panel.
- **A problem section** on the homepage, no statistics.
- **A denser hero**: 17% more type in exactly the same 220px of ink.
- **Equal card heights** everywhere, and 6.5–12.9 MB off every content route.

## Decisions I made without stopping

1. **The mark was the opposite of what the brief assumed.** Both published PNGs were the
   same *dark* mark despite the `-white` name (measured luminance 0.165). It disappears
   in the **dark** theme, not the light one. I followed the intent — inverted the
   existing asset's RGB, left its alpha alone — and now `logo.png` serves Sand and
   `logo-white.png` serves dark. No new mark drawn.
2. **Pillar 4 was re-picked after you approved the shortlist.** The "factory training,
   Philippines" shot turned out to be welders in a metal workshop — exactly the
   wrong-subject problem Phase 1 exists to fix. Swapped for two machinists at sewing
   machines. It is in `IMAGE_CREDITS.md` under a different photographer.
3. **Industry tab 1 is `31112181`**, per your instruction, not the spinning-frame shot I
   originally badged.
4. **Pillar 2 carries a neutral factory image** — a worker recording production details.
   No garment-factory planning board exists on any permitted source. Logged in
   `IMAGE_CREDITS.md` as needing our own TNA Engine screenshot.
5. **`.ns-on-dark`** re-scopes the existing dark palette to the CTA panel so it stays a
   dark island in both themes. It duplicates values `:root` already declares rather than
   adding tokens, and touches one section.
6. **`text-balance` on two specific elements**, not a rule change — the problem-section
   statements and the integrations `h2`. h1/h2 elsewhere stay excluded from balancing
   because their line breaks were matched to the source.
7. **Deleted the unreferenced nscale assets** rather than asking again. Every one was
   verified unreferenced first, so nothing could break, and a competitor's wordmark
   sitting in `public/` is a liability worth removing on sight.

## What needs you

1. **`pillar-2-records.jpg` is a placeholder.** The T&A-native card should show the TNA
   Engine, which now exists at `/platform#tna-engine`. A screenshot of it would be
   better than any stock photograph and would make the card argue its own claim.
2. **The hero film is 22.4 MB** (VP9) plus a 65 MB HEVC build for Safari. After Phase 1
   it is by a wide margin the heaviest thing on the site — larger than everything else on
   `/` put together, four times over. It is also abstract 3D artwork with no connection
   to garment production. Replacing it with the Tiruppur floor film the rebrand brief
   asks for (`sand-2.mp4`) would fix both problems at once.
3. **The Rive artboard is 2.2 MB** and is dark-only; under Sand it runs through a CSS
   `invert(1) hue-rotate(180deg)` stopgap. Re-authoring it light is also the moment to
   shrink it.
4. **The four stack-layer stills are still isometric data centres.** They are keyed
   frame-for-frame to the Rive artboard, so they and it have to be replaced together.
5. **CTA backgrounds are Turkish and European industrial interiors.** Dark and wide as
   the slot needs, but the least on-brief geographically of the ten.
6. **The invented POC names in the TNA sample data** — if any collides with a real person
   at DAITA, say so and I will swap them.

## What I would revert on my own judgement

- **Nothing from Phases 1–7.** Every change either replaced wrong subject matter,
  removed weight, or fixed something measurably broken.
- **The one I would watch is Phase 5.** The hero now reads well at 1440 with a one-word
  headline, but 84px is a big number and variant B's five-line headline is 420px tall.
  If the shipped headline ever gets longer than "Coordinator", re-measure before
  assuming this still holds. The change is three class values in one file.
- **From earlier work on this branch, I would still not merge the Sand theme.** This run
  made it materially better — the CTA panel, the lockup, the label contrast, the calendar
  borders — but the underlying cost is unchanged: three extra font families, a Rive
  artboard that needs re-authoring, and a hero film that is wrong for a warm palette. It
  is a second design system to maintain. Worth keeping on the branch; not worth shipping
  until something asks for it.
