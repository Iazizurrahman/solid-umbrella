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
