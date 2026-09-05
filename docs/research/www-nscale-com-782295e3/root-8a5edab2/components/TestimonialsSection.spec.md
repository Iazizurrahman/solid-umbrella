# TestimonialsSection Specification

## Overview
- **Target file:** `src/components/sites/www-nscale-com-782295e3/root-8a5edab2/TestimonialsSection.tsx`
- **Screenshot:** `docs/design-references/www-nscale-com-782295e3/root-8a5edab2/desktop-06-testimonials.jpg`
- **Interaction model:** CLICK-DRIVEN carousel with prev/next buttons. Active at ALL widths.
- **Measured box:** 764px tall, starts at page Y 4960

## Exact carousel configuration
Read directly from the site's own JavaScript bundle — these are the real values, not estimates:

```js
new Swiper(target, {
  modules: [Navigation],       // navigation ONLY - no pagination, no autoplay
  slidesPerView: 1.1,
  speed: 500,
  spaceBetween: 16,
  breakpoints: { 768: { slidesPerView: 3, spaceBetween: 40 } },
  navigation: { nextEl: "[data-swiper-next]", prevEl: "[data-swiper-prev]" },
})
```

So: 1.1 slides with a 16px gap below 768px; exactly 3 slides with a 40px gap from 768px up.
It does NOT autoplay and has NO pagination dots. There are prev and next buttons.

## Implementation guidance
Do NOT add the `swiper` npm package. Build this as a small client component using a CSS
scroll-snap track plus prev/next buttons that scroll by one slide, reproducing the same visible
result: peeking 1.1 slides on mobile, 3 full slides on desktop, 500ms smooth scroll.
Mark it `"use client"` — it needs state and handlers.

Expected desktop look: three equal-height cards, each with a circular avatar at the top, a bold
name, a muted role line, then the quote lower in the card.

## Content - three slides, all present in the DOM below
1. Oyvind Eriksen (spelled with a slashed O in the source) - President and CEO, Aker ASA
2. Larry Aschebrook - Founder and Managing Partner, G Squared
3. Kanishka Narayan - UK AI Minister

Use the VERBATIM quote text from the text section below, including curly apostrophes and the en
dash. Avatars are already downloaded in `public/sites/www-nscale-com-782295e3/root-8a5edab2/images/` — the three `rectangle-6056*.jpeg`
files. Match each to its slide by the order the source DOM lists them.

## States and behaviors
- Prev/next buttons: check the `.swiper-nav_button` rules in the CSS block for the exact
  default, hover and disabled appearance, and reproduce those.
- Card hover: only what the CSS block specifies.

## Responsive
The breakpoint is exactly 768px, per the Swiper config above.

## Source DOM (verbatim from the live page)

