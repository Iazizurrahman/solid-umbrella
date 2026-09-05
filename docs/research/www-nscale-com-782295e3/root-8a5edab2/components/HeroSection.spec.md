# HeroSection Specification

## Overview
- **Target file:** `src/components/sites/www-nscale-com-782295e3/root-8a5edab2/HeroSection.tsx`
- **Screenshot:** `docs/design-references/www-nscale-com-782295e3/root-8a5edab2/desktop-01-hero.jpg`
- **Interaction model:** static layout + autoplaying background video
- **Measured box:** full-bleed, height 945px at a 1920px viewport (`section-full-height`)

## What this is
Full-viewport hero. A looping video fills the whole section as a background; the copy block sits
on top, left-aligned inside the 1232px container. Faint vertical dashed rules run over it.

## CORRECTED: how the hero background is actually composed

An earlier draft of this spec claimed the blue background was the video. That was wrong.
Verified against the live page with getComputedStyle at a 1920px viewport:

1. **The blue is a CSS gradient**, on the `.section_color` element:
   `background-image: linear-gradient(45deg, rgb(15,65,243) 16%, rgb(40,157,208))`
   (i.e. `linear-gradient(45deg, #0f41f3 16%, #289dd0)`), `background-color: transparent`.
   It covers the whole hero, which measures 1905x945 at a 1920px viewport.

2. **The video is a fixed 880x880 square pinned to the bottom-right corner**, not full-bleed.
   Measured rect: 880x880, `position: absolute`, right edge flush with the viewport edge.
   Element: `.index-hero_video`. Its inner wrapper uses `mix-blend-mode: luminosity`, so the
   video reads as texture over the gradient rather than as its own image.
   Responsive: 880px, dropping to 420px at <=767px and 320px at <=479px.

Both codec files are already downloaded:
- `PAGE_ASSETS/videos/nscale-homepage-animation-web-v4-vp9-chrome.webm`  (VP9, 22MB)
- `PAGE_ASSETS/videos/nscale-homepage-animation-web-v4-hevc-safari.mp4`  (HEVC, 65MB)

Render with the WebM `<source>` FIRST so Chrome takes the 22MB file, not the 65MB HEVC one:

```tsx
<video autoPlay loop muted playsInline>
  <source src=".../nscale-homepage-animation-web-v4-vp9-chrome.webm" type="video/webm" />
  <source src=".../nscale-homepage-animation-web-v4-hevc-safari.mp4" type="video/mp4" />
</video>
```

Layer order back to front: gradient, dashed rules, video, copy.

## Header overlap
The header is `position: fixed` and fully transparent at scroll 0, so the video shows through it.
This section starts at page Y 0 and flows UNDER the header. Do not add top padding to clear the
header - the design intends the video to run behind it.

## States & Behaviors
- **Static.** No scroll animation, no hover on the section itself.
- The `Reserve GPUs` button carries the shared `data-btn-hover` treatment (26 uses site-wide).
  Build it with the shared Button component if one exists by the time you run; otherwise match
  the CSS below exactly and leave a TODO comment.

## Responsive
- Desktop (>=992px): `.text-heading-h1` = 72px/72px, -0.03em.
- Mobile: the markup swaps to `.text-heading-h1-mobile` = 48px/48px. These are separate classes,
  NOT media-query overrides - mirror with responsive Tailwind utilities.
- `.padding-global` 24px, dropping to 20px at <=767px.

## Source DOM (verbatim from the live page)

