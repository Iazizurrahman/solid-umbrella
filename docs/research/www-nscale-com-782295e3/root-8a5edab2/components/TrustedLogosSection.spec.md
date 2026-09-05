# TrustedLogosSection Specification

## Overview
- **Target file:** `src/components/sites/www-nscale-com-782295e3/root-8a5edab2/TrustedLogosSection.tsx`
- **Screenshot:** `docs/design-references/www-nscale-com-782295e3/root-8a5edab2/desktop-04-logos-testimonials.jpg`
- **Interaction model:** static
- **Measured box:** 296px tall, starts at page Y 4663

## What this is
A full-bleed band with a blue gradient background, a single centred headline, and 9 partner
logos laid out centred: 7 on the first row, 2 on the second (they wrap naturally - do not force
a 2-row grid, let flex-wrap with `justify-content: center` produce it).

Logos: ddn, Moonshot AI, NVIDIA, VAST, DELL, NOKIA, OpenAI, AKER, Lightning AI.

## Important
The blue gradient is a **background on an inner element**, and it starts BELOW the top of the
section - that is why the fixed header appears to sit on a dark strip above the blue. Reproduce
the inner element and its padding exactly as the DOM shows; do not paint the whole section blue.

## States & Behaviors
- Static. No hover, no scroll animation.
- Logos are `<img>` elements, already downloaded into `public/sites/www-nscale-com-782295e3/root-8a5edab2/images/`.

## Responsive
Follow the media-query rules in the CSS block below.

## Source DOM (verbatim from the live page)

```html
<section data-wf--section--overflow="visible" class="section">
  <div data-wf--section_padding--variant="large" class="section_padding">
  </div>
  <div class="padding-global">
    <div class="container-large">
      <div>
        <div class="section_partner-logos">
          <h2 class="text-heading-h5-mobile">Trusted by leading AI labs and enterprises to run critical workloads</h2>
          <div class="partner-logos_list-wrap">
            <img src="https://cdn.prod.website-files.com/69e759200831878be71184d8/6a0c4727a9e4eb44ebefa4d3_ddn.svg" loading="lazy" alt="" class="partner-logos_logo"/>
            <img src="https://cdn.prod.website-files.com/69e759200831878be71184d8/6a0c471f67a961d097366e4d_moonshot.svg" loading="lazy" alt="" class="partner-logos_logo"/>
            <img src="https://cdn.prod.website-files.com/69e759200831878be71184d8/6a0c472759dd1ad69553be79_nvidia.svg" loading="lazy" alt="" class="partner-logos_logo"/>
            <img src="https://cdn.prod.website-files.com/69e759200831878be71184d8/6a0c4727cc7a017e9a62e6b9_vast.svg" loading="lazy" alt="" class="partner-logos_logo"/>
            <img src="https://cdn.prod.website-files.com/69e759200831878be71184d8/6a0c4727f2909d6fb1d917c9_dell.svg" loading="lazy" alt="" class="partner-logos_logo"/>
            <img src="https://cdn.prod.website-files.com/69e759200831878be71184d8/6a0c4727782fbf994e6990bd_nokia.svg" loading="lazy" alt="" class="partner-logos_logo"/>
            <img src="https://cdn.prod.website-files.com/69e759200831878be71184d8/6a0c471f67a961d097366e4a_open-ai.svg" loading="lazy" alt="" class="partner-logos_logo"/>
            <img src="https://cdn.prod.website-files.com/69e759200831878be71184d8/6a0c4727f8b62fb997ec6f6b_aker.svg" loading="lazy" alt="" class="partner-logos_logo"/>
            <img src="https://cdn.prod.website-files.com/69e759200831878be71184d8/6a0c471ff8b62fb997ec6e55_lightning.svg" loading="lazy" alt="" class="partner-logos_logo"/>
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
  <div data-wf--section_color--variant="gradient" class="section_color w-variant-a93219a0-6b1f-4aab-2d54-dc587f75401f">
  </div>
</section>
```

## Exact CSS for every class in this section

Rules are copied from `nscale-v4.webflow.shared.04a529bd2.css`. `[base]` has no media
query; other tags show the exact query the rule sits inside. These are source values, not
estimates — use them literally.

```css
### .container-large
  [base] .container-large { width: 100%; max-width: 77rem; margin-left: auto; margin-right: auto; }
### .padding-global
  [base] .padding-global { padding-left: 1.5rem; padding-right: 1.5rem; }
  [@media screen and (max-width: 767px)] .padding-global { padding-left: 1.25rem; padding-right: 1.25rem; }
### .partner-logos_list-wrap
  [base] .partner-logos_list-wrap { grid-column-gap: 2.5rem; grid-row-gap: 2.5rem; flex-flow: wrap; justify-content: center; align-items: center; width: 100%; max-width: 60rem; display: flex; }
### .partner-logos_logo
  [@media screen and (max-width: 991px)] .partner-logos_logo { height: 2.5rem; }
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
### .section_partner-logos
  [base] .section_partner-logos { grid-column-gap: 1.5rem; grid-row-gap: 1.5rem; text-align: center; flex-flow: column; justify-content: flex-start; align-items: center; max-width: 958px; margin-left: auto; margin-right: auto; display: flex; }
  [@media screen and (max-width: 767px)] .section_partner-logos { grid-column-gap: 2.5rem; grid-row-gap: 2.5rem; }
### .text-heading-h5-mobile
  [base] .text-heading-h5-mobile { font-size: 1.5rem; font-weight: 500; line-height: 2rem; }
```

## Text content (verbatim, in document order)

- Trusted by leading AI labs and enterprises to run critical workloads
