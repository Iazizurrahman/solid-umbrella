# InfrastructureSection Specification

## Overview
- **Target file:** `src/components/sites/www-nscale-com-782295e3/root-8a5edab2/InfrastructureSection.tsx`
- **Screenshot:** `docs/design-references/www-nscale-com-782295e3/root-8a5edab2/desktop-05-infrastructure.jpg`
- **Interaction model:** static grid of autoplaying looping videos
- **Measured box:** 1460px tall, starts at page Y 3202

## What this is
Left-aligned heading "Infrastructure for advanced  intelligence at scale" (note: the source
contains a DOUBLE SPACE between "advanced" and "intelligence" — reproduce it verbatim), a
subheading "Stay ahead of demand with scalable capacity and consistent performance", then FIVE
cards: three across the first row, two on the second. Each card is a looping video with a title
underneath.

## These are real videos, NOT images
Each card is a `<video>` driven by `data-video-urls` / `data-poster-url` / `data-autoplay` /
`data-loop` / `data-object-fit`. Do NOT rebuild them as static images or CSS mockups.

All ten video files (mp4 + webm per card) and all five posters are already downloaded:
- videos: `public/sites/www-nscale-com-782295e3/root-8a5edab2/videos/*_mp4.mp4` and `public/sites/www-nscale-com-782295e3/root-8a5edab2/videos/*_webm.webm`
- posters: `public/sites/www-nscale-com-782295e3/root-8a5edab2/images/*_poster.0000000.jpg`

Match each card to its files by the shutterstock id in the source `data-video-urls` attribute —
the local filenames keep that id. List the directories to get exact names; do not guess.

Render each as:

```tsx
<video autoPlay loop muted playsInline poster={poster} className="...">
  <source src={webm} type="video/webm" />
  <source src={mp4} type="video/mp4" />
</video>
```

WebM source FIRST. Use the `VideoCard` interface from `@/types/nscale` and drive the five cards
from a typed array constant.

## States and behaviors
- Videos autoplay muted and loop forever. No scroll trigger gates them.
- Card hover: use ONLY the `:hover` rules present in the CSS block below.

## Responsive
3 + 2 at desktop. Follow the grid rules and their media queries in the CSS block literally.

## Source DOM (verbatim from the live page)

