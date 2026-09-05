# Page Topology — nscale.com homepage

Measured at a **1920px CSS viewport** (`devicePixelRatio: 1`). Content is capped by
`.container-large` at 1232px and centered, so 1920 renders the same content box as 1440.
Total document height: **9060px**.

## Top-level structure (`body > .page-wrapper`)

| Order | Element | Height | Position | z-index |
| --- | --- | --- | --- | --- |
| 1 | `div.global-css` | 0 | static | auto |
| 2 | `header.header` | 73px | **fixed**, `inset: 0 0 auto` | 999 |
| 3 | `main.main-wrapper` | 7874px | static | auto |
| 4 | `div.footer` | 1186px | static | auto (bg `#0c0c0e`) |

The header is a fixed overlay; `main` starts at page Y 0 and flows under it.

## Sections (children of `main.main-wrapper`)

Every content section is separated by a `div.section-separator` — a 1px full-width rule using
`var(--border--secondary)` (`#ffffff1a`). These are real DOM elements, not borders.

> **Measure with images loaded.** Several sections lazy-load their images, and until those
> resolve the section reports a much smaller height. An early pass of this document recorded
> the logos band as 296px; with all nine logos actually loaded it is **416px**. Any height
> taken straight after `load` without forcing images is wrong. The figures below were captured
> after force-loading every `<img>` and awaiting each one.

| # | Name | Class | Top | Height @1920 | Height @390 | Interaction model |
| --- | --- | --- | --- | ---: | ---: | --- |
| 0 | **Hero** | `index_hero` | 0 | 945 | 844 | static + background video |
| 2 | **Latest news** | `section` (variant) | 946 | 833 | 741 | static 4-up grid; snap track <768 |
| 4 | **Platform stack** (desktop) | `section hide-tablet hide-mobile` | 1780 | 1420 | **0 — hidden** | **hover-driven Rive canvas** |
| 6 | **Platform stack** (mobile) | `section hide-desktop` | — | **0 — hidden** | 1353 | 4-slide carousel + nested accordion |
| 8 | **Infrastructure** | `section` | 3202 | 1460 | 2456 | static grid, 5 autoplay videos |
| 10 | **Trusted-by logos** | `section` | 4663 | **416** | 672 | static, blue gradient band |
| 12 | **Testimonials** | `section` (variant) | 4960 | 764 | 650 | carousel, prev/next, all widths |
| 14 | **Industry solutions** | `section` | 5725 | 1014 | 862 | static 2-up; tabs only <768 |
| 16 | **Latest stories** | `section` (variant) | 6740 | 705 | 613 | static 4-up; swipe track <768 |
| 18 | **CTA** | `section` | 7446 | 428 | 432 | static, bg image |
| — | **Footer** | `div.footer` | 7874 | 1186 | — | static + newsletter field |

**Document height: 9180 @1920, 10467 @390** (both with images loaded).

Odd indices (1, 3, 5, …) are the 1px `section-separator` divs.

### Hero vertical centring

`.section-full-height` is `min-height: 100vh; display: flex; flex-direction: column;
justify-content: center` **plus `padding-top: 73px`** — the header height. That top padding is
what makes the centred content clear the fixed header. Omitting it lifts the h1 from y=309 to
y=273 in a 945px viewport. Its children are a zero-height top `section_padding`, the content
(280px), and a 120px bottom `section_padding`.

### Desktop/mobile section swap

Sections 4 and 6 are **two separate DOM sections for the same content**, toggled by
`.hide-tablet .hide-mobile` (desktop, ≥992px) and `.hide-desktop` (<992px). The desktop one
renders a Rive canvas; the mobile one uses static images and inline SVGs. Both must be built.

## Layering

There is no scroll-snap, no `position: sticky`, and no `animation-timeline` anywhere on the
page. The only stacking concern is the fixed header at `z-index: 999`. Everything else is in
normal flow.

## Assembly notes

- Sections are full-bleed; the 1232px cap comes from `.container-large` **inside** each section,
  so coloured bands (hero, logos, industry, CTA) span the full viewport width.
- The faint vertical dashed rules visible across most sections are a **global grid overlay**,
  not per-section decoration — verify the owning element before duplicating it per section.
