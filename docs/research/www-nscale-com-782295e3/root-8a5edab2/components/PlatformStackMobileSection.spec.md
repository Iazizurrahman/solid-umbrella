# PlatformStackMobileSection Specification (<992px)

## Overview
- **Target file:** `src/components/sites/www-nscale-com-782295e3/root-8a5edab2/PlatformStackMobileSection.tsx`
- **Measured box:** height 0 at desktop — this section carries `hide-desktop`, so it renders ONLY
  below 992px. At >=992px a separate `PlatformStackSection` (a Rive canvas) covers the same
  content. Do not build the Rive canvas here.

## What this is
The small-screen counterpart of the platform stack. Same heading ("A complete AI cloud platform")
and the same four platform layers, but instead of a live Rive canvas it uses static images plus a
large number of inline SVGs, and it presents the four layers as an ACCORDION.

## INTERACTION MODEL: click-driven accordion

This is where the page's `[data-accordion]` / `[data-accordion-item]` / `[data-accordion-trigger]`
/ `[data-accordion-expand]` hooks live. Each layer is a row with a title and an expand control;
clicking a row expands its body and collapses the others.

- The expand/collapse icons are already extracted: `PlusIcon` (12x12) and `MinusIcon` (13x12) in
  the shared icons module. Swap between them by open state, matching the source markup.
- Animate height/opacity with a CSS transition. Do not pull in an animation library.
- Exactly one panel open at a time unless the DOM below clearly shows otherwise.
- This component must be `"use client"`.

## Because you cannot see it in a desktop screenshot
There is no reference screenshot for this section — every capture was taken at 1920px where it is
hidden. Build strictly from the source DOM and CSS below; do not invent layout that is not there.

## Images and icons
Static images are already downloaded into `public/sites/www-nscale-com-782295e3/root-8a5edab2/images/`. Match each `<img src>` by the
Webflow hash prefix; local filenames keep that prefix, lowercased, spaces turned into dashes.
List the directory to get exact names; do not guess.

The section contains many inline SVGs. Where one matches an icon already exported from the shared
icons module, import it. Where it is a one-off illustration not in that module, inline the SVG in
this file — do not add it to the shared module.

## Visibility
Wrap the whole thing so it is hidden at >=992px. The global class `.ns-hide-desktop` does exactly
that (`@media (min-width: 992px) { display: none }`), matching the source's own breakpoint.

## Source DOM (verbatim from the live page)

