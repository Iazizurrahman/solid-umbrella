# IndustrySolutionsSection Specification

## Overview
- **Target file:** `src/components/sites/www-nscale-com-782295e3/root-8a5edab2/IndustrySolutionsSection.tsx`
- **Screenshot:** `docs/design-references/www-nscale-com-782295e3/root-8a5edab2/desktop-07-industry-solutions.jpg`
- **Measured box:** 1014px tall, starts at page Y 5725

## INTERACTION MODEL - read this before writing anything

The DOM contains tab triggers (`data-tab-trigger="telco"` and `"ai-native"`) and tab panels
(`data-tab="telco"` and `"ai-native"`). It is tempting to build a tabbed interface. **Do not.**

The site's JavaScript registers the tab behavior inside:

```js
gsap.matchMedia().add("(max-width: 767px)", () => { /* tab click handlers */ })
```

The tabs therefore exist **ONLY at 767px and below**. At desktop there are NO tabs: both cards
sit side by side and are fully visible at once — exactly as the reference screenshot shows, with
Telecommunication on the left and AI Native on the right.

So:
- **Desktop (>=768px):** static two-column layout, both cards visible, tab trigger buttons
  hidden. Check the CSS block for the class that hides them.
- **Mobile (<=767px):** the two cards become tab panels, the triggers appear, and clicking one
  cross-fades its panel in. GSAP sets the inactive panel to `autoAlpha: 0` and stacks the panels
  on top of each other. Reproduce as a cross-fade, not a slide.

Build this as a `"use client"` component whose tab state only takes effect below 768px — render
both panels and let CSS stack/hide them, toggling an active class that only matters inside the
mobile media query. Confirm the desktop path renders both cards with no JS required.

## Content - both states are already in the DOM below
- Tab labels: "Telecommunication" and "AI Native"
- Telco: subtitle "Scalable, AI-native infrastructure", its paragraph, then "Learn more"
- AI Native: subtitle "Accelerated AI model deployment", its paragraph, then "Learn more"

Use the VERBATIM paragraph text from the text section below, curly apostrophes included.

Card images are downloaded in `public/sites/www-nscale-com-782295e3/root-8a5edab2/images/` — match by the Webflow hash prefix in each
`<img src>`; local filenames keep that prefix, lowercased. List the directory; do not guess.

## Background
The section sits on a blue gradient band. As with the logos band, check whether the gradient is
on the section itself or on an inner element, and mirror the source exactly.

## Responsive
The one breakpoint that matters is 767/768, per the matchMedia call above.

## Source DOM (verbatim from the live page)

