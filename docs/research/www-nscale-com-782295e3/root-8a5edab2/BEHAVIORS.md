# Behaviors — nscale.com homepage

The behavior bible. Every finding here is measured, not assumed.

## Technology stack driving behavior

The page is a **static Webflow export**. There is no React/Next/Nuxt runtime. Behavior comes
from one custom bundle:

- `https://nscale-v2.pages.dev/index.js` (~426KB) — injected by an inline script that also
  injects `https://nscale-v2.pages.dev/index.css`. This is the real behavior source.
- Bundled inside it: **GSAP + ScrollTrigger**, **Swiper**, **Rive** (`@rive-app/canvas@2.39.1`).
- `webflow.js` is present but **Webflow IX2 interactions are NOT used** — `[data-w-id]` count
  is 0 on this page.
- jQuery 3.5.1 loaded (Webflow default), HubSpot forms embed, GTM.

**No smooth-scroll library.** No Lenis, no Locomotive. Native scrolling — do not add one.

GSAP is module-scoped inside the bundle, so `window.gsap` / `window.ScrollTrigger` are
`undefined` and the trigger registry cannot be queried. All values below were measured by
driving **real wheel scrolls** and sampling `getComputedStyle()`.

> **Measurement gotcha (important for QA):** programmatic `window.scrollTo()` does **not**
> drive these ScrollTriggers — the opacity latches at its last value and reports stale
> numbers at every position. Only real wheel/user scroll updates them. Verify animations
> with real scroll events, not `scrollTo`.

## Header

`header.header` — `position: fixed; inset: 0 0 auto; z-index: 999; height: 73px`.
The header itself and every descendant are **fully transparent**; the visible bar is a
dedicated background layer.

### Scroll-driven background fade

- **Element:** `div.header_background` (`[data-header-bg]`) — `height: 72px`, full width,
  `background-color: #0c0c0e`.
- **Trigger:** scroll position, scrubbed (not a threshold toggle).
- **Measured curve:**

  | scrollY | opacity |
  | --- | --- |
  | 0 | `0` |
  | 200 | `0.9721` |
  | 500 | `1` |

- **Interpretation:** linear scrub from `0` → `1` over roughly the first **~206px** of scroll,
  clamped at 1 thereafter. At the top of the hero the header is fully transparent and the blue
  hero video shows through it; by 200px it is essentially opaque.
- **Implementation:** a scroll listener setting `opacity = Math.min(1, scrollY / 206)` on an
  absolutely-positioned 72px background div reproduces this exactly. Do not use a CSS
  transition with a boolean class — the original is continuous.

### Header border

- **Element:** `[data-header-border]` — 1px tall, full width, sits at y=72.
- Measured `opacity: 1`, `background-image: none`, transparent background — **invisible on
  this page**. Reserve the element for structure but expect no visible line at ≥992px.
- At ≤991px only, `.header` gains `border-bottom: 1px solid #ffffff1a` from the stylesheet.

