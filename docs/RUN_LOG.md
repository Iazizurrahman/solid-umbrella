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