```html
<div class="index_hero">
  <div class="index-hero_video w-embed">
    <div style="mix-blend-mode: luminosity; isolation: isolate; transform:translateZ(0); display: flex;
      will-change: transform;">
          <video 
            width="100%" 
            height="100%" 
            autoplay 
            loop 
            muted 
            playsinline
            webkit-playsinline>
            <source
              src="https://nscale.b-cdn.net/Nscale-Website%20V4/Nscale%20Homepage%20Animation%20Web%20V4-hevc-safari.mp4"
              type="video/mp4; codecs=hvc1">
            <source
              src="https://nscale.b-cdn.net/Nscale-Website%20V4/Nscale%20Homepage%20Animation%20Web%20V4-vp9-chrome.webm"
              type="video/webm">
          </video>
    </div>
  </div>
  <div data-wf--section_color--variant="gradient" class="section_color w-variant-a93219a0-6b1f-4aab-2d54-dc587f75401f">
  </div>
  <section data-wf--section--overflow="visible" class="section section-full-height">
    <div data-wf--section_padding--variant="none" class="section_padding w-variant-3ab4b568-3605-0bac-1e4b-2c76cffa79a5">
    </div>
    <div class="padding-global">
      <div class="container-large">
        <div>
          <div class="section_hero-split">
            <div class="hero-split_content">
              <div data-wf--hero-content--variant="body-narrow" class="hero-content">
                <div class="hero-content_copy">
                  <h1 data-wf--hero-content_title--variant="large" class="text-heading-h2 sm-text-heading-h2-mobile w-variant-07253826-dd93-d8a5-5c2f-288d860ed66d">The engine of superintelligence</h1>
                  <div class="hero-content_desc w-variant-6f1f9a72-c56c-8aa9-dc97-00731945efd1">
                    <p class="text-body-md">Full-stack AI infrastructure powering the world’s most powerful systems, from ground to cloud.</p>
                  </div>
                </div>
                <div class="hero-content_buttons">
                  <a href="/contact/sales" class="w-inline-block">
                    <div data-btn-hover="True" data-wf--button--variant="solid" class="button">
                      <span>Reserve GPUs</span>
                      <div>
                        <div class="button_icon w-embed">
                          <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="…(see icons.tsx)" fill="currentColor"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div data-wf--section_padding--variant="large" class="section_padding">
    </div>
    <div class="section_lines">
      <div class="section_lines_line">
      </div>
      <div class="section_lines_line">
      </div>
      <div class="section_lines_line">
      </div>
      <div class="section_lines_line is-mobile">
      </div>
      <div class="section_lines_line is-mobile">
      </div>
    </div>
    <div data-wf--section_color--variant="transparent" class="section_color w-variant-952d1d7e-053e-768a-c2f6-c31b941c696d">
    </div>
  </section>
</div>
```

## Exact CSS for every class in this section

Rules are copied from `nscale-v4.webflow.shared.04a529bd2.css`. `[base]` has no media
query; other tags show the exact query the rule sits inside. These are source values, not
estimates — use them literally.

