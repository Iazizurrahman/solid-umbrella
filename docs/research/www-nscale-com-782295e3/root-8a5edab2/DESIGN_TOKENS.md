# Design Tokens — nscale.com

Source: `nscale-v4.webflow.shared.04a529bd2.css` (Webflow). Extracted from the CSS source of
truth plus `getComputedStyle()` verification at a 1920px CSS viewport.

## Theme

The site is **dark-only**. There is no theme toggle. The stylesheet declares `:root` twice —
a light collection first, then a dark collection that overrides it. **The dark block wins**;
these are the only values that ever render. Do not implement the light palette.

`body { background: var(--background--primary); color: var(--content--secondary); }`

## Color tokens (effective / dark)

| Token | Value | Notes |
| --- | --- | --- |
| `--background--primary` | `#0c0c0e` | Page background |
| `--background--secondary` | `#161618` | Raised surfaces |
| `--background--inverse` | `#ffffff` | Inverted (light) blocks |
| `--background--highlight` | `#0f41f3` | Brand blue |
| `--content--primary` | `#ffffff` | Headings |
| `--content--secondary` | `#ffffffe6` | Body copy (90%) |
| `--content--tertiary` | `#ffffff80` | Muted (50%) |
| `--content--inverse` | `#0c0c0e` | Text on light |
| `--content--highlight` | `#0f41f3` | Brand blue text |
| `--content--link` | `#0f98f3` | Links (note: differs from highlight) |
| `--border--primary` | `#ffffff33` | 20% |
| `--border--secondary` | `#ffffff1a` | 10% — section separators |
| `--border--hover` | `#ffffff66` | 40% |
| `--border--glass-primary` | `#ffffff1a` | |
| `--border--glass-secondary` | `#ffffff0d` | |
| `--background--glass-primary` | `#ffffff1a` | |
| `--background--glass-secondary` | `#ffffff0d` | |
| `--background--glass-dark` | `#1a1a2acc` | |
| `--background--glass-deep-blue` | `#0e0e17cc` | |
| `--background--glass-blue` | `#00013bcc` | |
| `--background--glass-green` | `#0f1714cc` | |
| `--background--glass-purple` | `#0b0313cc` | |
| `--background--glass-orange` | `#100902cc` | |

## Fonts

- **DM Sans** — variable, `100 1000`. Primary UI/heading face. Weights used: 400, 500, 600, 700.
- **DM Mono** — `400` (and `500` declared). Used for buttons, eyebrow labels, stat figures.
- Fallback stack in source: `Dmsans, Arial, sans-serif` / `Dmmono, Arial, sans-serif`.
- Both are on Google Fonts, so load via `next/font/google` (`DM_Sans`, `DM_Mono`).
- Declared-but-unused faces in the Webflow bundle (ignore): Open Sans, Quill Sans Display,
  Plus Jakarta Sans, webflow-icons.

## Typography scale

Root font-size is 16px, so `1rem = 16px`.

| Class | size | weight | line-height | letter-spacing |
| --- | --- | --- | --- | --- |
| `.text-heading-h1` | 4.5rem / 72px | 500 | 4.5rem / 72px | -.03em |
| `.text-heading-h1-mobile` | 3rem / 48px | 500 | 3rem / 48px | -.03em |
| `.text-heading-h2` | 3.5rem / 56px | 500 | 3.625rem / 58px | — |
| `.text-heading-h2-mobile` | 2.5rem / 40px | 500 | 3rem / 48px | — |
| `.text-heading-h3` | 3rem / 48px | 500 | 3.25rem / 52px | — |
| `.text-heading-h3-mobile` | 2rem / 32px | 500 | 2.625rem / 42px | — |
| `.text-heading-h4` | 2rem / 32px | 500 | 2.5rem / 40px | — |
| `.text-heading-h4-mobile` | 1.75rem / 28px | 500 | 2rem / 32px | — |
| `.text-heading-h5` | 1.5rem / 24px | 500 | 2rem / 32px | — |
| `.text-heading-h6` | 1rem / 16px | 700 | 1.25rem / 20px | — |
| `.text-body-lg` | 1.125rem / 18px | — | 1.625rem / 26px | — |
| `.text-body-md` | 1rem / 16px | — | 1.5rem / 24px | — |
| `.text-body-sm` | .875rem / 14px | — | 1.25rem / 20px | — |
| `.text-label-lg-bold` | 1.125rem / 18px | 600 | 1.5rem / 24px | — |
| `.text-label-lg-regular` | 1.125rem / 18px | 400 | 1.5rem / 24px | — |
| `.text-label-md-bold` | 1rem / 16px | 600 | 1.5rem / 24px | — |
| `.text-label-md-regular` | 1rem / 16px | 400 | 1.5rem / 24px | — |
| `.text-label-sm-bold` | .875rem / 14px | 600 | 1.25rem / 20px | — |
| `.text-label-sm-regular` | .875rem / 14px | 400 | 1.25rem / 20px | — |
| `.text-label-xs-bold` | .75rem / 12px | 600 | 1rem / 16px | — |
| `.text-label-xs-regular` | .75rem / 12px | 400 | 1rem / 16px | — |
| `.text-nav-regular` | 1rem / 16px | 400 | 1rem / 16px | — |
| `.text-nav-label-tiny` | .625rem / 10px | 600 | .75rem / 12px | uppercase, `--content--tertiary` |
| `.text-mono-xl` | 2rem / 32px | 400 | 2rem / 32px | DM Mono |
| `.text-mono-lg` | 1.5rem / 24px | 400 | 1.5rem / 24px | DM Mono |
| `.text-mono-md` | 1.125rem / 18px | 400 | 1.5rem / 24px | DM Mono |
| `.text-mono-sm-bold` | 1rem / 16px | 500 | 1.25rem / 20px | DM Mono |
| `.text-mono-sm-regular` | 1rem / 16px | 400 | 1.25rem / 20px | DM Mono |
| `.text-mono-xs-regular` | .875rem / 14px | 400 | 1rem / 16px | DM Mono |

Mobile heading variants are **separate classes**, not media-query overrides — the markup swaps
the class. Mirror that with responsive Tailwind utilities.

## Layout

| Token | Value |
| --- | --- |
| `.container-large` | `width:100%; max-width:77rem (1232px); margin-inline:auto` |
| `.padding-global` | `padding-inline: 1.5rem (24px)`; `1.25rem (20px)` at ≤767px |
| `.section` | `position: relative` |
| `.section-separator` | `background: var(--border--secondary); height: 1px; width: 100%` |
| `.header` | `position: fixed; inset: 0 0 auto; z-index: 999` |
| `.header_wrap` | `flex; space-between; align-center; padding-block: 1.0625rem (17px)`; `.5rem (8px)` at ≤991px |

Content column is capped at **1232px** and centered, so a 1920px viewport renders the same
content box as 1440px. Extraction was done at 1920 for this reason.

## Breakpoints

Webflow defaults plus two custom tiers:

| Query | Meaning |
| --- | --- |
| `min-width: 992px` | desktop (`.hide-desktop { display:none }`) |
| `max-width: 991px` | tablet — header gains `border-bottom: 1px solid #ffffff1a` |
| `max-width: 767px` | mobile landscape — `.padding-global` drops to 20px |
| `max-width: 479px` | mobile portrait |
| `min-width: 1440px` | only `.blog-filters_mobile { display:none }` — **not used on the homepage** |

Because the ≥1440 tier is a no-op here, desktop fidelity is fully determined by the ≥992 tier.