```html
<section data-wf--section--overflow="hidden" class="section w-variant-a6f0d73b-2f0b-2190-bcf7-2004f73c9b6b">
  <div data-wf--section_padding--variant="large" class="section_padding">
  </div>
  <div class="padding-global">
    <div class="container-large">
      <div>
        <div data-testimonials-swiper="" class="section_testimonials">
          <div data-wf--body-content--variant="regular" class="body-content">
            <div class="body-content_copy">
              <div data-wf--body-content_title-wrap--variant="regular" class="body-content_title-wrap">
                <h2 class="text-heading-h3 sm-text-heading-h3-mobile">Testimonials</h2>
              </div>
            </div>
          </div>
          <div data-swiper-target="" class="testimonials_swiper w-dyn-list">
            <div role="list" class="swiper-wrapper w-dyn-items">
              <div role="listitem" class="swiper-slide w-dyn-item">
                <div class="testimonials_card">
                  <div class="testimonials_card_top">
                    <div class="testimonials_card_person">
                      <img src="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/69f860c23a351bb8e2ce5ec9_697c721791dd082c64c01395_Rectangle%25206056.jpeg" loading="lazy" alt="" class="testimonials_card_photo"/>
                      <div class="testimonials_card_name-wrap">
                        <h3 class="text-heading-h6">Øyvind Eriksen</h3>
                        <div class="testimonias_card_position">
                          <div class="text-body-sm">President &amp; CEO, Aker ASA</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="testimonials_card_bottom">
                    <div class="text-body-md">AI is reshaping the global economy and redefining the value of renewable energy. With Nscale, we’re backing infrastructure that’s sovereign, scalable, and purpose-built to accelerate this transformation.</div>
                  </div>
                </div>
              </div>
              <div role="listitem" class="swiper-slide w-dyn-item">
                <div class="testimonials_card">
                  <div class="testimonials_card_top">
                    <div class="testimonials_card_person">
                      <img src="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/69f860c2759ced98143c16e6_697c72607572fae4e478d745_Rectangle%25206056-1.jpeg" loading="lazy" alt="" class="testimonials_card_photo"/>
                      <div class="testimonials_card_name-wrap">
                        <h3 class="text-heading-h6">Larry Aschebrook</h3>
                        <div class="testimonias_card_position">
                          <div class="text-body-sm">Founder &amp; Managing Partner, G Squared</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="testimonials_card_bottom">
                    <div class="text-body-md">Over just a few months, Nscale has moved with focus and velocity – turning ambitious plans into production capacity and becoming meaningfully relevant, fast.</div>
                  </div>
                </div>
              </div>
              <div role="listitem" class="swiper-slide w-dyn-item">
                <div class="testimonials_card">
                  <div class="testimonials_card_top">
                    <div class="testimonials_card_person">
                      <img src="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/69f860bea17d90ae57d43fb4_697c727a0880fe352ea87717_Rectangle%25206056-2.jpeg" loading="lazy" alt="" class="testimonials_card_photo"/>
                      <div class="testimonials_card_name-wrap">
                        <h3 class="text-heading-h6">Kanishka Narayan</h3>
                        <div class="testimonias_card_position">
                          <div class="text-body-sm">UK AI Minister</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="testimonials_card_bottom">
                    <div class="text-body-md">By attracting global expertise and investment, [Nscale] is building the essential infrastructure for the UK to compete internationally, drive growth, and create jobs across the country.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="testimonials_swiper-nav">
            <div class="swiper-nav">
              <button data-swiper-prev="" class="swiper-nav_button is-prev">
                <div class="swiper-nav_icon w-embed">
                  <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="…(see icons.tsx)" fill="currentColor"/>
                  </svg>
                </div>
              </button>
              <button data-swiper-next="" class="swiper-nav_button is-next">
                <div class="swiper-nav_icon w-embed">
                  <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="…(see icons.tsx)" fill="currentColor"/>
                  </svg>
                </div>
              </button>
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
### .body-content_copy
  [base] .body-content_copy { grid-column-gap: 1.5rem; grid-row-gap: 1.5rem; flex-flow: column; max-width: 37.75rem; display: flex; }
  [base] .body-content_copy:where(.w-variant-3dcd33d9-d0a0-3f1e-c2db-0dfb328fc68a) { max-width: 45rem; }
### .body-content_title-wrap
  [base] .body-content_title-wrap { grid-column-gap: 1.5rem; grid-row-gap: 1.5rem; flex-flow: column; display: flex; }
  [base] .body-content_title-wrap:where(.w-variant-e926b091-76dc-2e81-9142-436625d765c4) { grid-column-gap: .25rem; grid-row-gap: .25rem; flex-flow: column-reverse; }
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
### .section_testimonials
  [base] .section_testimonials { grid-column-gap: 4.5rem; grid-row-gap: 4.5rem; flex-flow: column; justify-content: flex-start; align-items: flex-start; display: flex; }
  [@media screen and (max-width: 767px)] .section_testimonials { grid-column-gap: 2rem; grid-row-gap: 2rem; }
### .sm-text-heading-h3-mobile
  [@media screen and (max-width: 767px)] .sm-text-heading-h3-mobile { font-size: 2rem; font-weight: 500; line-height: 2.625rem; }
### .swiper-nav
  [base] .swiper-nav { border: 1px solid var(--border--primary); border-radius: 8px; padding: 0; display: flex; }
### .swiper-nav_button
  [base] .swiper-nav_button { background-color: #0000; justify-content: center; align-items: center; padding: .25rem 0; display: flex; }
  [base] .swiper-nav_button.is-prev { padding-left: .25rem; padding-right: .125rem; }
  [base] .swiper-nav_button.is-next { padding-left: .125rem; padding-right: .25rem; }
### .swiper-nav_icon
  [base] .swiper-nav_icon { justify-content: center; align-items: center; width: 1rem; display: flex; }
### .swiper-slide
  [base] .swiper-slide.is-team { height: auto; }
  [base] .swiper-slide.is-featured-blog { display: flex; }
### .swiper-wrapper
  [base] .swiper-wrapper { grid-template-rows: auto auto; grid-template-columns: 1fr 1fr; grid-auto-columns: 1fr; }
  [base] .swiper-wrapper.is-featured-blog { grid-column-gap: 1rem; grid-row-gap: 1rem; grid-template-rows: auto; grid-template-columns: 1fr 1fr 1fr 1fr; grid-auto-columns: 1fr; display: grid; }
  [base] .swiper-wrapper.is-offering-grid { grid-column-gap: 1.5rem; grid-row-gap: 1.5rem; grid-template-rows: auto; grid-template-columns: 1fr 1fr 1fr; grid-auto-columns: 1fr; display: grid; }
  [base] .swiper-wrapper.is-team { align-items: stretch; }
  [@media screen and (max-width: 767px)] .swiper-wrapper.is-featured-blog { grid-column-gap: 0rem; grid-row-gap: 0rem; }
  [@media screen and (max-width: 767px)] .swiper-wrapper.is-offering-grid { grid-column-gap: 0rem; grid-row-gap: 0rem; display: flex; }
  [@media screen and (max-width: 767px)] .swiper-wrapper.is-offering-grid:where(.w-variant-9879e44d-4d20-ce25-fb66-fc7ccd941eec) { grid-column-gap: 1.5rem; grid-row-gap: 1.5rem; flex-flow: column; }
### .testimonials_card
  [base] .testimonials_card { grid-column-gap: 5rem; grid-row-gap: 5rem; border: 1px solid var(--border--secondary); background-color: var(--background--glass-deep-blue); border-radius: 8px; flex-flow: column; justify-content: space-between; height: 100%; min-height: 25rem; padding: 1.5rem; display: flex; }
  [@media screen and (max-width: 767px)] .testimonials_card { grid-column-gap: 3.75rem; grid-row-gap: 3.75rem; min-height: 25rem; padding: 1rem; }
### .testimonials_card_bottom
  [base] .testimonials_card_bottom { grid-column-gap: 1rem; grid-row-gap: 1rem; color: var(--content--primary); display: flex; }
  [@media screen and (max-width: 767px)] .testimonials_card_bottom { grid-column-gap: .625rem; grid-row-gap: .625rem; flex-flow: column; }
### .testimonials_card_name-wrap
  [base] .testimonials_card_name-wrap { grid-column-gap: .25rem; grid-row-gap: .25rem; flex-flow: column; display: flex; }
### .testimonials_card_person
  [base] .testimonials_card_person { grid-column-gap: 1rem; grid-row-gap: 1rem; flex-flow: column; justify-content: flex-start; align-items: flex-start; display: flex; }
  [@media screen and (max-width: 767px)] .testimonials_card_person { flex-flow: column; justify-content: flex-start; align-items: flex-start; }
### .testimonials_card_photo
  [base] .testimonials_card_photo { border: 1px solid var(--border--secondary); object-fit: cover; border-radius: 1000px; width: 4rem; }
### .testimonials_card_top
  [base] .testimonials_card_top { grid-column-gap: 1rem; grid-row-gap: 1rem; justify-content: space-between; align-items: center; display: flex; }
  [@media screen and (max-width: 767px)] .testimonials_card_top { grid-column-gap: .625rem; grid-row-gap: .625rem; flex-flow: column; justify-content: space-between; align-items: flex-start; }
### .testimonials_swiper
  [base] .testimonials_swiper { width: 100%; }
### .testimonials_swiper-nav
  [base] .testimonials_swiper-nav { display: none; }
  [@media screen and (max-width: 767px)] .testimonials_swiper-nav { display: none; }
### .testimonias_card_position
  [base] .testimonias_card_position { opacity: .3; }
### .text-body-md
  [base] .text-body-md { font-size: 1rem; line-height: 1.5rem; }
### .text-body-sm
  [base] .text-body-sm { font-size: .875rem; line-height: 1.25rem; }
  [base] .text-body-sm.features-accordion_expand { overflow: hidden; }
### .text-heading-h3
  [base] .text-heading-h3 { font-size: 3rem; font-weight: 500; line-height: 3.25rem; }
### .text-heading-h6
  [base] .text-heading-h6 { font-size: 1rem; font-weight: 700; line-height: 1.25rem; }
### .w-embed
  [base] .w-embed:before, .w-embed:after { content: " "; grid-area: 1 / 1 / 2 / 2; display: table; }
  [base] .w-embed:after { clear: both; }
```

## Text content (verbatim, in document order)

- Testimonials
- Øyvind Eriksen
- President &amp; CEO, Aker ASA
- AI is reshaping the global economy and redefining the value of renewable energy. With Nscale, we’re backing infrastructure that’s sovereign, scalable, and purpose-built to accelerate this transformation.
- Larry Aschebrook
- Founder &amp; Managing Partner, G Squared
- Over just a few months, Nscale has moved with focus and velocity – turning ambitious plans into production capacity and becoming meaningfully relevant, fast.
- Kanishka Narayan
- UK AI Minister
- By attracting global expertise and investment, [Nscale] is building the essential infrastructure for the UK to compete internationally, drive growth, and create jobs across the country.