```html
<section data-wf--section--overflow="visible" class="section hide-desktop">
  <div data-wf--section_padding--variant="large" class="section_padding">
  </div>
  <div class="padding-global">
    <div class="container-large">
      <div>
        <div data-platform-slider-section="" class="section_services-slider">
          <div class="services-slider_top-wrap">
            <div class="services-slider_title-wrap">
              <h2 class="text-heading-h3-mobile">A complete AI cloud platform</h2>
              <p class="text-body-md">Deploy AI on infrastructure designed for scale, resilience, and speed.</p>
            </div>
            <a href="/service-overview" class="w-inline-block">
              <div data-btn-hover="True" data-wf--button--variant="solid" class="button">
                <span>Explore the platform</span>
              </div>
            </a>
          </div>
          <div data-image-swiper="" class="services-slider_images-slider w-dyn-list">
            <div role="list" class="swiper-wrapper w-dyn-items">
              <div role="listitem" class="swiper-slide w-dyn-item">
                <img loading="lazy" src="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722dbde41c53471bf40caa_STACK%202.0%20%5BNSCALE%20CLOUD%5D%20PNG.png" alt="" sizes="100vw" srcset="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722dbde41c53471bf40caa_STACK%202.0%20%5BNSCALE%20CLOUD%5D%20PNG-p-500.png 500w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722dbde41c53471bf40caa_STACK%202.0%20%5BNSCALE%20CLOUD%5D%20PNG-p-800.png 800w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722dbde41c53471bf40caa_STACK%202.0%20%5BNSCALE%20CLOUD%5D%20PNG-p-1080.png 1080w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722dbde41c53471bf40caa_STACK%202.0%20%5BNSCALE%20CLOUD%5D%20PNG.png 1340w" class="services-slider_image"/>
              </div>
              <div role="listitem" class="swiper-slide w-dyn-item">
                <img loading="lazy" src="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722ddacc2f903fd22c5cd0_STACK%202.0%20%5BNSCALE%20METAL%5D%20PNG.png" alt="" sizes="100vw" srcset="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722ddacc2f903fd22c5cd0_STACK%202.0%20%5BNSCALE%20METAL%5D%20PNG-p-500.png 500w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722ddacc2f903fd22c5cd0_STACK%202.0%20%5BNSCALE%20METAL%5D%20PNG-p-800.png 800w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722ddacc2f903fd22c5cd0_STACK%202.0%20%5BNSCALE%20METAL%5D%20PNG-p-1080.png 1080w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722ddacc2f903fd22c5cd0_STACK%202.0%20%5BNSCALE%20METAL%5D%20PNG.png 1340w" class="services-slider_image"/>
              </div>
              <div role="listitem" class="swiper-slide w-dyn-item">
                <img loading="lazy" src="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722e3924f1f0e6fac27d9f_STACK%202.0%20%5BNSCALE%20DATA.png" alt="" sizes="100vw" srcset="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722e3924f1f0e6fac27d9f_STACK%202.0%20%5BNSCALE%20DATA-p-500.png 500w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722e3924f1f0e6fac27d9f_STACK%202.0%20%5BNSCALE%20DATA-p-800.png 800w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722e3924f1f0e6fac27d9f_STACK%202.0%20%5BNSCALE%20DATA-p-1080.png 1080w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722e3924f1f0e6fac27d9f_STACK%202.0%20%5BNSCALE%20DATA.png 1340w" class="services-slider_image"/>
              </div>
              <div role="listitem" class="swiper-slide w-dyn-item">
                <img loading="lazy" src="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722e5e5485394b6d893f59_STACK%202.0%20%5BNSCALE%20POWER%20%26%20ENERGY%5D%20PNG.png" alt="" sizes="100vw" srcset="https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722e5e5485394b6d893f59_STACK%202.0%20%5BNSCALE%20POWER%20%26%20ENERGY%5D%20PNG-p-500.png 500w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722e5e5485394b6d893f59_STACK%202.0%20%5BNSCALE%20POWER%20%26%20ENERGY%5D%20PNG-p-800.png 800w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722e5e5485394b6d893f59_STACK%202.0%20%5BNSCALE%20POWER%20%26%20ENERGY%5D%20PNG-p-1080.png 1080w, https://cdn.prod.website-files.com/69f8608b4956b4e4c6631ac8/6a722e5e5485394b6d893f59_STACK%202.0%20%5BNSCALE%20POWER%20%26%20ENERGY%5D%20PNG.png 1340w" class="services-slider_image"/>
              </div>
            </div>
          </div>
          <div data-swiper-pagination="" class="services-slider_pagination">
          </div>
          <div data-content-swiper="" class="services-slider_content-slider w-dyn-list">
            <div role="list" class="swiper-wrapper w-dyn-items">
              <div role="listitem" class="swiper-slide w-dyn-item">
                <div data-layer="ai_active" class="services-slider_content_wrap">
                  <div class="services-slider_content_title-wrap">
                    <h3 class="text-heading-h3-mobile">Nscale Cloud</h3>
                    <p class="text-body-md">A managed platform for AI teams including dedicated inference, customizable Environments, managed Kubernetes and Slurm, enterprise IAM and security.</p>
                  </div>
                  <div data-accordion="single" class="services-slider_accordion">
                    <div data-accordion-item="" class="platform-slider_accordion_item">
                      <button data-accordion-trigger="" class="platform-slider_accordion_trigger">
                        <h5 class="text-heading-h5 sm-text-heading-h6-mobile">AI Services</h5>
                        <div class="platform-slider_accordion_plus">
                          <div class="plus-toggle">
                            <div class="plus-toggle_icon is-plus w-embed">
                              <svg width="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="…(see icons.tsx)" fill="currentColor"/>
                              </svg>
                            </div>
                            <div class="plus-toggle_icon is-minus w-embed">
                              <svg width="100%" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 6H11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </button>
                      <div data-accordion-expand="" class="platform-slider_accordion_expand">
                        <div class="platform-slider_accordion_content">
                          <h4 class="text-label-md-bold">
                          </h4>
                          <p class="text-body-sm">Move from experimentation to production without managing infrastructure, using serverless or dedicated inference, fine-tuning, prompt workbench, and OpenAI-compatible APIs.</p>
                        </div>
                      </div>
                    </div>
                    <div data-accordion-item="" class="platform-slider_accordion_item">
                      <button data-accordion-trigger="" class="platform-slider_accordion_trigger">
                        <h5 class="text-heading-h5 sm-text-heading-h6-mobile">Managed platform services</h5>
                        <div class="platform-slider_accordion_plus">
                          <div class="plus-toggle">
                            <div class="plus-toggle_icon is-plus w-embed">
                              <svg width="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="…(see icons.tsx)" fill="currentColor"/>
                              </svg>
                            </div>
                            <div class="plus-toggle_icon is-minus w-embed">
                              <svg width="100%" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 6H11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </button>
                      <div data-accordion-expand="" class="platform-slider_accordion_expand">
                        <div class="platform-slider_accordion_content">
                          <h4 class="text-label-md-bold">
                          </h4>
                          <p class="text-body-sm">Run AI workloads with less operational complexity, using Nscale Kubernetes Service (NKS) and Managed Slurm for autoscaling and predictable training queues, while Environments isolate workloads and help teams get more from reserved GPU clusters.</p>
                        </div>
                      </div>
                    </div>
                    <div data-accordion-item="" class="platform-slider_accordion_item">
                      <button data-accordion-trigger="" class="platform-slider_accordion_trigger">
                        <h5 class="text-heading-h5 sm-text-heading-h6-mobile">Bare metal instances</h5>
                        <div class="platform-slider_accordion_plus">
                          <div class="plus-toggle">
                            <div class="plus-toggle_icon is-plus w-embed">
                              <svg width="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="…(see icons.tsx)" fill="currentColor"/>
                              </svg>
                            </div>
                            <div class="plus-toggle_icon is-minus w-embed">
                              <svg width="100%" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 6H11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </button>
                      <div data-accordion-expand="" class="platform-slider_accordion_expand">
                        <div class="platform-slider_accordion_content">
                          <h4 class="text-label-md-bold">
                          </h4>
                          <p class="text-body-sm">Reduce operational burden for intensive AI workloads with dedicated GPU nodes managed through Nscale Cloud, while reservations and placements map workloads to physical topology and NVLink domains.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="services-slider_cta-wrap">
                    <a href="https://console.nscale.com/auth/login" class="w-inline-block">
                      <div data-btn-hover="True" data-wf--button--variant="solid" class="button">
                        <span>Get Started</span>
                        <div>
                          <div class="button_icon w-embed">
                            <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="…(see icons.tsx)" fill="currentColor"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="/services/ai-services" class="w-inline-block">
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
                    </a>
                  </div>
                </div>
              </div>
              <div role="listitem" class="swiper-slide w-dyn-item">
                <div data-layer="ai_active" class="services-slider_content_wrap">
                  <div class="services-slider_content_title-wrap">
                    <h3 class="text-heading-h3-mobile">Nscale Infrastructure</h3>
                    <p class="text-body-md">Dedicated GPU infrastructure tailored to your operational requirements.</p>
                  </div>
                  <div data-accordion="single" class="services-slider_accordion">
                    <div data-accordion-item="" class="platform-slider_accordion_item">
                      <button data-accordion-trigger="" class="platform-slider_accordion_trigger">
                        <h5 class="text-heading-h5 sm-text-heading-h6-mobile">Fleet Operations</h5>
                        <div class="platform-slider_accordion_plus">
                          <div class="plus-toggle">
                            <div class="plus-toggle_icon is-plus w-embed">
                              <svg width="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="…(see icons.tsx)" fill="currentColor"/>
                              </svg>
                            </div>
                            <div class="plus-toggle_icon is-minus w-embed">
                              <svg width="100%" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 6H11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </button>
                      <div data-accordion-expand="" class="platform-slider_accordion_expand">
                        <div class="platform-slider_accordion_content">
                          <h4 class="text-label-md-bold">
                          </h4>
                          <p class="text-body-sm">Keep GPU capacity productive with a fleet-wide observability platform, automated fault detection and remediation, and resource governance that maintains healthy and schedulable capacity.</p>
                        </div>
                      </div>
                    </div>
                    <div data-accordion-item="" class="platform-slider_accordion_item">
                      <button data-accordion-trigger="" class="platform-slider_accordion_trigger">
                        <h5 class="text-heading-h5 sm-text-heading-h6-mobile">GPU &amp; CPU compute</h5>
                        <div class="platform-slider_accordion_plus">
                          <div class="plus-toggle">
                            <div class="plus-toggle_icon is-plus w-embed">
                              <svg width="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="…(see icons.tsx)" fill="currentColor"/>
                              </svg>
                            </div>
                            <div class="plus-toggle_icon is-minus w-embed">
                              <svg width="100%" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 6H11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </button>
                      <div data-accordion-expand="" class="platform-slider_accordion_expand">
                        <div class="platform-slider_accordion_content">
                          <h4 class="text-label-md-bold">
                          </h4>
                          <p class="text-body-sm">Get the right compute configuration into production quickly, with GPU and CPU infrastructure tailored to your platform, architecture and operating model.</p>
                        </div>
                      </div>
                    </div>
                    <div data-accordion-item="" class="platform-slider_accordion_item">
                      <button data-accordion-trigger="" class="platform-slider_accordion_trigger">
                        <h5 class="text-heading-h5 sm-text-heading-h6-mobile">Fast Networking &amp; storage</h5>
                        <div class="platform-slider_accordion_plus">
                          <div class="plus-toggle">
                            <div class="plus-toggle_icon is-plus w-embed">
                              <svg width="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="…(see icons.tsx)" fill="currentColor"/>
                              </svg>
                            </div>
                            <div class="plus-toggle_icon is-minus w-embed">
                              <svg width="100%" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 6H11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </button>
                      <div data-accordion-expand="" class="platform-slider_accordion_expand">
                        <div class="platform-slider_accordion_content">
                          <h4 class="text-label-md-bold">
                          </h4>
                          <p class="text-body-sm">Scale workloads without bottlenecks across low-latency InfiniBand, RoCE and NVLink interconnects that keep GPUs communicating efficiently. Keep training and inference fed with AI-optimised parallel storage for predictable throughput at scale.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="services-slider_cta-wrap">
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
                    <a href="/services/platform-services" class="w-inline-block">
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
                    </a>
                  </div>
                </div>
              </div>
              <div role="listitem" class="swiper-slide w-dyn-item">
                <div data-layer="ai_active" class="services-slider_content_wrap">
                  <div class="services-slider_content_title-wrap">
                    <h3 class="text-heading-h3-mobile">Nscale Data Centers</h3>
                    <p class="text-body-md">Purpose-built data centers engineered for AI.</p>
                  </div>
                  <div data-accordion="single" class="services-slider_accordion">
                    <div data-accordion-item="" class="platform-slider_accordion_item">
                      <button data-accordion-trigger="" class="platform-slider_accordion_trigger">
                        <h5 class="text-heading-h5 sm-text-heading-h6-mobile">Modular</h5>
                        <div class="platform-slider_accordion_plus">
                          <div class="plus-toggle">
                            <div class="plus-toggle_icon is-plus w-embed">
                              <svg width="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="…(see icons.tsx)" fill="currentColor"/>
                              </svg>
                            </div>
                            <div class="plus-toggle_icon is-minus w-embed">
                              <svg width="100%" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 6H11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </button>
                      <div data-accordion-expand="" class="platform-slider_accordion_expand">
                        <div class="platform-slider_accordion_content">
                          <h4 class="text-label-md-bold">
                          </h4>
                          <p class="text-body-sm">Expand capacity predictably with prefabricated modules designed for rapid, repeatable deployment.</p>
                        </div>
                      </div>
                    </div>
                    <div data-accordion-item="" class="platform-slider_accordion_item">
                      <button data-accordion-trigger="" class="platform-slider_accordion_trigger">
                        <h5 class="text-heading-h5 sm-text-heading-h6-mobile">Liquid cooled</h5>
                        <div class="platform-slider_accordion_plus">
                          <div class="plus-toggle">
                            <div class="plus-toggle_icon is-plus w-embed">
                              <svg width="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="…(see icons.tsx)" fill="currentColor"/>
                              </svg>
                            </div>
                            <div class="plus-toggle_icon is-minus w-embed">
                              <svg width="100%" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 6H11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </button>
                      <div data-accordion-expand="" class="platform-slider_accordion_expand">
                        <div class="platform-slider_accordion_content">
                          <h4 class="text-label-md-bold">
                          </h4>
                          <p class="text-body-sm">Closed-loop liquid cooling removes heat efficiently to enable reliable operation for next-generation AI infrastructure.</p>
                        </div>
                      </div>
                    </div>
                    <div data-accordion-item="" class="platform-slider_accordion_item">
                      <button data-accordion-trigger="" class="platform-slider_accordion_trigger">
                        <h5 class="text-heading-h5 sm-text-heading-h6-mobile">Low PUE</h5>
                        <div class="platform-slider_accordion_plus">
                          <div class="plus-toggle">
                            <div class="plus-toggle_icon is-plus w-embed">
                              <svg width="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="…(see icons.tsx)" fill="currentColor"/>
                              </svg>
                            </div>
                            <div class="plus-toggle_icon is-minus w-embed">
                              <svg width="100%" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 6H11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </button>
                      <div data-accordion-expand="" class="platform-slider_accordion_expand">
                        <div class="platform-slider_accordion_content">
                          <h4 class="text-label-md-bold">
                          </h4>
                          <p class="text-body-sm">Reduce facility energy overhead and operating costs through efficient power and cooling design that targets a Power Usage Effectiveness (PUE) of 1.1–1.15, leaving more power capacity for productive AI compute.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="services-slider_cta-wrap">
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
                    <a href="/services/infrastructure-services" class="w-inline-block">
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
                    </a>
                  </div>
                </div>
              </div>
              <div role="listitem" class="swiper-slide w-dyn-item">
                <div data-layer="ai_active" class="services-slider_content_wrap">
                  <div class="services-slider_content_title-wrap">
                    <h3 class="text-heading-h3-mobile">Nscale Energy &amp; Power</h3>
                    <p class="text-body-md">Dedicated energy infrastructure for faster, more resilient AI.</p>
                  </div>
                  <div data-accordion="single" class="services-slider_accordion">
                    <div data-accordion-item="" class="platform-slider_accordion_item">
                      <button data-accordion-trigger="" class="platform-slider_accordion_trigger">
                        <h5 class="text-heading-h5 sm-text-heading-h6-mobile">Behind-the-meter power</h5>
                        <div class="platform-slider_accordion_plus">
                          <div class="plus-toggle">
                            <div class="plus-toggle_icon is-plus w-embed">
                              <svg width="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="…(see icons.tsx)" fill="currentColor"/>
                              </svg>
                            </div>
                            <div class="plus-toggle_icon is-minus w-embed">
                              <svg width="100%" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 6H11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </button>
                      <div data-accordion-expand="" class="platform-slider_accordion_expand">
                        <div class="platform-slider_accordion_content">
                          <h4 class="text-label-md-bold">
                          </h4>
                          <p class="text-body-sm">Bring AI capacity online faster with on-site behind-the-meter generation that bypasses multi-year grid interconnection queues and reduces dependence on utility timelines.</p>
                        </div>
                      </div>
                    </div>
                    <div data-accordion-item="" class="platform-slider_accordion_item">
                      <button data-accordion-trigger="" class="platform-slider_accordion_trigger">
                        <h5 class="text-heading-h5 sm-text-heading-h6-mobile">Microgrid islands</h5>
                        <div class="platform-slider_accordion_plus">
                          <div class="plus-toggle">
                            <div class="plus-toggle_icon is-plus w-embed">
                              <svg width="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="…(see icons.tsx)" fill="currentColor"/>
                              </svg>
                            </div>
                            <div class="plus-toggle_icon is-minus w-embed">
                              <svg width="100%" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 6H11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </button>
                      <div data-accordion-expand="" class="platform-slider_accordion_expand">
                        <div class="platform-slider_accordion_content">
                          <h4 class="text-label-md-bold">
                          </h4>
                          <p class="text-body-sm">Keep AI workloads running during grid disruption with microgrid infrastructure designed to operate independently of the utility supply.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="services-slider_cta-wrap">
                    <a href="/press-releases/nscale-acquires-american-intelligence-power-corporation" class="w-inline-block">
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
                    </a>
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
### .platform-slider_accordion_content
  [base] .platform-slider_accordion_content { grid-column-gap: .625rem; grid-row-gap: .625rem; flex-flow: column; padding-top: .625rem; display: flex; }
### .platform-slider_accordion_expand
  [base] .platform-slider_accordion_expand { overflow: hidden; }
  [@media screen and (max-width: 991px)] .platform-slider_accordion_expand { overflow: hidden; }
### .platform-slider_accordion_plus
  [base] .platform-slider_accordion_plus { flex: none; width: 1rem; }
### .platform-slider_accordion_trigger
  [base] .platform-slider_accordion_trigger { border-bottom: 1px solid var(--content--primary); background-color: #0000; justify-content: space-between; align-items: center; width: 100%; padding: .5rem 0; display: flex; }
### .plus-toggle_icon
  [base] .plus-toggle_icon { justify-content: center; align-items: center; display: flex; }
  [base] .plus-toggle_icon.is-minus { display: none; }
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
### .section_services-slider
  [base] .section_services-slider { display: none; }
  [@media screen and (max-width: 991px)] .section_services-slider { grid-column-gap: 2rem; grid-row-gap: 2rem; flex-flow: column; display: flex; overflow: hidden; }
### .services-slider_accordion
  [@media screen and (max-width: 991px)] .services-slider_accordion { grid-column-gap: 1rem; grid-row-gap: 1rem; flex-flow: column; display: flex; }
### .services-slider_content-slider
  [@media screen and (max-width: 991px)] .services-slider_content-slider { width: 100%; margin-top: .5rem; }
### .services-slider_content_title-wrap
  [@media screen and (max-width: 991px)] .services-slider_content_title-wrap { grid-column-gap: 1.5rem; grid-row-gap: 1.5rem; flex-flow: column; display: flex; }
### .services-slider_content_wrap
  [@media screen and (max-width: 991px)] .services-slider_content_wrap { grid-column-gap: 2rem; grid-row-gap: 2rem; flex-flow: column; display: flex; }
### .services-slider_cta-wrap
  [base] .services-slider_cta-wrap { grid-column-gap: 24px; grid-row-gap: 24px; justify-content: flex-start; align-items: center; display: flex; }
  [@media screen and (max-width: 991px)] .services-slider_cta-wrap { grid-column-gap: 1.5rem; grid-row-gap: 1.5rem; }
### .services-slider_images-slider
  [@media screen and (max-width: 991px)] .services-slider_images-slider { width: 100%; }
### .services-slider_pagination
  [@media screen and (max-width: 991px)] .services-slider_pagination { grid-column-gap: .25rem; grid-row-gap: .25rem; display: flex; }
### .services-slider_title-wrap
  [@media screen and (max-width: 991px)] .services-slider_title-wrap { grid-column-gap: 1rem; grid-row-gap: 1rem; flex-flow: column; display: flex; }
### .services-slider_top-wrap
  [@media screen and (max-width: 991px)] .services-slider_top-wrap { grid-column-gap: 2rem; grid-row-gap: 2rem; flex-flow: column; justify-content: flex-start; align-items: flex-start; display: flex; }
### .sm-text-heading-h6-mobile
  [@media screen and (max-width: 767px)] .sm-text-heading-h6-mobile { font-size: 1rem; font-weight: 700; line-height: 1.25rem; }
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
### .text-body-md
  [base] .text-body-md { font-size: 1rem; line-height: 1.5rem; }
### .text-body-sm
  [base] .text-body-sm { font-size: .875rem; line-height: 1.25rem; }
  [base] .text-body-sm.features-accordion_expand { overflow: hidden; }
### .text-heading-h3-mobile
  [base] .text-heading-h3-mobile { font-size: 2rem; font-weight: 500; line-height: 2.625rem; }
### .text-heading-h5
  [base] .text-heading-h5 { font-size: 1.5rem; font-weight: 500; line-height: 2rem; }
  [base] .text-heading-h5.sm-text-heading-h5-mobile:where(.w-variant-9b10d970-4b22-d119-6bb1-ce94eb659ac4) { font-size: 1rem; line-height: 1.25rem; }
### .text-label-md-bold
  [base] .text-label-md-bold { font-size: 1rem; font-weight: 600; line-height: 1.5rem; }
### .w-embed
  [base] .w-embed:before, .w-embed:after { content: " "; grid-area: 1 / 1 / 2 / 2; display: table; }
  [base] .w-embed:after { clear: both; }
### .w-inline-block
  [base] .w-inline-block { max-width: 100%; display: inline-block; }
```