> A blue→cyan gradient rule appears under the header in two mid-scroll screenshots. That is
> **page content** (a section's gradient edge) scrolling behind the transparent header, not a
> header element. Confirmed: `[data-header-border]` has no background image.

### Nav (≥992px)

Full horizontal nav: `Data Centers ▾`, `Services ▾`, `Company ▾`, `Resources ▾`, `Contact`,
plus a `Login →` button at the right. Four dropdowns (`[data-dropdown]` × 4,
`[data-dropdown-trigger]`). At ≤991px this collapses to `[data-mobile-hamburger]` /
`[data-mobile-menu]`.

## Section behaviors

### Platform stack (§4, desktop ≥992px) — HOVER-driven Rive

**CORRECTION.** An earlier pass of this document called this section scroll-driven. It is not.
Reading the driver in the bundle settles it: the layers are switched by **`mouseenter`** on the
four link cards. There is no ScrollTrigger involved.

Exact Rive configuration, lifted from the bundle:

```js
new Rive({
  src: ".../6a72243af8c76e6552945a54_6a71c8fd5f921f9d8e0f5fb4_nscale-stack_v2.riv",
  canvas,                       // <canvas data-rive-stack>
  artboard: "Artboard",
  stateMachines: "LayerController",
  autoBind: true,
  autoplay: true,
  layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  onLoad: () => rive.resizeDrawingSurfaceToCanvas(),
})
window.addEventListener("resize", () => rive.resizeDrawingSurfaceToCanvas())
```

Data binding (`rive.viewModelInstance`), with the four layer keys `cloud`, `infrastructure`,
`dc`, `energy` — note the third is **`dc`**, not `data-centers`:

- `boolean("<key>_hovered")` — set `true` for the hovered card and `false` for the other three.
- The same booleans are also *observed*: when Rive reports one true, the matching card gets
  `.is-active`. So hovering the canvas artwork highlights the card, and hovering the card drives
  the canvas — the binding runs both ways.
- `trigger("<key>_clicked")` — fires navigation to that card's `href`.

DOM: `[data-rive-stack-section-v2]` wraps a `<canvas data-rive-stack>` plus four
`a[data-layer]` cards (Nscale Cloud, Nscale Infrastructure, Nscale Data Centers,
Nscale Energy & Power), each an `h3` + `p`.

The section is 1420px tall for ~945px of content; the surplus is ordinary layout height, not a
pinned scroll distance.

The mobile counterpart (§6, `.hide-desktop`) is a different DOM subtree entirely, using static
images and inline SVGs instead of the canvas, and it does use `[data-accordion]` there — that is
where the 11 accordion hooks on the page live.

### Infrastructure (§8) — autoplay video cards

- 5 × `[data-video-card]` with `data-video-urls`, `data-poster-url`, `data-autoplay`,
  `data-loop`, `data-object-fit`.
- Sources are `.mp4` (+ `.webm`) from `cdn.prod.website-files.com`, each with a `_poster` JPG.
- **Do not rebuild these as static images or CSS mockups** — they are real looping videos.
- Layout: 3 cards in the first row, 2 in the second.

### Testimonials (§12) — Swiper carousel

- `[data-testimonials-swiper]`, with `[data-swiper-prev]`, `[data-swiper-next]`,
  `[data-swiper-pagination]`.
- 3 visible cards at desktop. Named quotes with circular avatars.

### Industry solutions (§14) — tabs

- `[data-use-case-tabs]` with `[data-tab]` × 2 and `[data-tab-trigger]` × 2.
- **Every tab state must be extracted** — click each trigger and capture its card set.
- Observed default state: 2 cards, *Telecommunication* and *AI Native*.

### Latest stories (§16) — Swiper + scroll reveal

- `[data-featured-blogs-swiper]` × 2.
- Card images and titles **animate in on scroll**; a screenshot taken before the reveal shows
  only the "Learn more →" links with empty card bodies. Budget settle time when QA-ing.

### Buttons — global hover

- `[data-btn-hover]` appears **26 times** across the page. This is a shared hover treatment
  applied to every button. Extract it once and reuse; do not re-derive per section.

### Other page-level hooks present

`[data-dc-location]` × 12 and `[data-map-label]` × 2 (data-center map data), `[data-layer]` × 8,
`[data-expand]` × 5, `[data-menu-service]` × 4, `[data-menu-link]` × 5.

## Global grid overlay

Faint vertical dashed rules run through most sections at the 1232px container's column
positions. Identify the single owning element rather than reimplementing per section.

## Responsive — measured at three real viewports

Breakpoints: `>=992` desktop, `<=991` tablet, `<=767` mobile landscape, `<=479` mobile portrait.
The `>=1440` tier only hides `.blog-filters_mobile`, which does not exist on this page, so the
desktop rendering is fully determined by the `>=992` tier.

The page's own inline `<style>` adds three more visibility helpers with slightly different,
overlapping bounds — note these are NOT the Webflow defaults:

```css
@media (max-width: 768px)                      { .hide-mobile  { display: none } }
@media (min-width: 769px) and (max-width: 991px) { .hide-tablet { display: none } }
@media (min-width: 992px)                      { .hide-desktop { display: none } }
```

### How the measurements were taken

The browser window could not be resized (it was maximized and Chrome ignores bounds changes in
that state), so 768px and 390px were measured by injecting a **same-origin iframe** of the page
at those widths. An iframe establishes its own viewport, so media queries evaluate correctly
inside it — verified: at 390px `innerWidth` reported 386 with `(max-width: 767px)` matching.

### Section heights per viewport

| Section | 1920px | 768px | 390px |
| --- | ---: | ---: | ---: |
| Hero | 945 | 900 | 840 |
| Latest news | 833 | 928 | 739 |
| Platform stack (desktop, Rive) | 1420 | **0 — hidden** | **0 — hidden** |
| Platform stack (mobile) | **0 — hidden** | 907 | 921 |
| Infrastructure | 1460 | 1038 | 2432 |
| Trusted-by logos | 296 | 368 | 352 |
| Testimonials | 764 | 840 | 650 |
| Industry solutions | 1014 | 879 | 859 |
| Latest stories | 705 | 715 | 611 |
| CTA | 428 | 428 | 432 |
| **Document total** | **9060** | — | **9697** |

Infrastructure more than doubles at 390px (1038 → 2432) because its five video cards stack into
a single column; at 768px they are still multi-column.

### Header

| | >=992px | <=991px |
| --- | --- | --- |
| `.header_nav` | `display: flex` | `display: none` |
| `[data-mobile-hamburger]` | hidden | `display: flex` |
| `.header_wrap` padding-block | 17px | 8px |
| `.header` bottom border | none | `1px solid #ffffff1a` |

Confirmed at 768px: nav `none`, hamburger `flex`. So the hamburger governs the whole
`<=991px` range, not just phones.

### Other confirmed differences

- The platform stack swaps DOM subtrees entirely at 992px — the Rive canvas version and the
  Swiper+accordion version are two separate `<section>` elements, never both visible.
- `.padding-global` 24px, dropping to 20px at `<=767px`.
- `.section_lines`: five dashed rules at desktop; at `<=767px` the three plain ones are hidden
  and only the two `.is-mobile` ones remain. Inline padding 12px, 8px at `<=767px`.
- Heading sizes swap via separate `-mobile` classes on the element, not via media queries.
- Testimonials carousel: 3 slides / 40px gap at `>=768px`; 1.1 slides / 16px gap below.
- Latest stories: static 4-up grid at `>=768px`; 1.3-slide swipe track below.
- Industry solutions: both cards side by side at `>=768px`; tabbed cross-fade below.
- Hero: full-bleed gradient at all sizes; the 880px video square shrinks to 420px at `<=767px`
  and 320px at `<=479px`.