```html
<section data-wf--section--overflow="visible" class="section">
  <div data-wf--section_padding--variant="large" class="section_padding">
  </div>
  <div class="padding-global">
    <div class="container-large">
      <div>
        <div class="section_video-cards">
          <div data-wf--body-content--variant="regular" class="body-content">
            <div class="body-content_copy">
              <div data-wf--body-content_title-wrap--variant="regular" class="body-content_title-wrap">
                <h2 class="text-heading-h3 sm-text-heading-h3-mobile">Infrastructure for advanced  intelligence at scale</h2>
              </div>
              <div class="body-content_desc">
                <div data-wf--body-content_rich-text--variant="bullet" class="body-content_rich-text w-richtext">
                  <p>Stay ahead of demand with scalable capacity and consistent performance</p>
                </div>
              </div>
            </div>
          </div>
          <div class="video-cards_list-wrap">
            <div data-video-card="" data-wf--video-card--variant="scale" class="video-card">
              <div data-poster-url="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82bba5edd1c94eb95717_shutterstock_3787623545_poster.0000000.jpg" data-video-urls="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82bba5edd1c94eb95717_shutterstock_3787623545_mp4.mp4,https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82bba5edd1c94eb95717_shutterstock_3787623545_webm.webm" data-autoplay="false" data-loop="true" data-wf-ignore="true" class="video-card_video w-background-video w-background-video-atom">
                <video id="37c3419f-b3a9-bfa3-0820-3896382cc929-video" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82bba5edd1c94eb95717_shutterstock_3787623545_poster.0000000.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                  <source src="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82bba5edd1c94eb95717_shutterstock_3787623545_mp4.mp4" data-wf-ignore="true"/>
                  <source src="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82bba5edd1c94eb95717_shutterstock_3787623545_webm.webm" data-wf-ignore="true"/>
                </video>
              </div>
              <div class="video-card_copy">
                <h3 class="text-heading-h5 sm-text-heading-h5-mobile">Designed to deliver scale</h3>
                <div data-expand="" class="video-card_expand">
                  <div class="video-card_desc">
                    <p class="text-body-sm text-color-primary">Through our abundant and renewable power resources and the most advanced technology, we deliver scalable AI capacity at a low cost point.</p>
                  </div>
                </div>
              </div>
            </div>
            <div data-video-card="" data-wf--video-card--variant="efficiency" class="video-card">
              <div data-poster-url="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82c7f061bb6a689dabf2_shutterstock_3881822535_poster.0000000.jpg" data-video-urls="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82c7f061bb6a689dabf2_shutterstock_3881822535_mp4.mp4,https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82c7f061bb6a689dabf2_shutterstock_3881822535_webm.webm" data-autoplay="false" data-loop="true" data-wf-ignore="true" class="video-card_video w-background-video w-background-video-atom">
                <video id="55e7706d-5946-f420-a429-fbb779c54fb9-video" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82c7f061bb6a689dabf2_shutterstock_3881822535_poster.0000000.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                  <source src="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82c7f061bb6a689dabf2_shutterstock_3881822535_mp4.mp4" data-wf-ignore="true"/>
                  <source src="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82c7f061bb6a689dabf2_shutterstock_3881822535_webm.webm" data-wf-ignore="true"/>
                </video>
              </div>
              <div class="video-card_copy">
                <h3 class="text-heading-h5 sm-text-heading-h5-mobile">Architected for efficiency </h3>
                <div data-expand="" class="video-card_expand">
                  <div class="video-card_desc">
                    <p class="text-body-sm text-color-primary">A unified system designed for efficient deployment and stable operations, from supply chain to AI workloads.</p>
                  </div>
                </div>
              </div>
            </div>
            <div data-video-card="" data-wf--video-card--variant="partnerships" class="video-card">
              <div data-poster-url="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82d0be15ac9b55983e3a_shutterstock_1103292547_poster.0000000.jpg" data-video-urls="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82d0be15ac9b55983e3a_shutterstock_1103292547_mp4.mp4,https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82d0be15ac9b55983e3a_shutterstock_1103292547_webm.webm" data-autoplay="false" data-loop="true" data-wf-ignore="true" class="video-card_video w-background-video w-background-video-atom">
                <video id="a3f94d9b-56f8-8a8f-79a0-8eb72a67414f-video" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82d0be15ac9b55983e3a_shutterstock_1103292547_poster.0000000.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                  <source src="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82d0be15ac9b55983e3a_shutterstock_1103292547_mp4.mp4" data-wf-ignore="true"/>
                  <source src="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82d0be15ac9b55983e3a_shutterstock_1103292547_webm.webm" data-wf-ignore="true"/>
                </video>
              </div>
              <div class="video-card_copy">
                <h3 class="text-heading-h5 sm-text-heading-h5-mobile">Proven through partnerships</h3>
                <div data-expand="" class="video-card_expand">
                  <div class="video-card_desc">
                    <p class="text-body-sm text-color-primary">Deep partnerships with AI and infrastructure leaders power trusted deployments today and shared R&amp;D that advances what’s possible at scale.</p>
                  </div>
                </div>
              </div>
            </div>
            <div data-video-card="" data-wf--video-card--variant="resilience" class="video-card">
              <div data-poster-url="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82d87be2c49bd158e307_shutterstock_3798669997_poster.0000000.jpg" data-video-urls="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82d87be2c49bd158e307_shutterstock_3798669997_mp4.mp4,https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82d87be2c49bd158e307_shutterstock_3798669997_webm.webm" data-autoplay="false" data-loop="true" data-wf-ignore="true" class="video-card_video w-background-video w-background-video-atom">
                <video id="c2acbe67-b29b-7c38-852a-daf58f75e151-video" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82d87be2c49bd158e307_shutterstock_3798669997_poster.0000000.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                  <source src="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82d87be2c49bd158e307_shutterstock_3798669997_mp4.mp4" data-wf-ignore="true"/>
                  <source src="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82d87be2c49bd158e307_shutterstock_3798669997_webm.webm" data-wf-ignore="true"/>
                </video>
              </div>
              <div class="video-card_copy">
                <h3 class="text-heading-h5 sm-text-heading-h5-mobile">Engineered for resilience</h3>
                <div data-expand="" class="video-card_expand">
                  <div class="video-card_desc">
                    <p class="text-body-sm text-color-primary">Designed with compliance and sovereignty at the core, supported by durable local partnerships that ensure resilient operations and predictable access across jurisdictions.</p>
                  </div>
                </div>
              </div>
            </div>
            <div data-video-card="" data-wf--video-card--variant="execution" class="video-card">
              <div data-poster-url="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82e6de5fa540fed56a22_shutterstock_1109864221_poster.0000000.jpg" data-video-urls="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82e6de5fa540fed56a22_shutterstock_1109864221_mp4.mp4,https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82e6de5fa540fed56a22_shutterstock_1109864221_webm.webm" data-autoplay="false" data-loop="true" data-wf-ignore="true" class="video-card_video w-background-video w-background-video-atom">
                <video id="4068f1d2-b0de-707e-0232-7ef48f87c9a8-video" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82e6de5fa540fed56a22_shutterstock_1109864221_poster.0000000.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                  <source src="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82e6de5fa540fed56a22_shutterstock_1109864221_mp4.mp4" data-wf-ignore="true"/>
                  <source src="https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f%2F697c82e6de5fa540fed56a22_shutterstock_1109864221_webm.webm" data-wf-ignore="true"/>
                </video>
              </div>
              <div class="video-card_copy">
                <h3 class="text-heading-h5 sm-text-heading-h5-mobile">Optimized for rapid execution</h3>
                <div data-expand="" class="video-card_expand">
                  <div class="video-card_desc">
                    <p class="text-body-sm text-color-primary">Modular design, reserved capacity, and AI-native operations deliver repeatable deployment velocity and first access to the latest models and technology.</p>
                  </div>
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
  <div data-wf--section_color--variant="primary" class="section_color">
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
### .section_video-cards
  [base] .section_video-cards { grid-column-gap: 2.5rem; grid-row-gap: 2.5rem; flex-flow: column; display: flex; }
  [@media screen and (max-width: 767px)] .section_video-cards { grid-column-gap: 2rem; grid-row-gap: 2rem; }
### .sm-text-heading-h3-mobile
  [@media screen and (max-width: 767px)] .sm-text-heading-h3-mobile { font-size: 2rem; font-weight: 500; line-height: 2.625rem; }
### .sm-text-heading-h5-mobile
  [@media screen and (max-width: 767px)] .sm-text-heading-h5-mobile { font-size: 1.5rem; font-weight: 500; line-height: 2rem; }
### .text-body-sm
  [base] .text-body-sm { font-size: .875rem; line-height: 1.25rem; }
  [base] .text-body-sm.features-accordion_expand { overflow: hidden; }
### .text-color-primary
  [base] .text-color-primary { color: var(--content--primary); }
### .text-heading-h3
  [base] .text-heading-h3 { font-size: 3rem; font-weight: 500; line-height: 3.25rem; }
### .text-heading-h5
  [base] .text-heading-h5 { font-size: 1.5rem; font-weight: 500; line-height: 2rem; }
  [base] .text-heading-h5.sm-text-heading-h5-mobile:where(.w-variant-9b10d970-4b22-d119-6bb1-ce94eb659ac4) { font-size: 1rem; line-height: 1.25rem; }
### .video-card
  [base] .video-card { grid-column-gap: 1rem; grid-row-gap: 1rem; aspect-ratio: 400 / 480; border: 1px solid var(--border--glass-primary); background-color: var(--background--glass-primary); border-radius: 8px; flex-flow: column; justify-content: flex-start; width: 100%; min-width: 0; padding: 1rem; display: flex; }
### .video-card_desc
  [base] .video-card_desc { padding-top: .5rem; }
### .video-card_expand
  [base] .video-card_expand { overflow: hidden; }
### .video-card_video
  [base] .video-card_video { z-index: 2; border-radius: 6px; flex: 1; width: 100%; display: block; }
  [@media screen and (max-width: 991px)] .video-card_video { min-height: 0; }
### .video-cards_list-wrap
  [base] .video-cards_list-wrap { grid-column-gap: 1rem; grid-row-gap: 1rem; grid-template-rows: auto; grid-template-columns: 1fr 1fr 1fr; grid-auto-columns: 1fr; display: grid; }
  [@media screen and (max-width: 767px)] .video-cards_list-wrap { grid-column-gap: .625rem; grid-row-gap: .625rem; flex-flow: column; display: flex; }
### .w-background-video
  [base] .w-background-video { color: #fff; height: 500px; position: relative; overflow: hidden; }
  [base] .w-background-video > video { object-fit: cover; z-index: -100; background-position: 50%; background-size: cover; width: 100%; height: 100%; margin: auto; position: absolute; inset: -100%; }
  [base] .w-background-video > video::-webkit-media-controls-start-playback-button { -webkit-appearance: none; display: none !important; }
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

- Infrastructure for advanced  intelligence at scale
- Stay ahead of demand with scalable capacity and consistent performance
- Designed to deliver scale
- Through our abundant and renewable power resources and the most advanced technology, we deliver scalable AI capacity at a low cost point.
- Architected for efficiency
- A unified system designed for efficient deployment and stable operations, from supply chain to AI workloads.
- Proven through partnerships
- Deep partnerships with AI and infrastructure leaders power trusted deployments today and shared R&amp;D that advances what’s possible at scale.
- Engineered for resilience
- Designed with compliance and sovereignty at the core, supported by durable local partnerships that ensure resilient operations and predictable access across jurisdictions.
- Optimized for rapid execution
- Modular design, reserved capacity, and AI-native operations deliver repeatable deployment velocity and first access to the latest models and technology.
