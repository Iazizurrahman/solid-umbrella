# LatestNewsSection Specification

## Overview
- **Target file:** `src/components/sites/www-nscale-com-782295e3/root-8a5edab2/LatestNewsSection.tsx`
- **Screenshot:** `docs/design-references/www-nscale-com-782295e3/root-8a5edab2/desktop-02-latest-news.jpg`
- **Interaction model:** static 4-column grid, hover on cards
- **Measured box:** 833px tall, starts at page Y 946

## What this is
"Latest news" heading, then a 4-across row of news cards. Each card is: artwork image on top,
headline below it, and a "Learn more ->" link pinned to the bottom of the card. Cards have a
1px border and share equal height, so the "Learn more" row aligns across all four regardless of
headline length - use a flex column with the CTA pushed down by `margin-top: auto`.

## Content
Four real cards. Titles and images are in the DOM and text sections below. Card artwork lives in
`public/sites/www-nscale-com-782295e3/root-8a5edab2/images/` - match each `<img src>` in the source DOM to the downloaded filename by
its Webflow hash prefix (the local files keep that prefix, lowercased).

## States & Behaviors
- **Hover:** cards use the shared `data-btn-hover` / link treatment. Extract exact hover rules
  from the CSS block below (look for `:hover` selectors) and apply those values - do not invent
  a scale or shadow that is not in the source.
- No scroll animation on this section.

## Responsive
- Desktop: 4 columns.
- The grid classes and their media-query overrides are all in the CSS block below - follow them
  literally rather than guessing a breakpoint.

## Source DOM (verbatim from the live page)

```html
<section data-wf--section--overflow="hidden" class="section w-variant-a6f0d73b-2f0b-2190-bcf7-2004f73c9b6b">
  <div data-wf--section_padding--variant="large" class="section_padding">
  </div>
  <div class="padding-global">
    <div class="container-large">
      <div>
        <div data-featured-blogs-swiper="" class="section_featured-blog">
          <div data-wf--body-content--variant="regular" class="body-content">
            <div class="body-content_copy">
              <div data-wf--body-content_title-wrap--variant="regular" class="body-content_title-wrap">
                <h2 class="text-heading-h3 sm-text-heading-h3-mobile">Latest news</h2>
              </div>
            </div>
          </div>
          <div data-swiper-target="" class="featured-blog_collection w-dyn-list">
            <div role="list" class="swiper-wrapper is-featured-blog w-dyn-items">
              <div role="listitem" class="swiper-slide w-dyn-item">
                <a href="/press-releases/nscale-and-figure" class="blog-card w-inline-block">
                  <img loading="lazy" src="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a996c9daa69ccc1a7cb4771_Newsroom%20Templates%20(23).png" alt="" sizes="100vw" srcset="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a996c9daa69ccc1a7cb4771_Newsroom%20Templates%20(23)-p-500.png 500w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a996c9daa69ccc1a7cb4771_Newsroom%20Templates%20(23)-p-800.png 800w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a996c9daa69ccc1a7cb4771_Newsroom%20Templates%20(23)-p-1080.png 1080w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a996c9daa69ccc1a7cb4771_Newsroom%20Templates%20(23).png 1200w" class="blog-card_image"/>
                  <div class="blog-card_content-wrap">
                    <h3 class="text-heading-h5 sm-text-heading-h5-mobile">Nscale and Figure Sign Strategic Partnership to Power the Next Generation of Physical AI</h3>
                    <div data-btn-hover="True" data-wf--button--variant="ghost" class="button w-variant-102d8d7c-b6c2-bee4-5324-47d2981389c4">
                      <span>Learn more</span>
                      <div>
                        <div class="button_icon w-embed">
                          <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="…(see icons.tsx)" fill="currentColor"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div role="listitem" class="swiper-slide w-dyn-item">
                <a href="/press-releases/nscale-3-billion-delayed-draw-term-loans" class="blog-card w-inline-block">
                  <img loading="lazy" src="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a959eeeecadeb8de0762d70_Newsroom%20Templates%20(21).png" alt="" sizes="100vw" srcset="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a959eeeecadeb8de0762d70_Newsroom%20Templates%20(21)-p-500.png 500w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a959eeeecadeb8de0762d70_Newsroom%20Templates%20(21)-p-800.png 800w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a959eeeecadeb8de0762d70_Newsroom%20Templates%20(21)-p-1080.png 1080w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a959eeeecadeb8de0762d70_Newsroom%20Templates%20(21).png 1200w" class="blog-card_image"/>
                  <div class="blog-card_content-wrap">
                    <h3 class="text-heading-h5 sm-text-heading-h5-mobile">Nscale Closes Approximately $3 Billion in Financing for Both Ward County, Texas and Madison, North Carolina AI Deployments</h3>
                    <div data-btn-hover="True" data-wf--button--variant="ghost" class="button w-variant-102d8d7c-b6c2-bee4-5324-47d2981389c4">
                      <span>Learn more</span>
                      <div>
                        <div class="button_icon w-embed">
                          <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="…(see icons.tsx)" fill="currentColor"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div role="listitem" class="swiper-slide w-dyn-item">
                <a href="/press-releases/nscale-stem-skilled-trades-gift-mason-county" class="blog-card w-inline-block">
                  <img loading="lazy" src="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a8f4bb546e53814b7c0a936_Newsroom%20Templates%20(10).png" alt="" sizes="100vw" srcset="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a8f4bb546e53814b7c0a936_Newsroom%20Templates%20(10)-p-500.png 500w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a8f4bb546e53814b7c0a936_Newsroom%20Templates%20(10)-p-800.png 800w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a8f4bb546e53814b7c0a936_Newsroom%20Templates%20(10)-p-1080.png 1080w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a8f4bb546e53814b7c0a936_Newsroom%20Templates%20(10).png 1200w" class="blog-card_image"/>
                  <div class="blog-card_content-wrap">
                    <h3 class="text-heading-h5 sm-text-heading-h5-mobile">Nscale Announces Initial $500,000 Gift to Advance STEM and Skilled-Trades Education in Mason County</h3>
                    <div data-btn-hover="True" data-wf--button--variant="ghost" class="button w-variant-102d8d7c-b6c2-bee4-5324-47d2981389c4">
                      <span>Learn more</span>
                      <div>
                        <div class="button_icon w-embed">
                          <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="…(see icons.tsx)" fill="currentColor"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div role="listitem" class="swiper-slide w-dyn-item">
                <a href="/press-releases/nscale-acquires-anyscale" class="blog-card w-inline-block">
                  <img loading="lazy" src="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a7b8fa971988ad21dbcd7bc_6a69e15f1b842864f4314c0c_Socials_%2520Nscale%2520(10).png" alt="" class="blog-card_image"/>
                  <div class="blog-card_content-wrap">
                    <h3 class="text-heading-h5 sm-text-heading-h5-mobile">Nscale Acquires Anyscale, Enhancing its Full Stack AI Cloud Platform</h3>
                    <div data-btn-hover="True" data-wf--button--variant="ghost" class="button w-variant-102d8d7c-b6c2-bee4-5324-47d2981389c4">
                      <span>Learn more</span>
                      <div>
                        <div class="button_icon w-embed">
                          <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="…(see icons.tsx)" fill="currentColor"/>
                          </svg>
                        </div>
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
  <div data-wf--section_color--variant="primary" class="section_color">
  </div>
</section>
```

