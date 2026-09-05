# PlatformStackSection Specification (desktop, >=992px)

## Overview
- **Target file:** `src/components/sites/www-nscale-com-782295e3/root-8a5edab2/PlatformStackSection.tsx`
- **Screenshot:** `docs/design-references/www-nscale-com-782295e3/root-8a5edab2/desktop-03-platform-rive.jpg`
- **Measured box:** 1420px tall, starts at page Y 1780
- **Visibility:** this section carries `hide-tablet hide-mobile`, so it renders only at >=992px.
  A separate mobile component covers <992px — do not build the mobile variant here.

## INTERACTION MODEL: HOVER-driven Rive canvas. Not scroll-driven, not click-driven.

An earlier draft of the research notes called this scroll-driven. It is not. The site switches
layers on `mouseenter` over the four link cards. There is no ScrollTrigger on this section.

## Layout
Two columns. Left: a `<canvas>` rendering a Rive animation of an exploded isometric platform
stack. Right: a vertical list of four link cards, each an `h3` plus a paragraph. Above both sits
a centred heading block ("A complete AI cloud platform"), a one-line description, and an
"Explore the platform ->" button.

## Rive configuration - exact, taken from the site's own JS bundle

The runtime `@rive-app/react-canvas` is ALREADY INSTALLED in package.json. Use its `useRive`
hook. The `.riv` file is already downloaded to:

`public/sites/www-nscale-com-782295e3/root-8a5edab2/rive/6a72243af8c76e6552945a54_6a71c8fd5f921f9d8e0f5fb4_nscale-stack_v2.riv`

served at `/sites/www-nscale-com-782295e3/root-8a5edab2/rive/6a72243af8c76e6552945a54_6a71c8fd5f921f9d8e0f5fb4_nscale-stack_v2.riv`

```js
new Rive({
  src: "<the .riv above>",
  canvas,
  artboard: "Artboard",
  stateMachines: "LayerController",
  autoBind: true,
  autoplay: true,
  layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  onLoad: () => rive.resizeDrawingSurfaceToCanvas(),
})
window.addEventListener("resize", () => rive.resizeDrawingSurfaceToCanvas())
```

### Data binding
Four layer keys, in DOM order. **The third key is `dc`, not `data-centers`:**

| key | card |
| --- | --- |
| `cloud` | Nscale Cloud |
| `infrastructure` | Nscale Infrastructure |
| `dc` | Nscale Data Centers |
| `energy` | Nscale Energy and Power |

Through `rive.viewModelInstance`:
- `boolean(key + "_hovered")` — on `mouseenter` of a card, set that key's boolean `true` and the
  other three `false`.
- Those same booleans are also OBSERVED: subscribe to each, and when one reports `true`, add
  `is-active` to the matching card and remove it from the others. The binding runs BOTH ways, so
  hovering the artwork highlights the card and hovering the card drives the artwork.
- `trigger(key + "_clicked")` — subscribe; when it fires, navigate to that card's `href`.

Guard every `viewModelInstance` access — it is null until `onLoad`. If the Rive file fails to
load, the four cards must still render and be clickable; the canvas is an enhancement.

This component must be `"use client"`.

## Cards and hrefs
1. Nscale Cloud - `/services/ai-services`
2. Nscale Infrastructure - `/services/platform-services`
3. Nscale Data Centers - (see the DOM below)
4. Nscale Energy and Power - (see the DOM below)

Use the VERBATIM paragraph text from the text section below. Note "Nscale Energy &amp; Power"
is an ampersand entity in the source - render it as a literal "&".

## States and behaviors
- Card `.is-active`: check the CSS block for the exact active treatment.
- Button "Explore the platform" uses the shared solid `.button` styling.

## Source DOM (verbatim from the live page)