```css
### .button
  [base] .button { grid-column-gap: .25rem; grid-row-gap: .25rem; background-color: var(--background--inverse); color: var(--content--inverse); text-align: center; letter-spacing: .02em; border-radius: 4px; justify-content: center; align-items: center; padding: .375rem 1rem; font-family: Dmmono, Arial, sans-serif; font-size: 1rem; line-height: 1.25rem; transition: all .2s; display: flex; }
  [base] .button:where(.w-variant-5057a24d-38d9-5143-607f-674b39e3a2f2) { border: 1px solid var(--border--glass-primary); background-color: var(--background--glass-primary); -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px); color: var(--content--primary); }
  [base] .button:where(.w-variant-102d8d7c-b6c2-bee4-5324-47d2981389c4) { color: var(--content--primary); background-color: #0000; border-radius: 0; padding: 0; }
  [base] .button:where(.w-variant-1aebf52f-070e-4d15-f0a9-30cd91ebcd0e) { color: var(--content--primary); background-color: #0000; border-radius: 0; padding: 0; font-size: .75rem; line-height: 1rem; }
  [base] .button:where(.w-variant-55beb8f2-a233-f342-22e7-eb78f8144ecb) { border: 1px solid var(--border--secondary); background-color: var(--background--highlight); color: var(--content--primary); }
  [base] .button:where(.w-variant-47b9ccef-d0cb-db10-fffb-a11def716369) { color: var(--content--link); background-color: #0000; border-radius: 0; padding: 0; }
  [base] .button:hover { opacity: .8; }
  [base] .button:hover:where(.w-variant-5057a24d-38d9-5143-607f-674b39e3a2f2) { background-color: var(--background--glass-secondary); opacity: 100; }
  [base] .button:hover:where(.w-variant-55beb8f2-a233-f342-22e7-eb78f8144ecb) { opacity: .4; }
  [base] .button.glass { border: 1px solid var(--border--glass-primary); background-color: var(--background--glass-primary); -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px); color: var(--content--primary); }
  [base] .button.glass:hover { background-color: var(--background--glass-secondary); opacity: 100; }
### .button_icon
  [base] .button_icon { justify-content: center; align-items: center; width: 1rem; transition: all .2s; display: flex; }
  [base] .button_icon:where(.w-variant-1aebf52f-070e-4d15-f0a9-30cd91ebcd0e) { width: .75rem; }
### .container-large
  [base] .container-large { width: 100%; max-width: 77rem; margin-left: auto; margin-right: auto; }
### .hero-content
  [base] .hero-content { grid-column-gap: 2rem; grid-row-gap: 2rem; flex-flow: column; max-width: 37.75rem; display: flex; }
  [base] .hero-content:where(.w-variant-c6381093-e08d-6d6b-57f6-c83e96686db6) { max-width: 45rem; }
  [@media screen and (max-width: 991px)] .hero-content.is-services { width: 100%; max-width: none; }
  [@media screen and (max-width: 767px)] .hero-content { grid-column-gap: 1.5rem; grid-row-gap: 1.5rem; max-width: none; }
  [@media screen and (max-width: 767px)] .hero-content:where(.w-variant-c6381093-e08d-6d6b-57f6-c83e96686db6), .hero-content_desc:where(.w-variant-6f1f9a72-c56c-8aa9-dc97-00731945efd1) { max-width: none; }
### .hero-content_buttons
  [base] .hero-content_buttons { grid-column-gap: 1.5rem; grid-row-gap: 1.5rem; justify-content: flex-start; align-items: center; display: flex; }
  [@media screen and (max-width: 767px)] .hero-content_buttons { flex-flow: column; align-items: stretch; }
### .hero-content_copy
  [base] .hero-content_copy { grid-column-gap: 1.5rem; grid-row-gap: 1.5rem; flex-flow: column; max-width: 37.75rem; display: flex; }
  [base] .hero-content_copy:where(.w-variant-c6381093-e08d-6d6b-57f6-c83e96686db6), .hero-content_copy.wide-2 { max-width: 45rem; }
### .hero-content_desc
  [base] .hero-content_desc { color: var(--content--secondary); }
  [base] .hero-content_desc:where(.w-variant-6f1f9a72-c56c-8aa9-dc97-00731945efd1) { max-width: 25rem; }
  [@media screen and (max-width: 767px)] .hero-content:where(.w-variant-c6381093-e08d-6d6b-57f6-c83e96686db6), .hero-content_desc:where(.w-variant-6f1f9a72-c56c-8aa9-dc97-00731945efd1) { max-width: none; }
### .hero-split_content
  [base] .hero-split_content { grid-column-gap: 2.5rem; grid-row-gap: 2.5rem; flex-flow: column; width: 100%; display: flex; }
### .index-hero_video
  [base] .index-hero_video { aspect-ratio: 1; justify-content: flex-end; align-items: flex-end; width: 880px; display: flex; position: absolute; bottom: 0; right: 0; }
  [@media screen and (max-width: 767px)] .index-hero_video { width: 420px; }
  [@media screen and (max-width: 479px)] .index-hero_video { width: 320px; }
### .index_hero
  [base] .index_hero { justify-content: flex-start; align-items: stretch; overflow: hidden; }
### .padding-global
  [base] .padding-global { padding-left: 1.5rem; padding-right: 1.5rem; }
  [@media screen and (max-width: 767px)] .padding-global { padding-left: 1.25rem; padding-right: 1.25rem; }
### .section
  [base] .section { position: relative; }
  [base] .section:where(.w-variant-a6f0d73b-2f0b-2190-bcf7-2004f73c9b6b), .section.hidden { overflow: hidden; }
  [base] .section.is-mode-light { --background--primary: white; --content--secondary: #0c0c0ecc; --content--primary: #0c0c0e; --content--link: #0f41f3; --background--inverse: #0c0c0e; --content--inverse: white; --border--glass-primary: #0c0c0e66; --background--glass-primary: #ffffff1a; --border--secondary: #0c0c0e2e; --background--highlight: #0f41f3; --background--glass-secondary: #ffffff0d; --background--secondary: #f5f5f4; --content--highlight: #0f41f3; --border--primary: #0c0c0e66; --background--glass-deep-blue: #0e0e17cc; --content--tertiary: #0c0c0e8c; --border--glass-secondary: #0c0c0e52; --background--glass-dark: #1a1a2acc; --border--hover: #fffc; --background--glass-blue: #00013bcc; --background--glass-green: #0f1714cc; --background--glass-purple: #0b0313cc; --background--glass-orange: #100902cc; }
### .section_color
  [base] .section_color { z-index: -3; background-color: var(--background--primary); width: 100%; height: 100%; position: absolute; inset: 0%; }
  [base] .section_color:where(.w-variant-93736dc9-d461-0447-5659-9551d59aef78) { background-color: var(--background--secondary); }
  [base] .section_color:where(.w-variant-a93219a0-6b1f-4aab-2d54-dc587f75401f) { background-color: #0000; background-image: linear-gradient(45deg, #0f41f3 16%, #289dd0); }
  [base] .section_color:where(.w-variant-952d1d7e-053e-768a-c2f6-c31b941c696d) { background-color: #0000; }
  [base] .section_color:where(.w-variant-63c1b1a5-5815-1062-9e6c-0c3c2e4ac083) { background-color: #0000; background-image: linear-gradient(120deg, #0c129b, #287cb6); }
### .section_hero-split
  [base] .section_hero-split { grid-column-gap: 3rem; grid-row-gap: 3rem; grid-template-rows: auto; grid-template-columns: 1fr 1fr; grid-auto-columns: 1fr; justify-content: space-between; align-items: center; display: flex; }
  [@media screen and (max-width: 767px)] .section_hero-split { flex-flow: column; display: flex; }
### .section_lines
  [base] .section_lines { z-index: -1; grid-column-gap: 0px; grid-row-gap: 0px; grid-template-rows: auto; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; grid-auto-columns: 1fr; justify-content: space-between; align-items: center; width: 100%; max-width: 80rem; height: 100%; margin-left: auto; margin-right: auto; padding-left: .75rem; padding-right: .75rem; display: flex; position: absolute; inset: 0%; }
  [@media screen and (max-width: 767px)] .section_lines { padding-left: .5rem; padding-right: .5rem; }
### .section_lines_line
  [base] .section_lines_line { opacity: .5; width: 1px; height: 100%; }
  [@media screen and (max-width: 767px)] .section_lines_line { display: none; }
  [@media screen and (max-width: 767px)] .section_lines_line.is-mobile { display: block; }
### .section_padding
  [base] .section_padding { height: 7.5rem; }
  [base] .section_padding:where(.w-variant-3ab4b568-3605-0bac-1e4b-2c76cffa79a5) { height: 0; }
  [base] .section_padding:where(.w-variant-fc37658f-a6ef-014c-274d-19c5e5328304) { height: 8.75rem; }
  [base] .section_padding:where(.w-variant-377881b6-3202-5f37-7187-0b5c689fae14) { height: 2.5rem; }
  [@media screen and (max-width: 767px)] .section_padding { height: 5.5rem; }
  [@media screen and (max-width: 767px)] .section_padding:where(.w-variant-3ab4b568-3605-0bac-1e4b-2c76cffa79a5) { height: 0; }
  [@media screen and (max-width: 767px)] .section_padding:where(.w-variant-377881b6-3202-5f37-7187-0b5c689fae14) { height: 2rem; }
### .sm-text-heading-h2-mobile
  [@media screen and (max-width: 767px)] .sm-text-heading-h2-mobile { font-size: 2.5rem; font-weight: 500; line-height: 3rem; }
### .text-body-md
  [base] .text-body-md { font-size: 1rem; line-height: 1.5rem; }
### .text-heading-h2
  [base] .text-heading-h2 { font-size: 3.5rem; font-weight: 500; line-height: 3.625rem; }
  [base] .text-heading-h2.sm-text-heading-h2-mobile:where(.w-variant-07253826-dd93-d8a5-5c2f-288d860ed66d) { font-size: 4.5rem; line-height: 4.5rem; }
  [@media screen and (max-width: 767px)] .text-heading-h2.sm-text-heading-h2-mobile:where(.w-variant-07253826-dd93-d8a5-5c2f-288d860ed66d) { font-size: 2.5rem; line-height: 2.5rem; }
### .w-embed
  [base] .w-embed:before, .w-embed:after { content: " "; grid-area: 1 / 1 / 2 / 2; display: table; }
  [base] .w-embed:after { clear: both; }
### .w-inline-block
  [base] .w-inline-block { max-width: 100%; display: inline-block; }
```

## Text content (verbatim, in document order)

- The engine of superintelligence
- Full-stack AI infrastructure powering the world’s most powerful systems, from ground to cloud.
- Reserve GPUs