## Exact CSS for every class in this section

Rules are copied from `nscale-v4.webflow.shared.04a529bd2.css`. `[base]` has no media
query; other tags show the exact query the rule sits inside. These are source values, not
estimates — use them literally.

```css
### .blog-card
  [base] .blog-card { grid-column-gap: 1rem; grid-row-gap: 1rem; border: 1px solid var(--border--secondary); background-color: var(--background--primary); border-radius: 8px; flex-flow: column; height: 100%; transition: all .2s; display: flex; }
  [base] .blog-card:hover { border-color: var(--border--primary); }
  [@media screen and (max-width: 767px)] .blog-card { grid-column-gap: .75rem; grid-row-gap: .75rem; }
### .blog-card_content-wrap
  [base] .blog-card_content-wrap { grid-column-gap: 2rem; grid-row-gap: 2rem; flex-flow: column; flex: 1; justify-content: space-between; align-items: flex-start; padding: 1.5rem; display: flex; }
  [@media screen and (max-width: 767px)] .blog-card_content-wrap { grid-column-gap: 1.5rem; grid-row-gap: 1.5rem; padding: 1rem; }
### .blog-card_image
  [base] .blog-card_image { aspect-ratio: 296 / 160; object-fit: cover; border-radius: 4px; width: 100%; }
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
### .featured-blog_collection
  [@media screen and (max-width: 767px)] .featured-blog_collection { width: 100%; }
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
### .section_featured-blog
  [base] .section_featured-blog { grid-column-gap: 2.5rem; grid-row-gap: 2.5rem; flex-flow: column; display: flex; }
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
### .sm-text-heading-h3-mobile
  [@media screen and (max-width: 767px)] .sm-text-heading-h3-mobile { font-size: 2rem; font-weight: 500; line-height: 2.625rem; }
### .sm-text-heading-h5-mobile
  [@media screen and (max-width: 767px)] .sm-text-heading-h5-mobile { font-size: 1.5rem; font-weight: 500; line-height: 2rem; }
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
### .text-heading-h3
  [base] .text-heading-h3 { font-size: 3rem; font-weight: 500; line-height: 3.25rem; }
### .text-heading-h5
  [base] .text-heading-h5 { font-size: 1.5rem; font-weight: 500; line-height: 2rem; }
  [base] .text-heading-h5.sm-text-heading-h5-mobile:where(.w-variant-9b10d970-4b22-d119-6bb1-ce94eb659ac4) { font-size: 1rem; line-height: 1.25rem; }
### .w-embed
  [base] .w-embed:before, .w-embed:after { content: " "; grid-area: 1 / 1 / 2 / 2; display: table; }
  [base] .w-embed:after { clear: both; }
### .w-inline-block
  [base] .w-inline-block { max-width: 100%; display: inline-block; }
```

## Text content (verbatim, in document order)

- Latest news
- Nscale and Figure Sign Strategic Partnership to Power the Next Generation of Physical AI
- Learn more
- Nscale Closes Approximately $3 Billion in Financing for Both Ward County, Texas and Madison, North Carolina AI Deployments
- Nscale Announces Initial $500,000 Gift to Advance STEM and Skilled-Trades Education in Mason County
- Nscale Acquires Anyscale, Enhancing its Full Stack AI Cloud Platform