```html
<section data-wf--section--overflow="visible" class="section">
  <div data-wf--section_padding--variant="large" class="section_padding">
  </div>
  <div class="padding-global">
    <div class="container-large">
      <div>
        <div data-use-case-tabs="" class="section_use-case">
          <div data-wf--body-content--variant="regular" class="body-content">
            <div class="body-content_copy">
              <div data-wf--body-content_title-wrap--variant="regular" class="body-content_title-wrap">
                <h2 class="text-heading-h3 sm-text-heading-h3-mobile">Industry solutions that scale with you</h2>
              </div>
            </div>
          </div>
          <div class="use-case_tabs w-dyn-list">
            <div role="list" class="use-case_tabs_triggers w-dyn-items">
              <div role="listitem" class="w-dyn-item">
                <button data-tab-trigger="telco" class="use-case_tabs_trigger">
                  <div class="tab-trigger">
                    <div class="text-label-sm-regular">Telecommunication</div>
                  </div>
                </button>
              </div>
              <div role="listitem" class="w-dyn-item">
                <button data-tab-trigger="ai-native" class="use-case_tabs_trigger">
                  <div class="tab-trigger">
                    <div class="text-label-sm-regular">AI Native</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div class="w-dyn-list">
            <div role="list" class="use-case_items w-dyn-items">
              <div data-tab="telco" role="listitem" class="use-case_item w-dyn-item">
                <div class="usage-card">
                  <div class="usage-card_content">
                    <img loading="lazy" src="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/69fcef17697690e9da6c548d_use-case_image-wrap.jpg" alt="" class="usage-card_image is-desktop"/>
                    <img loading="lazy" src="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/69fcef17697690e9da6c548d_use-case_image-wrap.jpg" alt="" class="usage-card_image is-mobile"/>
                    <div class="usage-card_copy">
                      <h3 class="text-heading-h5 sm-text-heading-h4-mobile">Telecommunication</h3>
                      <h4 class="text-label-md-bold sm-text-label-sm-bold">Scalable, AI-native infrastructure</h4>
                      <p class="text-body-sm sm-text-body-md">Telco companies can leverage Nscale’s GPU infrastructure to deliver AI services, optimize 5G networks, support advanced AI analytics, and drive next-generation telecommunications innovations.</p>
                    </div>
                  </div>
                  <a href="/telco" class="w-inline-block">
                    <div data-btn-hover="True" data-wf--button--variant="solid" class="button">
                      <span>Learn more</span>
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
              <div data-tab="ai-native" role="listitem" class="use-case_item w-dyn-item">
                <div class="usage-card">
                  <div class="usage-card_content">
                    <img loading="lazy" src="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/69fcf00177424da8a4dc51f7_image%2019.jpg" alt="" class="usage-card_image is-desktop"/>
                    <img loading="lazy" src="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/69fcf00177424da8a4dc51f7_image%2019.jpg" alt="" class="usage-card_image is-mobile"/>
                    <div class="usage-card_copy">
                      <h3 class="text-heading-h5 sm-text-heading-h4-mobile">AI Native</h3>
                      <h4 class="text-label-md-bold sm-text-label-sm-bold">Accelerated AI model deployment</h4>
                      <p class="text-body-sm sm-text-body-md">AI-native companies can leverage Nscale’s scalable GPU cluster infrastructure to enhance model development, support critical operations, and drive innovation in their tech solutions.</p>
                    </div>
                  </div>
                  <a href="/ai-native" class="w-inline-block">
                    <div data-btn-hover="True" data-wf--button--variant="solid" class="button">
                      <span>Learn more</span>
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
### .body-content
  [base] .body-content { grid-column-gap: 2rem; grid-row-gap: 2rem; flex-flow: column; max-width: 37.75rem; display: flex; }
  [base] .body-content:where(.w-variant-3dcd33d9-d0a0-3f1e-c2db-0dfb328fc68a) { max-width: 45rem; }
  [base] .body-content.is-center { text-align: center; justify-content: flex-start; align-items: center; }
  [@media screen and (max-width: 767px)] .body-content { max-width: none; }
### .body-content_copy
  [base] .body-content_copy { grid-column-gap: 1.5rem; grid-row-gap: 1.5rem; flex-flow: column; max-width: 37.75rem; display: flex; }
  [base] .body-content_copy:where(.w-variant-3dcd33d9-d0a0-3f1e-c2db-0dfb328fc68a) { max-width: 45rem; }
### .body-content_title-wrap
  [base] .body-content_title-wrap { grid-column-gap: 1.5rem; grid-row-gap: 1.5rem; flex-flow: column; display: flex; }
  [base] .body-content_title-wrap:where(.w-variant-e926b091-76dc-2e81-9142-436625d765c4) { grid-column-gap: .25rem; grid-row-gap: .25rem; flex-flow: column-reverse; }
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
### .section_use-case
  [base] .section_use-case { grid-column-gap: 4.5rem; grid-row-gap: 4.5rem; flex-flow: column; display: flex; }
  [@media screen and (max-width: 767px)] .section_use-case { grid-column-gap: 2.5rem; grid-row-gap: 2.5rem; flex-flow: column; }
### .sm-text-body-md
  [@media screen and (max-width: 767px)] .sm-text-body-md { font-size: 1rem; line-height: 1.5rem; }
### .sm-text-heading-h3-mobile
  [@media screen and (max-width: 767px)] .sm-text-heading-h3-mobile { font-size: 2rem; font-weight: 500; line-height: 2.625rem; }
### .sm-text-heading-h4-mobile
  [@media screen and (max-width: 767px)] .sm-text-heading-h4-mobile { font-size: 1.75rem; font-weight: 500; line-height: 2rem; }
### .sm-text-label-sm-bold
  [@media screen and (max-width: 767px)] .sm-text-label-sm-bold { font-size: .875rem; font-weight: 600; line-height: 1.25rem; }
### .tab-trigger
  [base] .tab-trigger { background-color: var(--background--glass-secondary); border-radius: 4px; padding: .625rem .75rem; }
### .text-body-sm
  [base] .text-body-sm { font-size: .875rem; line-height: 1.25rem; }
  [base] .text-body-sm.features-accordion_expand { overflow: hidden; }
### .text-heading-h3
  [base] .text-heading-h3 { font-size: 3rem; font-weight: 500; line-height: 3.25rem; }
### .text-heading-h5
  [base] .text-heading-h5 { font-size: 1.5rem; font-weight: 500; line-height: 2rem; }
  [base] .text-heading-h5.sm-text-heading-h5-mobile:where(.w-variant-9b10d970-4b22-d119-6bb1-ce94eb659ac4) { font-size: 1rem; line-height: 1.25rem; }
### .text-label-md-bold
  [base] .text-label-md-bold { font-size: 1rem; font-weight: 600; line-height: 1.5rem; }
### .text-label-sm-regular
  [base] .text-label-sm-regular { font-size: .875rem; font-weight: 400; line-height: 1.25rem; }
### .usage-card
  [base] .usage-card { grid-column-gap: 3.75rem; grid-row-gap: 3.75rem; flex-flow: column; justify-content: space-between; align-items: flex-start; display: flex; }
  [@media screen and (max-width: 767px)] .usage-card { grid-column-gap: 2.5rem; grid-row-gap: 2.5rem; }
### .usage-card_content
  [base] .usage-card_content { grid-column-gap: 1rem; grid-row-gap: 1rem; flex-flow: column; display: flex; }
### .usage-card_copy
  [base] .usage-card_copy { grid-column-gap: .5rem; grid-row-gap: .5rem; color: var(--content--primary); flex-flow: column; display: flex; }
  [@media screen and (max-width: 767px)] .usage-card_copy { grid-column-gap: 1rem; grid-row-gap: 1rem; }
### .usage-card_image
  [base] .usage-card_image { aspect-ratio: 608 / 358; object-fit: cover; border-radius: 8px; width: 100%; }
  [base] .usage-card_image.is-mobile { display: none; }
  [@media screen and (max-width: 767px)] .usage-card_image { aspect-ratio: 327 / 185; }
  [@media screen and (max-width: 767px)] .usage-card_image.is-desktop { display: none; }
  [@media screen and (max-width: 767px)] .usage-card_image.is-mobile { display: block; }
### .use-case_item
  [base] .use-case_item { transition: opacity .3s; display: flex; }
### .use-case_items
  [base] .use-case_items { grid-column-gap: 1rem; grid-row-gap: 1rem; grid-template-rows: auto; grid-template-columns: 1fr 1fr; grid-auto-columns: 1fr; display: grid; }
  [@media screen and (max-width: 767px)] .use-case_items { display: block; position: relative; }
### .use-case_tabs
  [base] .use-case_tabs { display: none; }
  [@media screen and (max-width: 767px)] .use-case_tabs { display: block; }
### .use-case_tabs_trigger
  [@media screen and (max-width: 767px)] .use-case_tabs_trigger { background-color: #0000; padding: 0; }
### .use-case_tabs_triggers
  [@media screen and (max-width: 767px)] .use-case_tabs_triggers { grid-column-gap: .5rem; grid-row-gap: .5rem; display: flex; }
### .w-embed
  [base] .w-embed:before, .w-embed:after { content: " "; grid-area: 1 / 1 / 2 / 2; display: table; }
  [base] .w-embed:after { clear: both; }
### .w-inline-block
  [base] .w-inline-block { max-width: 100%; display: inline-block; }
```

## Text content (verbatim, in document order)

- Industry solutions that scale with you
- Telecommunication
- AI Native
- Scalable, AI-native infrastructure
- Telco companies can leverage Nscale’s GPU infrastructure to deliver AI services, optimize 5G networks, support advanced AI analytics, and drive next-generation telecommunications innovations.
- Learn more
- Accelerated AI model deployment
- AI-native companies can leverage Nscale’s scalable GPU cluster infrastructure to enhance model development, support critical operations, and drive innovation in their tech solutions.