## Text content (verbatim, in document order)

- A complete AI cloud platform
- Deploy AI on infrastructure designed for scale, resilience, and speed.
- Explore the platform
- Nscale Cloud
- A managed platform for AI teams including dedicated inference, customizable Environments, managed Kubernetes and Slurm, enterprise IAM and security.
- AI Services
- Move from experimentation to production without managing infrastructure, using serverless or dedicated inference, fine-tuning, prompt workbench, and OpenAI-compatible APIs.
- Managed platform services
- Run AI workloads with less operational complexity, using Nscale Kubernetes Service (NKS) and Managed Slurm for autoscaling and predictable training queues, while Environments isolate workloads and help teams get more from reserved GPU clusters.
- Bare metal instances
- Reduce operational burden for intensive AI workloads with dedicated GPU nodes managed through Nscale Cloud, while reservations and placements map workloads to physical topology and NVLink domains.
- Get Started
- Learn more
- Nscale Infrastructure
- Dedicated GPU infrastructure tailored to your operational requirements.
- Fleet Operations
- Keep GPU capacity productive with a fleet-wide observability platform, automated fault detection and remediation, and resource governance that maintains healthy and schedulable capacity.
- GPU &amp; CPU compute
- Get the right compute configuration into production quickly, with GPU and CPU infrastructure tailored to your platform, architecture and operating model.
- Fast Networking &amp; storage
- Scale workloads without bottlenecks across low-latency InfiniBand, RoCE and NVLink interconnects that keep GPUs communicating efficiently. Keep training and inference fed with AI-optimised parallel storage for predictable throughput at scale.
- Reserve GPUs
- Nscale Data Centers
- Purpose-built data centers engineered for AI.
- Modular
- Expand capacity predictably with prefabricated modules designed for rapid, repeatable deployment.
- Liquid cooled
- Closed-loop liquid cooling removes heat efficiently to enable reliable operation for next-generation AI infrastructure.
- Low PUE
- Reduce facility energy overhead and operating costs through efficient power and cooling design that targets a Power Usage Effectiveness (PUE) of 1.1–1.15, leaving more power capacity for productive AI compute.
- Nscale Energy &amp; Power
- Dedicated energy infrastructure for faster, more resilient AI.
- Behind-the-meter power
- Bring AI capacity online faster with on-site behind-the-meter generation that bypasses multi-year grid interconnection queues and reduces dependence on utility timelines.
- Microgrid islands
- Keep AI workloads running during grid disruption with microgrid infrastructure designed to operate independently of the utility supply.
