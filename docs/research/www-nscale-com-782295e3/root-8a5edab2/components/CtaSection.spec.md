# CtaSection Specification

## Overview
- **Target file:** `src/components/sites/www-nscale-com-782295e3/root-8a5edab2/CtaSection.tsx`
- **Screenshot:** `docs/design-references/www-nscale-com-782295e3/root-8a5edab2/desktop-10-cta-footer.jpg`
- **Interaction model:** static
- **Measured box:** 428px tall, starts at page Y 7446

## What this is
The closing call-to-action directly above the footer: an `h2` reading
"Access thousands of GPUs tailored to your needs" over a wide photographic background of GPU
racks, with a single "Reserve GPUs ->" button beneath it. Copy is left-aligned in the container;
the rack image bleeds to the right edge.

## Assets
Two background images, desktop and mobile, already downloaded:
- `public/sites/www-nscale-com-782295e3/root-8a5edab2/images/69ef2ee669eaa4a13d803d32_section_cta-bg.avif`  (desktop)
- `public/sites/www-nscale-com-782295e3/root-8a5edab2/images/69ef53b54feaaf14e5110977_section_cta-bg-mobile.avif`  (mobile)

The source swaps them by breakpoint. Check the DOM below for whether that is a `<picture>`,
two `<img>` with hide classes, or a CSS background, and mirror the same mechanism.

## States & Behaviors
- Static. The button uses the shared `data-btn-hover` treatment.

## Responsive
Follow the CSS block; note the desktop/mobile background swap above.

## Source DOM (verbatim from the live page)

```html
<section class="section">
  <div data-wf--section_padding--variant="large" class="section_padding">
  </div>
  <div class="padding-global">
    <div class="container-large">
      <div class="section_cta">
        <h2 class="text-heading-h2 sm-text-heading-h2-mobile">Access thousands of GPUs tailored to your needs</h2>
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
  <img sizes="100vw" srcset="https://cdn.prod.website-files.com/69e759200831878be71184d8/69ef2ee669eaa4a13d803d32_section_cta-bg-p-500.avif 500w, https://cdn.prod.website-files.com/69e759200831878be71184d8/69ef2ee669eaa4a13d803d32_section_cta-bg-p-800.avif 800w, https://cdn.prod.website-files.com/69e759200831878be71184d8/69ef2ee669eaa4a13d803d32_section_cta-bg-p-1080.avif 1080w, https://cdn.prod.website-files.com/69e759200831878be71184d8/69ef2ee669eaa4a13d803d32_section_cta-bg.avif 1440w" alt="" src="https://cdn.prod.website-files.com/69e759200831878be71184d8/69ef2ee669eaa4a13d803d32_section_cta-bg.avif" loading="lazy" class="cta_background-img is-desktop"/>
  <img sizes="100vw" srcset="https://cdn.prod.website-files.com/69e759200831878be71184d8/69ef53b54feaaf14e5110977_section_cta-bg-mobile-p-500.avif 500w, https://cdn.prod.website-files.com/69e759200831878be71184d8/69ef53b54feaaf14e5110977_section_cta-bg-mobile-p-800.avif 800w, https://cdn.prod.website-files.com/69e759200831878be71184d8/69ef53b54feaaf14e5110977_section_cta-bg-mobile-p-1080.avif 1080w, https://cdn.prod.website-files.com/69e759200831878be71184d8/69ef53b54feaaf14e5110977_section_cta-bg-mobile.avif 1500w" alt="" src="https://cdn.prod.website-files.com/69e759200831878be71184d8/69ef53b54feaaf14e5110977_section_cta-bg-mobile.avif" loading="lazy" class="cta_background-img is-mobile"/>
</section>
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
### .cta_background-img
  [base] .cta_background-img { z-index: -2; object-fit: cover; width: 100%; height: 100%; position: absolute; inset: 0%; }
  [base] .cta_background-img.is-mobile { display: none; }
  [@media screen and (max-width: 767px)] .cta_background-img.is-desktop { display: none; }
  [@media screen and (max-width: 767px)] .cta_background-img.is-mobile { display: inline-block; }
### .padding-global
  [base] .padding-global { padding-left: 1.5rem; padding-right: 1.5rem; }
  [@media screen and (max-width: 767px)] .padding-global { padding-left: 1.25rem; padding-right: 1.25rem; }
### .section
  [base] .section { position: relative; }
  [base] .section:where(.w-variant-a6f0d73b-2f0b-2190-bcf7-2004f73c9b6b), .section.hidden { overflow: hidden; }
  [base] .section.is-mode-light { --background--primary: white; --content--secondary: #0c0c0ecc; --content--primary: #0c0c0e; --content--link: #0f41f3; --background--inverse: #0c0c0e; --content--inverse: white; --border--glass-primary: #0c0c0e66; --background--glass-primary: #ffffff1a; --border--secondary: #0c0c0e2e; --background--highlight: #0f41f3; --background--glass-secondary: #ffffff0d; --background--secondary: #f5f5f4; --content--highlight: #0f41f3; --border--primary: #0c0c0e66; --background--glass-deep-blue: #0e0e17cc; --content--tertiary: #0c0c0e8c; --border--glass-secondary: #0c0c0e52; --background--glass-dark: #1a1a2acc; --border--hover: #fffc; --background--glass-blue: #00013bcc; --background--glass-green: #0f1714cc; --background--glass-purple: #0b0313cc; --background--glass-orange: #100902cc; }
### .section_cta
  [base] .section_cta { grid-column-gap: 2.5rem; grid-row-gap: 2.5rem; flex-flow: column; justify-content: flex-start; align-items: flex-start; max-width: 45rem; display: flex; }
  [@media screen and (max-width: 767px)] .section_cta { align-items: stretch; padding-bottom: 2.5rem; }
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

- Access thousands of GPUs tailored to your needs
- Reserve GPUs