```html
<section data-wf--section--overflow="visible" class="section hide-tablet hide-mobile">
  <div data-wf--section_padding--variant="large" class="section_padding">
  </div>
  <div class="padding-global">
    <div class="container-large">
      <div>
        <div data-rive-stack-section-v2="" class="section_services-stack2">
          <div class="body-content is-center">
            <div class="body-content_copy">
              <div data-wf--body-content_title-wrap--variant="reversed" class="body-content_title-wrap w-variant-e926b091-76dc-2e81-9142-436625d765c4">
                <h2 class="text-heading-h3 sm-text-heading-h3-mobile">A complete AI cloud platform</h2>
              </div>
              <div class="body-content_desc">
                <div data-wf--body-content_rich-text--variant="bullet" class="body-content_rich-text w-richtext">
                  <p>Deploy AI on infrastructure designed for scale, resilience, and speed.</p>
                </div>
              </div>
            </div>
            <div class="body-content_buttons">
              <a href="/service-overview" class="w-inline-block">
                <div data-btn-hover="True" data-wf--button--variant="solid" class="button">
                  <span>Explore the platform</span>
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
          <div id="w-node-c9155a42-d501-7760-5a7e-f9246a58050f-d05f883d" class="services-stack2_wrap">
            <canvas data-rive-stack="" class="services-stack2_rive-canvas">
            </canvas>
            <div class="services-stack2_items-wrap">
              <a href="/services/ai-services" data-layer="cloud" class="services-stack2_item w-inline-block">
                <h3 class="text-heading-h3-mobile">Nscale Cloud</h3>
                <p class="text-body-lg">A managed platform for AI teams including dedicated inference, customizable Environments, managed Kubernetes and Slurm, enterprise IAM and security.</p>
              </a>
              <a href="/services/platform-services" data-layer="infrastructure" class="services-stack2_item w-inline-block">
                <h3 class="text-heading-h3-mobile">Nscale Infrastructure</h3>
                <p class="text-body-lg">Dedicated GPU infrastructure with a choice of operational models depending on the customers requirements.</p>
              </a>
              <a href="/services/infrastructure-services" data-layer="dc" class="services-stack2_item w-inline-block">
                <h3 class="text-heading-h3-mobile">Nscale Data Centers</h3>
                <p class="text-body-lg">Predictable capacity provided by modular, multi-megawatt data centers with sovereign controls.</p>
              </a>
              <a data-layer="energy" href="/press-releases/nscale-acquires-american-intelligence-power-corporation" class="services-stack2_item w-inline-block">
                <h3 class="text-heading-h3-mobile">Nscale Energy &amp; Power</h3>
                <p class="text-body-lg">Design and development of behind-the-meter power and grid connected land.</p>
              </a>
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
  <div data-wf--section_color--variant="secondary" class="section_color w-variant-93736dc9-d461-0447-5659-9551d59aef78">
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
### .body-content_buttons
  [base] .body-content_buttons { grid-column-gap: 1.5rem; grid-row-gap: 1.5rem; justify-content: flex-start; align-items: center; display: flex; }
  [@media screen and (max-width: 767px)] .body-content_buttons { flex-flow: column; align-items: stretch; }
### .body-content_copy
  [base] .body-content_copy { grid-column-gap: 1.5rem; grid-row-gap: 1.5rem; flex-flow: column; max-width: 37.75rem; display: flex; }
  [base] .body-content_copy:where(.w-variant-3dcd33d9-d0a0-3f1e-c2db-0dfb328fc68a) { max-width: 45rem; }
### .body-content_desc
  [base] .body-content_desc { color: var(--content--secondary); }
### .body-content_rich-text
  [base] .body-content_rich-text { grid-row-gap: 1.5rem; flex-flow: column; }
  [base] .body-content_rich-text ul { padding-left: 0; list-style-type: none; }
  [base] .body-content_rich-text li { padding-left: 1rem; position: relative; }
  [base] .body-content_rich-text li:where(.w-variant-a11afc35-5aa3-5017-c472-7245037b455f) { padding-left: 1.5rem; list-style-type: none; }
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
### .section_services-stack2
  [base] .section_services-stack2 { grid-column-gap: 1rem; grid-row-gap: 1rem; flex-flow: column; justify-content: flex-start; align-items: center; display: flex; }
### .services-stack2_item
  [base] .services-stack2_item { grid-column-gap: 1rem; grid-row-gap: 1rem; border: 1px solid var(--border--secondary); background-color: var(--background--secondary); opacity: .6; width: 100%; color: var(--content--primary); border-radius: 6px; flex-flow: column; padding: 1.5rem; transition: all .2s cubic-bezier(.215, .61, .355, 1); display: flex; }
### .services-stack2_items-wrap
  [base] .services-stack2_items-wrap { z-index: 1; grid-column-gap: 1.5rem; grid-row-gap: 1.5rem; flex-flow: column; justify-content: center; align-items: stretch; width: 100%; padding-left: 1rem; display: flex; position: relative; }
### .services-stack2_rive-canvas
  [base] .services-stack2_rive-canvas { width: 140%; height: 100%; min-height: 1000px; margin-left: -15%; }
### .services-stack2_wrap
  [base] .services-stack2_wrap { grid-column-gap: 0px; grid-row-gap: 0px; grid-template-rows: auto; grid-template-columns: 1fr 1fr; grid-auto-columns: 1fr; width: 100%; display: grid; }
### .sm-text-heading-h3-mobile
  [@media screen and (max-width: 767px)] .sm-text-heading-h3-mobile { font-size: 2rem; font-weight: 500; line-height: 2.625rem; }
### .text-body-lg
  [base] .text-body-lg { font-size: 1.125rem; line-height: 1.625rem; }
### .text-heading-h3
  [base] .text-heading-h3 { font-size: 3rem; font-weight: 500; line-height: 3.25rem; }
### .text-heading-h3-mobile
  [base] .text-heading-h3-mobile { font-size: 2rem; font-weight: 500; line-height: 2.625rem; }
### .w-embed
  [base] .w-embed:before, .w-embed:after { content: " "; grid-area: 1 / 1 / 2 / 2; display: table; }
  [base] .w-embed:after { clear: both; }
### .w-inline-block
  [base] .w-inline-block { max-width: 100%; display: inline-block; }
### .w-richtext
  [base] .w-richtext:before, .w-richtext:after { content: " "; grid-area: 1 / 1 / 2 / 2; display: table; }
  [base] .w-richtext:after { clear: both; }
  [base] .w-richtext ol, .w-richtext ul { overflow: hidden; }
  [base] .w-richtext .w-richtext-figure-selected.w-richtext-figure-type-video div:after, .w-richtext .w-richtext-figure-selected[data-rt-type="video"] div:after, .w-richtext .w-richtext-figure-selected.w-richtext-figure-type-image div, .w-richtext .w-richtext-figure-selected[data-rt-type="image"] div { outline: 2px solid #2895f7; }
  [base] .w-richtext figure.w-richtext-figure-type-video > div:after, .w-richtext figure[data-rt-type="video"] > div:after { content: ""; display: none; position: absolute; inset: 0; }
  [base] .w-richtext figure { max-width: 60%; position: relative; }
  [base] .w-richtext figure > div:before { cursor: default !important; }
  [base] .w-richtext figure img { width: 100%; }
  [base] .w-richtext figure figcaption.w-richtext-figcaption-placeholder { opacity: .6; }
  [base] .w-richtext figure div { color: #0000; font-size: 0; }
  [base] .w-richtext figure.w-richtext-figure-type-image, .w-richtext figure[data-rt-type="image"] { display: table; }
  [base] .w-richtext figure.w-richtext-figure-type-image > div, .w-richtext figure[data-rt-type="image"] > div { display: inline-block; }
  [base] .w-richtext figure.w-richtext-figure-type-image > figcaption, .w-richtext figure[data-rt-type="image"] > figcaption { caption-side: bottom; display: table-caption; }
  [base] .w-richtext figure.w-richtext-figure-type-video, .w-richtext figure[data-rt-type="video"] { width: 60%; height: 0; }
  [base] .w-richtext figure.w-richtext-figure-type-video iframe, .w-richtext figure[data-rt-type="video"] iframe { width: 100%; height: 100%; position: absolute; top: 0; left: 0; }
  [base] .w-richtext figure.w-richtext-figure-type-video > div, .w-richtext figure[data-rt-type="video"] > div { width: 100%; }
  [base] .w-richtext figure.w-richtext-align-center { clear: both; margin-left: auto; margin-right: auto; }
  [base] .w-richtext figure.w-richtext-align-center.w-richtext-figure-type-image > div, .w-richtext figure.w-richtext-align-center[data-rt-type="image"] > div { max-width: 100%; }
  [base] .w-richtext figure.w-richtext-align-normal { clear: both; }
  [base] .w-richtext figure.w-richtext-align-fullwidth { text-align: center; clear: both; width: 100%; max-width: 100%; margin-left: auto; margin-right: auto; display: block; }
  [base] .w-richtext figure.w-richtext-align-fullwidth > div { padding-bottom: inherit; display: inline-block; }
  [base] .w-richtext figure.w-richtext-align-fullwidth > figcaption { display: block; }
  [base] .w-richtext figure.w-richtext-align-floatleft { float: left; clear: none; margin-right: 15px; }
  [base] .w-richtext figure.w-richtext-align-floatright { float: right; clear: none; margin-left: 15px; }
```

## Text content (verbatim, in document order)

- A complete AI cloud platform
- Deploy AI on infrastructure designed for scale, resilience, and speed.
- Explore the platform
- Nscale Cloud
- A managed platform for AI teams including dedicated inference, customizable Environments, managed Kubernetes and Slurm, enterprise IAM and security.
- Nscale Infrastructure
- Dedicated GPU infrastructure with a choice of operational models depending on the customers requirements.
- Nscale Data Centers
- Predictable capacity provided by modular, multi-megawatt data centers with sovereign controls.
- Nscale Energy &amp; Power
- Design and development of behind-the-meter power and grid connected land.
