# Visual QA — nscale.com homepage clone

Method: the clone was served from `next dev` at `localhost:3000` and measured with
`getBoundingClientRect()` against the live site at the same viewport, section by section.
Geometry diffing was used in preference to eyeballing screenshots — it catches sub-pixel drift
that a JPEG comparison hides.

**Both measurement passes force-load every `<img>` first.** Several sections lazy-load their
images and under-report their height until those resolve; two "discrepancies" turned out to be
this artifact on the *original*, not defects in the clone.

## Desktop — 1920px viewport

| Section | Original | Clone | Δ |
| --- | ---: | ---: | ---: |
| Hero | 945 | 945 | 0 |
| Latest news | 833 | 833 | 0 |
| Platform stack (desktop) | 1420 | 1420 | 0 |
| Platform stack (mobile) | 0 (hidden) | 0 (hidden) | 0 |
| Infrastructure | 1460 | 1460 | 0 |
| Trusted-by logos | 416 | 416 | 0 |
| Testimonials | 764 | 764 | 0 |
| Industry solutions | 1014 | 1014 | 0 |
| Latest stories | 705 | 705 | 0 |
| CTA | 428 | 428 | 0 |
| **Document** | **9180** | **9180** | **0** |

Hero h1 box: original `[337, 309, 604, 144]`, clone `[337, 309, 604, 144]` — exact.
Hero video box: original `[1025, 65, 880, 880]`, clone `[1025, 65, 880, 880]` — exact.

## Mobile — 390px viewport (measured in a same-origin iframe)

| Section | Original | Clone | Δ |
| --- | ---: | ---: | ---: |
| Hero | 844 | 844 | 0 |
| Latest news | 741 | 740 | 1 |
| Platform stack (desktop) | 0 (hidden) | 0 (hidden) | 0 |
| Platform stack (mobile) | 1353 | 1353 | 0 |
| Infrastructure | 2456 | 2456 | 0 |
| Trusted-by logos | 672 | 672 | 0 |
| Testimonials | 650 | 650 | 0 |
| Industry solutions | 862 | 862 | 0 |
| Latest stories | 613 | 613 | 0 |
| CTA | 432 | 432 | 0 |
| **Document** | **10467** | **10464** | **3** |

Remaining deltas are sub-pixel rounding.

## Defects found and fixed

### 1. Wrong font — the highest-impact defect
The foundation used `next/font/google`'s `DM_Sans`. The site does **not** use the Google build:
it self-hosts `DMSans-VariableFont_opsz,wght.ttf`, a variable font with an **optical-size axis**
that tightens glyphs as size rises. Google's build exposes only the weight axis.

Measured on the string "A complete AI cloud platform" at 48px/500:

| Face | Ink width |
| --- | ---: |
| Source `Dmsans` (opsz variable) | 595.4px |
| `next/font/google` DM Sans | 662.5px (+11%) |

At 11% wider the platform heading wrapped to two lines, making that section 52px too tall — and
the same error was silently distorting every heading on the page. Fixed by downloading the three
real `.ttf` files and serving them through `next/font/local`. Section heights went to an exact
match immediately afterwards.

### 2. Hero content 36px too high
`.section-full-height` carries `padding-top: 73px` (the header height) so its vertically centred
content clears the fixed header. The clone omitted it, putting the h1 at y=273 instead of y=309.

### 3. Hero video collapsed to 300×150
The `mix-blend-luminosity` wrapper had no dimensions, so the video's `h-full w-full` resolved
against an auto-sized parent and fell back to the intrinsic video size. Fixed by giving the
wrapper `h-full w-full`; the box is now exactly 880×880 at `[1025, 65]`.

### 4. Four sections hand-rolled the dashed rules
`HeroSection`, `LatestNewsSection`, `TrustedLogosSection` and `CtaSection` each built their own
copy, three of them with a flat colour rather than the real 4px-on/4px-off gradient. All four now
import the shared `SectionLines`, with each host's negative-z layer ordering preserved.

### 5. Header scroll scrub was completely dead
`SiteHeader` declared `headerRef` and read it inside two effects, but never attached it to the
`<header>` element. `headerRef.current` was therefore always null, so both the background
opacity scrub and the `--header-height` publisher silently did nothing — the header stayed
fully transparent at every scroll position. Fixed by adding `ref={headerRef}`.

Verified after the fix, driving a **real wheel scroll**:

| scrollY | original | clone |
| ---: | ---: | ---: |
| 0 | 0 | 0 |
| 200 | 0.9721 | 0.9709 |
| 600 | 1 | 1 |

> **Measurement caveat — this is how the bug nearly hid.** Programmatic `window.scrollTo()`
> issued from the browser-extension context does not deliver scroll events to the page's own
> listeners. Probing that way reports a frozen value on BOTH the original and the clone, which
> is exactly what made the dead listener look like correct behaviour at first. Always verify
> scroll-driven effects with a real wheel scroll.

## Investigated and dismissed

- **Logos band 296 vs 416.** Not a defect — the *original* reports 296 until its nine logos load.
  With images forced, both sides read 416.
- **Blue sphere in the Rive canvas.** Not a defect — a pointer-hover response from the artboard.
  It disappears when the cursor leaves the canvas, matching the live site.
- **Hydration warning in the dev overlay.** Confirmed to be a browser extension, not the
  clone: 6 elements (BUTTON, INPUT) carry an `fdprocessedid` attribute in the live DOM, while
  the server-rendered HTML contains 0 occurrences and the source tree contains 0. React lists
  extension interference as a cause of exactly this message.

## Known gaps

- **Nav dropdown map behaviour.** The header's four mega-dropdowns are built with all their
  content, hover/focus/Escape handling and the hover bridge. The data-centre panel's
  JS-driven map interactions (`data-dc-location` / `data-map-el` highlighting) are carried as
  attributes but not wired; hover falls back to the stylesheet's own `:hover` rules.
- **Newsletter form is intentionally inert.** The real site mounts a HubSpot embed. The clone
  reproduces the field visually and posts nowhere, by design.
- **Infrastructure card descriptions are present but collapsed** (`h-0 overflow-hidden`),
  matching the source, where a Webflow interaction script drives their height.
- **Video card expand-on-interaction** and other Webflow micro-interactions beyond those
  documented in `BEHAVIORS.md` were not reverse-engineered.
- Outbound links point at real nscale.com paths that do not exist in this single-page clone.
