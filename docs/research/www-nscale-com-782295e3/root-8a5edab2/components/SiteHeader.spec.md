# SiteHeader Specification

## Overview
- **Target files (THREE, all in `src/components/sites/www-nscale-com-782295e3/root-8a5edab2/`):**
  - `SiteHeader.tsx` — the fixed shell: logo, desktop nav triggers, Login CTA, scroll background,
    hamburger. Owns the "which dropdown is open" state and the "is the mobile menu open" state.
  - `HeaderDropdowns.tsx` — the four mega-dropdown panels.
  - `MobileMenu.tsx` — the <=991px slide-in menu.
- **Screenshot (transparent state, over the hero):**
  `docs/design-references/www-nscale-com-782295e3/root-8a5edab2/desktop-01-hero.jpg`
- **Screenshot (opaque state, scrolled):**
  `docs/design-references/www-nscale-com-782295e3/root-8a5edab2/desktop-05-infrastructure.jpg`
- **Measured box:** `position: fixed; inset: 0 0 auto; z-index: 999; height: 73px`
  (72px bar + a 1px border element beneath it).

These three files are one cohesive unit and share state, which is why one builder owns all three.

## THE SCROLL BEHAVIOR - measured precisely, get this exact

The `<header>` and every descendant are FULLY TRANSPARENT. The visible bar is a separate
absolutely-positioned layer, `div.header_background` (`[data-header-bg]`), 72px tall, full width,
`background-color: #0c0c0e`.

Its **opacity is scrubbed continuously by scroll position** — it is NOT a boolean class toggle:

| scrollY | opacity |
| --- | --- |
| 0 | 0 |
| 200 | 0.9721 |
| 500 | 1 |

That is a linear scrub from 0 to 1 over roughly the first **206px**, clamped at 1 afterwards.
Implement as a scroll listener setting `opacity = Math.min(1, scrollY / 206)`, ideally through a
CSS custom property updated in a `requestAnimationFrame`-throttled handler. Do NOT use a CSS
transition triggered by a class — the original is continuous, and a stepped version is
immediately noticeable against the hero.

At the very top the blue hero video shows straight through the header. That is intended.

`[data-header-border]` is a 1px full-width element at y=72. Measured `opacity: 1` but with no
background colour or image, so it is **invisible at >=992px** — keep it for structure but expect
no visible line. At <=991px the CSS adds `border-bottom: 1px solid #ffffff1a` to `.header`.

## Desktop nav (>=992px)
Five items: `Data Centers`, `Services`, `Company`, `Resources` (each with a chevron and a
dropdown) and `Contact` (a plain link). A `Login ->` button sits at the far right.

Four dropdown panels, distinguished by class:
- `.header_nav_dropdown.is-centers` — the large data-centre panel (includes location lists)
- `.header_nav_dropdown.is-services` — the services mega panel
- `.header_nav_dropdown.is-simple` x2 — Company and Resources

Each trigger also has a `.header_nav_dropdown-bridge` — an invisible hover bridge that keeps the
panel open while the pointer travels from the trigger down to the panel. Reproduce it; without it
the dropdowns feel broken.

Open on hover (`mouseenter` on the nav item), close when the pointer leaves the item+panel group.
Also support keyboard focus and `Escape` to close. Only one panel open at a time.

## Mobile menu (<=991px)
`[data-mobile-menu]` / `.mobile-menu`, opened by `[data-mobile-hamburger]`. Contains four
`.mobile-menu_group` blocks, each a `.mobile-menu_group-title` plus a `.mobile-menu_links-wrap`
nav, then a `.mobile-menu_cta-wrap`. Lock body scroll while open and close on `Escape`.

## Icons
All already in the shared module — import, never re-inline:
`NscaleLogo` (178x20, the desktop wordmark), `NscaleMarkIcon` (32x16, the compact mobile mark),
`ChevronDownIcon` (the nav chevrons), `ArrowRightIcon` (the Login arrow).
The source ships both logos as `.header_logo.is-desktop` and `.header_logo.is-mobile` and swaps
them by breakpoint — mirror that.

## Notes
- These are all `"use client"` components.
- Every link href is in the DOM below; keep them as plain `<a>` (most routes do not exist in the
  clone, and `next/link` would prefetch 404s).
- Do not build a search field, a theme toggle, or anything else not present in the DOM below.

## Source DOM (verbatim from the live page)

```html
<header data-header-height="" data-header-scroll="" class="header">
  <div class="header_main">
    <div class="padding-global">
      <div class="container-large">
        <div class="header_wrap">
          <div class="header_logo-wrap">
            <a href="/" aria-current="page" class="w-inline-block w--current">
              <div class="header_logo is-desktop w-embed">
                <svg height="100%" viewBox="0 0 178 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_5112_6015)">
                    <path d="…(see icons.tsx)" fill="currentColor"/>
                    <path d="…(see icons.tsx)" fill="currentColor"/>
                    <path d="…(see icons.tsx)" fill="currentColor"/>
                    <path d="…(see icons.tsx)" fill="currentColor"/>
                    <path d="M139.438 19.9036C137.241 19.9036 135.445 18.1133 135.445 15.9234V0H139.438V15.9234H155.413V19.9036H139.438Z" fill="currentColor"/>
                    <path d="…(see icons.tsx)" fill="currentColor"/>
                    <path d="…(see icons.tsx)" fill="currentColor"/>
                    <path opacity="0.6" d="…(see icons.tsx)" fill="currentColor"/>
                    <path opacity="0.4" d="…(see icons.tsx)" fill="currentColor"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_5112_6015">
                      <rect width="178" height="20" fill="currentColor"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div class="header_logo is-mobile w-embed">
                <svg height="100%" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_5112_17695)">
                    <path d="…(see icons.tsx)" fill="currentColor"/>
                    <path opacity="0.6" d="…(see icons.tsx)" fill="currentColor"/>
                    <path opacity="0.4" d="…(see icons.tsx)" fill="currentColor"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_5112_17695">
                      <rect width="28.39" height="16" fill="currentColor"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </a>
            <nav class="header_nav">
              <div data-menu-link="trigger" class="header_nav_item">
                <button class="header_nav_link">
                  <div class="text-mono-xs">Data Centers</div>
                  <div class="header_nav_chevron w-embed">
                    <svg width="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="…(see icons.tsx)" fill="currentColor"/>
                    </svg>
                  </div>
                  <div class="header_nav_dropdown-bridge">
                  </div>
                </button>
                <div data-nav-dc-map="" data-dropdown="" class="header_nav_dropdown is-centers">
                  <div class="header_nav_centers">
                    <div class="header_nav_centers_columns">
                      <div class="header_nav_centers_column has-border">
                        <div class="header_nav_centers_column-content">
                          <div class="header_nav_label-wrap">
                            <h3 class="text-nav-label-tiny">Nscale data centers</h3>
                          </div>
                          <a data-dc-location="glomfjord" href="/ai-infrastructure#dc-glomfjord" class="header_nav_sub-link is-dc w-inline-block">
                            <div class="header_nav_dc-dot">
                            </div>
                            <div class="header_nav_sub-text-wrap">
                              <div class="text-nav-regular">Glomfjord</div>
                              <div class="header_nav_sub-link_desc">Norway</div>
                            </div>
                          </a>
                          <a data-dc-location="narvik" href="/ai-infrastructure#dc-narvik" class="header_nav_sub-link is-dc w-inline-block">
                            <div class="header_nav_dc-dot">
                            </div>
                            <div class="header_nav_sub-text-wrap">
                              <div class="text-nav-regular">Narvik</div>
                              <div class="header_nav_sub-link_desc">Norway</div>
                            </div>
                          </a>
                          <a data-dc-location="loughton" href="/ai-infrastructure#dc-loughton" class="header_nav_sub-link is-dc w-inline-block">
                            <div class="header_nav_dc-dot">
                            </div>
                            <div class="header_nav_sub-text-wrap">
                              <div class="text-nav-regular">Loughton</div>
                              <div class="header_nav_sub-link_desc">United Kingdom</div>
                            </div>
                          </a>
                          <a data-dc-location="texas" href="/ai-infrastructure#dc-texas" class="header_nav_sub-link is-dc w-inline-block">
                            <div class="header_nav_dc-dot">
                            </div>
                            <div class="header_nav_sub-text-wrap">
                              <div class="text-nav-regular">Texas</div>
                              <div class="header_nav_sub-link_desc">United States</div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="header_nav_centers_column has-border">
                        <div class="header_nav_centers_column-content">
                          <div class="header_nav_label-wrap">
                            <h3 class="text-nav-label-tiny">Partner-run data centers</h3>
                          </div>
                          <a data-dc-location="sines" href="/ai-infrastructure#dc-sines" class="header_nav_sub-link is-dc w-inline-block">
                            <div class="header_nav_dc-dot is-pink">
                            </div>
                            <div class="header_nav_sub-text-wrap">
                              <div class="text-nav-regular">Sines</div>
                              <div class="header_nav_sub-link_desc">Portugal</div>
                            </div>
                          </a>
                          <a data-dc-location="keflavik" href="/ai-infrastructure#dc-keflavik" class="header_nav_sub-link is-dc w-inline-block">
                            <div class="header_nav_dc-dot is-pink">
                            </div>
                            <div class="header_nav_sub-text-wrap">
                              <div class="text-nav-regular">Keflavik</div>
                              <div class="header_nav_sub-link_desc">Iceland</div>
                            </div>
                          </a>
                          <a data-dc-location="stavanger" href="/ai-infrastructure#partner-centers" class="header_nav_sub-link is-dc w-inline-block">
                            <div class="header_nav_dc-dot is-pink">
                            </div>
                            <div class="header_nav_sub-text-wrap">
                              <div class="text-nav-regular">Stavanger</div>
                              <div class="header_nav_sub-link_desc">Norway</div>
                            </div>
                          </a>
                          <a data-dc-location="oslo" href="/ai-infrastructure#partner-centers" class="header_nav_sub-link is-dc w-inline-block">
                            <div class="header_nav_dc-dot is-pink">
                            </div>
                            <div class="header_nav_sub-text-wrap">
                              <div class="text-nav-regular">Oslo</div>
                              <div class="header_nav_sub-link_desc">Norway</div>
                            </div>
                          </a>
                          <a data-dc-location="borealis" href="/ai-infrastructure#partner-centers" class="header_nav_sub-link is-dc w-inline-block">
                            <div class="header_nav_dc-dot is-pink">
                            </div>
                            <div class="header_nav_sub-text-wrap">
                              <div class="text-nav-regular">Blönduós</div>
                              <div class="header_nav_sub-link_desc">Iceland</div>
                            </div>
                          </a>
                          <a data-dc-location="slough" href="/ai-infrastructure#partner-centers" class="header_nav_sub-link is-dc w-inline-block">
                            <div class="header_nav_dc-dot is-pink">
                            </div>
                            <div class="header_nav_sub-text-wrap">
                              <div class="text-nav-regular">Hayes</div>
                              <div class="header_nav_sub-link_desc">United Kingdom</div>
                            </div>
                          </a>
                          <a data-dc-location="northCarolina" href="/ai-infrastructure#partner-centers" class="header_nav_sub-link is-dc w-inline-block">
                            <div class="header_nav_dc-dot is-pink">
                            </div>
                            <div class="header_nav_sub-text-wrap">
                              <div class="text-nav-regular">North Carolina</div>
                              <div class="header_nav_sub-link_desc">United States</div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="header_nav_centers_column">
                        <div class="header_nav_centers_column-content">
                          <div class="header_nav_label-wrap">
                            <h3 class="text-nav-label-tiny">AVAILABLE DATA CENTERS</h3>
                          </div>
                          <a data-dc-location="westVirginia" href="/ai-infrastructure#dc-monarch" class="header_nav_sub-link is-dc w-inline-block">
                            <div class="header_nav_dc-dot is-green">
                            </div>
                            <div class="header_nav_sub-text-wrap">
                              <div class="text-nav-regular">West Virginia</div>
                              <div class="header_nav_sub-link_desc">United States</div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="header_nav_centers_map-wrap">
                      <a href="/ai-infrastructure" class="header_nav_centers_main-cta w-inline-block">
                        <img class="header_nav_centers_cta-image" src="https://cdn.prod.website-files.com/69e759200831878be71184d8/6a005c353e5bc3f7560008ff_Map_BG%20(2).avif" alt="" sizes="100vw" data-map-el="" loading="lazy" srcset="https://cdn.prod.website-files.com/69e759200831878be71184d8/6a005c353e5bc3f7560008ff_Map_BG%2520(2)-p-500.avif 500w, https://cdn.prod.website-files.com/69e759200831878be71184d8/6a005c353e5bc3f7560008ff_Map_BG%2520(2)-p-800.avif 800w, https://cdn.prod.website-files.com/69e759200831878be71184d8/6a005c353e5bc3f7560008ff_Map_BG%2520(2)-p-1080.avif 1080w, https://cdn.prod.website-files.com/69e759200831878be71184d8/6a005c353e5bc3f7560008ff_Map_BG%2520(2)-p-1600.avif 1600w, https://cdn.prod.website-files.com/69e759200831878be71184d8/6a005c353e5bc3f7560008ff_Map_BG%2520(2)-p-2000.avif 2000w, https://cdn.prod.website-files.com/69e759200831878be71184d8/6a005c353e5bc3f7560008ff_Map_BG%2520(2)-p-2600.avif 2600w, https://cdn.prod.website-files.com/69e759200831878be71184d8/6a005c353e5bc3f7560008ff_Map_BG%2520(2)-p-3200.avif 3200w, https://cdn.prod.website-files.com/69e759200831878be71184d8/6a005c353e5bc3f7560008ff_Map_BG%20(2).avif 3552w"/>
                        <div data-map-label="wrap" class="header_nav_map-label">
                          <div data-map-label="content" class="text-label-tiny-regular">Texas, USA</div>
                        </div>
                        <div data-btn-hover="True" data-wf--button--variant="ghost" class="button w-variant-102d8d7c-b6c2-bee4-5324-47d2981389c4">
                          <span>All Data Centers</span>
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
              <div data-menu-link="trigger" class="header_nav_item">
                <button class="header_nav_link">
                  <div class="text-mono-xs">Services</div>
                  <div class="header_nav_chevron w-embed">
                    <svg width="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="…(see icons.tsx)" fill="currentColor"/>
                    </svg>
                  </div>
                  <div class="header_nav_dropdown-bridge">
                  </div>
                </button>
                <div data-dropdown="" class="header_nav_dropdown is-services">
                  <div data-menu-services-block="" class="header_nav_services">
                    <div class="header_nav_services_all-col">
                      <h3 class="text-label-lg-bold">Explore our full AI stack</h3>
                      <a href="/service-overview" class="w-inline-block">
                        <div data-btn-hover="True" data-wf--button--variant="ghost-small" class="button w-variant-1aebf52f-070e-4d15-f0a9-30cd91ebcd0e">
                          <span>All Services</span>
                          <div>
                            <div class="button_icon w-variant-1aebf52f-070e-4d15-f0a9-30cd91ebcd0e w-embed">
                              <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="…(see icons.tsx)" fill="currentColor"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div data-menu-service="rgba(0, 1, 59, 0.8)" class="header_nav_services_service-col">
                      <div class="header_nav_services_content">
                        <div class="header_nav_services_content-padding">
                          <h3 class="text-nav-label-tiny">AI services</h3>
                        </div>
                        <ul role="list" class="header_nav_services_list">
                          <li class="header_nav_services_list-item">
                            <a href="/services/ai-services#inference-endpoints" class="header_nav_services_list-link w-inline-block">
                              <h4 class="text-nav-regular">Inference Endpoints</h4>
                              <div class="header_nav_services_item-desc">Run models via API</div>
                            </a>
                          </li>
                          <li class="header_nav_services_list-item">
                            <a href="/services/ai-services#prompt-workbench" class="header_nav_services_list-link w-inline-block">
                              <h4 class="text-nav-regular">Prompt Workbench</h4>
                              <div class="header_nav_services_item-desc">Test and iterate prompts</div>
                            </a>
                          </li>
                          <li class="header_nav_services_list-item">
                            <a href="/services/ai-services#fine-tuning" class="header_nav_services_list-link w-inline-block">
                              <h4 class="text-nav-regular">Fine-tuning</h4>
                              <div class="header_nav_services_item-desc">Adapt models to your data</div>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <a href="/services/ai-services" class="header_nav_services_link w-inline-block">
                      </a>
                    </div>
                    <div data-menu-service="rgba(11, 3, 19, 0.8)" class="header_nav_services_service-col">
                      <div class="header_nav_services_content">
                        <div class="header_nav_services_content-padding">
                          <h3 class="text-nav-label-tiny">Platform Services</h3>
                        </div>
                        <ul role="list" class="header_nav_services_list">
                          <li class="header_nav_services_list-item">
                            <a href="/services/platform-services#managed-slurm" class="header_nav_services_list-link w-inline-block">
                              <h4 class="text-nav-regular">Managed Slurm</h4>
                              <div class="header_nav_services_item-desc">Distributed model training</div>
                            </a>
                          </li>
                          <li class="header_nav_services_list-item">
                            <a href="/services/platform-services#scale-kubernetes-service" class="header_nav_services_list-link w-inline-block">
                              <h4 class="text-nav-regular">Kubernetes service</h4>
                              <div class="header_nav_services_item-desc">Run containerised workloads</div>
                            </a>
                          </li>
                          <li class="header_nav_services_list-item">
                            <a href="/services/platform-services#instances" class="header_nav_services_list-link w-inline-block">
                              <h4 class="text-nav-regular">Instances</h4>
                              <div class="header_nav_services_item-desc">Provision virtual machines</div>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <a href="/services/platform-services" class="header_nav_services_link w-inline-block">
                      </a>
                    </div>
                    <div data-menu-service="rgba(16, 9, 2, 0.8)" class="header_nav_services_service-col">
                      <div class="header_nav_services_content">
                        <div class="header_nav_services_content-padding">
                          <h3 class="text-nav-label-tiny">INFRASTRUCTURE SERVICES</h3>
                        </div>
                        <ul role="list" class="header_nav_services_list">
                          <li class="header_nav_services_list-item">
                            <a href="/services/infrastructure-services#compute" class="header_nav_services_list-link w-inline-block">
                              <h4 class="text-nav-regular">Compute</h4>
                              <div class="header_nav_services_item-desc">On-demand GPU &amp; CPU</div>
                            </a>
                          </li>
                          <li class="header_nav_services_list-item">
                            <a href="/services/infrastructure-services#networking" class="header_nav_services_list-link w-inline-block">
                              <h4 class="text-nav-regular">Networking</h4>
                              <div class="header_nav_services_item-desc">Connect &amp; secure resources</div>
                            </a>
                          </li>
                          <li class="header_nav_services_list-item">
                            <a href="/services/infrastructure-services#storage" class="header_nav_services_list-link w-inline-block">
                              <h4 class="text-nav-regular">Storage</h4>
                              <div class="header_nav_services_item-desc">Store and access data</div>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <a href="/services/infrastructure-services" class="header_nav_services_link w-inline-block">
                      </a>
                    </div>
                    <div data-menu-service="rgba(15, 23, 20, 0.8)" class="header_nav_services_service-col">
                      <div class="header_nav_services_content">
                        <div class="header_nav_services_content-padding">
                          <h3 class="text-nav-label-tiny">Fleet OPERATIONS</h3>
                        </div>
                        <ul role="list" class="header_nav_services_list">
                          <li class="header_nav_services_list-item">
                            <a href="/services/fleet-operations#control-center" class="header_nav_services_list-link w-inline-block">
                              <h4 class="text-nav-regular">Control Center</h4>
                              <div class="header_nav_services_item-desc">Manage your environment</div>
                            </a>
                          </li>
                          <li class="header_nav_services_list-item">
                            <a href="/services/fleet-operations#observability" class="header_nav_services_list-link w-inline-block">
                              <h4 class="text-nav-regular">Observability</h4>
                              <div class="header_nav_services_item-desc">Monitor systems and jobs</div>
                            </a>
                          </li>
                          <li class="header_nav_services_list-item">
                            <a href="/services/fleet-operations#radar-api" class="header_nav_services_list-link w-inline-block">
                              <h4 class="text-nav-regular">Radar API</h4>
                              <div class="header_nav_services_item-desc">Track usage and events</div>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <a href="/services/fleet-operations" class="header_nav_services_link w-inline-block">
                      </a>
                    </div>
                  </div>
                  <div class="header_nav_services_cta">
                    <h3 class="text-mono-xs">Use our services on demand</h3>
                    <a href="https://console.nscale.com" target="_blank" class="w-inline-block">
                      <div data-btn-hover="True" data-wf--button--variant="glass" class="button w-variant-5057a24d-38d9-5143-607f-674b39e3a2f2">
                        <span>Start Building</span>
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
              <div data-menu-link="trigger" class="header_nav_item">
                <button class="header_nav_link">
                  <div class="text-mono-xs">Company</div>
                  <div class="header_nav_chevron w-embed">
                    <svg width="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="…(see icons.tsx)" fill="currentColor"/>
                    </svg>
                  </div>
                  <div class="header_nav_dropdown-bridge">
                  </div>
                </button>
                <div data-dropdown="" class="header_nav_dropdown is-simple">
                  <div class="header_nav_label-wrap">
                    <h3 class="text-nav-label-tiny">Company</h3>
                  </div>
                  <a href="/about" class="header_nav_sub-link is-light-grey w-inline-block">
                    <div class="text-nav-regular">About Nscale</div>
                  </a>
                  <a href="/careers" class="header_nav_sub-link is-light-grey w-inline-block">
                    <div class="text-nav-regular">Careers</div>
                  </a>
                </div>
              </div>
              <div data-menu-link="trigger" class="header_nav_item">
                <button class="header_nav_link">
                  <div class="text-mono-xs">Resources</div>
                  <div class="header_nav_chevron w-embed">
                    <svg width="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="…(see icons.tsx)" fill="currentColor"/>
                    </svg>
                  </div>
                  <div class="header_nav_dropdown-bridge">
                  </div>
                </button>
                <div data-dropdown="" class="header_nav_dropdown is-simple">
                  <div class="header_nav_label-wrap">
                    <h3 class="text-nav-label-tiny">Resources</h3>
                  </div>
                  <a href="/newsroom" class="header_nav_sub-link is-light-grey w-inline-block">
                    <div class="text-nav-regular">Newsroom</div>
                  </a>
                  <a href="/blog" class="header_nav_sub-link is-light-grey w-inline-block">
                    <div class="text-nav-regular">Blog</div>
                  </a>
                  <a href="https://docs.nscale.com/docs/getting-started/overview" target="_blank" class="header_nav_sub-link is-light-grey is-icon w-inline-block">
                    <div class="text-nav-regular">Docs</div>
                    <div class="header_nav_external-icon w-embed">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </a>
                  <a href="/media-kit" class="header_nav_sub-link is-light-grey w-inline-block">
                    <div class="text-nav-regular">Media kit</div>
                  </a>
                </div>
              </div>
              <div data-menu-link="trigger" class="header_nav_item">
                <a href="/contact" class="header_nav_link w-inline-block">
                  <div class="text-mono-xs">Contact</div>
                </a>
              </div>
            </nav>
          </div>
          <div class="header_nav_cta-wrap">
            <a href="https://console.nscale.com/" target="_blank" class="w-inline-block">
              <div data-btn-hover="True" data-wf--button--variant="glass" class="button w-variant-5057a24d-38d9-5143-607f-674b39e3a2f2">
                <span>Login</span>
                <div>
                  <div class="button_icon w-embed">
                    <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="…(see icons.tsx)" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>
            </a>
            <button data-mobile-hamburger="" class="header_nav_hamburger">
              <div class="header_nav_hamburger_line is-top">
              </div>
              <div class="header_nav_hamburger_line is-center">
              </div>
              <div class="header_nav_hamburger_line is-bottom">
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div data-header-bg="" class="header_background">
    </div>
  </div>
  <div data-header-border="" class="header_dashed-border w-embed">
    <svg width="100%" viewBox="0 0 1440 1" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="1440" y1="0.5" y2="0.5" stroke="white" stroke-opacity="0.1" stroke-dasharray="4 4"/>
    </svg>
  </div>
  <div data-mobile-menu="" class="mobile-menu">
    <div class="mobile-menu_wrap">
      <div class="header-spacer">
      </div>
      <div class="mobile-menu_nav">
        <div class="mobile-menu_group">
          <div class="mobile-menu_group-title">
            <h3 class="text-nav-label-tiny">DATA CENTERS</h3>
          </div>
          <nav class="mobile-menu_links-wrap">
            <a href="/ai-infrastructure#dc-glomfjord" class="mobile-menu_link w-inline-block">
              <div class="text-label-lg-bold">Glomfjord</div>
            </a>
            <a href="/ai-infrastructure#dc-narvik" class="mobile-menu_link w-inline-block">
              <div class="text-label-lg-bold">Narvik</div>
            </a>
            <a href="/ai-infrastructure#dc-loughton" class="mobile-menu_link w-inline-block">
              <div class="text-label-lg-bold">Loughton</div>
            </a>
            <a href="/ai-infrastructure#dc-texas" class="mobile-menu_link w-inline-block">
              <div class="text-label-lg-bold">Texas</div>
            </a>
            <a href="/ai-infrastructure#dc-sines" class="mobile-menu_link w-inline-block">
              <div class="text-label-lg-bold">Sines</div>
            </a>
            <a href="/ai-infrastructure#dc-keflavik" class="mobile-menu_link w-inline-block">
              <div class="text-label-lg-bold">Keflavik</div>
            </a>
            <a href="/ai-infrastructure#dc-monarch" class="mobile-menu_link w-inline-block">
              <div class="text-label-lg-bold">West Virginia</div>
            </a>
          </nav>
        </div>
        <div class="mobile-menu_group">
          <div class="mobile-menu_group-title">
            <h3 class="text-nav-label-tiny">SERVICES</h3>
          </div>
          <nav class="mobile-menu_links-wrap">
            <a href="/service-overview?slide=0#section-stack-slider" class="mobile-menu_link w-inline-block">
              <div class="text-label-lg-bold">AI Services</div>
            </a>
            <a href="/service-overview?slide=1#section-stack-slider" class="mobile-menu_link w-inline-block">
              <div class="text-label-lg-bold">Platform Services</div>
            </a>
            <a href="/service-overview?slide=2#section-stack-slider" class="mobile-menu_link w-inline-block">
              <div class="text-label-lg-bold">Infrastructure Services</div>
            </a>
            <a href="/service-overview?slide=3#section-stack-slider" class="mobile-menu_link w-inline-block">
              <div class="text-label-lg-bold">Fleet Operations</div>
            </a>
          </nav>
        </div>
        <div class="mobile-menu_group">
          <div class="mobile-menu_group-title">
            <h3 class="text-nav-label-tiny">COMPANY</h3>
          </div>
          <nav class="mobile-menu_links-wrap">
            <a href="/about" class="mobile-menu_link w-inline-block">
              <div class="text-label-lg-bold">About</div>
            </a>
            <a href="/careers" class="mobile-menu_link w-inline-block">
              <div class="text-label-lg-bold">Careers</div>
            </a>
          </nav>
        </div>
        <div class="mobile-menu_group">
          <div class="mobile-menu_group-title">
            <h3 class="text-nav-label-tiny">Resources</h3>
          </div>
          <nav class="mobile-menu_links-wrap">
            <a href="/newsroom" class="mobile-menu_link w-inline-block">
              <div class="text-label-lg-bold">Newsroom</div>
            </a>
            <a href="/blog" class="mobile-menu_link w-inline-block">
              <div class="text-label-lg-bold">Blog</div>
            </a>
            <a href="https://docs.nscale.com/docs/getting-started/overview?_gl=1*wew6g*_gcl_au*MjA0OTA3MjQxNy4xNzczMjU1MzIz*FPAU*MjA0OTA3MjQxNy4xNzczMjU1MzIz" target="_blank" class="mobile-menu_link w-inline-block">
              <div class="text-label-lg-bold">Docs</div>
              <div class="header_nav_external-icon w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </a>
            <a href="#" class="mobile-menu_link w-inline-block">
              <div class="text-label-lg-bold">Media Kit</div>
            </a>
          </nav>
        </div>
      </div>
      <div class="mobile-menu_cta-wrap">
        <a href="/contact" class="w-inline-block">
          <div data-btn-hover="True" data-wf--button--variant="glass" class="button w-variant-5057a24d-38d9-5143-607f-674b39e3a2f2">
            <span>Contact</span>
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
</header>
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
### .header
  [base] .header { z-index: 999; position: fixed; inset: 0% 0% auto; }
  [@media screen and (max-width: 991px)] .header { border-bottom: 1px solid #ffffff1a; }
### .header-spacer
  [@media screen and (max-width: 991px)] .header-spacer { height: var(--header-height); }
### .header_background
  [base] .header_background { z-index: -1; background-color: var(--background--primary); opacity: 0; position: absolute; inset: 0%; }
### .header_dashed-border
  [base] .header_dashed-border { z-index: -1; justify-content: center; align-items: center; width: 100%; height: 1px; display: flex; position: relative; }
  [@media screen and (max-width: 991px)] .header_dashed-border { display: none; }
### .header_logo
  [base] .header_logo { height: 1.25rem; color: var(--content--primary); justify-content: center; align-items: center; display: flex; }
  [base] .header_logo.is-mobile { display: none; }
  [@media screen and (max-width: 991px)] .header_logo { height: 1rem; }
  [@media screen and (max-width: 767px)] .header_logo { height: .75rem; }
  [@media screen and (max-width: 767px)] .header_logo.is-desktop { display: none; }
  [@media screen and (max-width: 767px)] .header_logo.is-mobile { height: 1rem; display: flex; }
### .header_logo-wrap
  [base] .header_logo-wrap { grid-column-gap: 3.5rem; grid-row-gap: 3.5rem; justify-content: flex-start; align-items: center; display: flex; }
### .header_main
  [base] .header_main { position: relative; }
### .header_nav
  [base] .header_nav { grid-column-gap: 12px; grid-row-gap: 12px; justify-content: flex-start; align-items: stretch; display: flex; }
  [@media screen and (max-width: 991px)] .header_nav { display: none; }
### .header_nav_centers
  [base] .header_nav_centers { grid-column-gap: 2.5rem; grid-row-gap: 2.5rem; grid-template-rows: auto; grid-template-columns: 1fr 1fr; grid-auto-columns: 1fr; display: grid; }
### .header_nav_centers_column
  [base] .header_nav_centers_column { grid-column-gap: .25rem; grid-row-gap: .25rem; flex-flow: column; }
  [base] .header_nav_centers_column.has-border { border-right: 1px solid var(--border--glass-secondary); padding-right: 1rem; }
### .header_nav_centers_column-content
  [base] .header_nav_centers_column-content { grid-column-gap: .25rem; grid-row-gap: .25rem; flex-flow: column; width: 10.75rem; display: flex; }
### .header_nav_centers_columns
  [base] .header_nav_centers_columns { grid-column-gap: 1rem; grid-row-gap: 1rem; display: flex; }
### .header_nav_centers_cta-image
  [base] .header_nav_centers_cta-image { z-index: -1; opacity: .8; object-fit: cover; width: 100%; height: 100%; position: absolute; inset: 0%; }
### .header_nav_centers_main-cta
  [base] .header_nav_centers_main-cta { grid-column-gap: 16px; grid-row-gap: 16px; border: 1px solid var(--border--secondary); border-radius: 10px; flex-flow: column; grid-template-rows: auto auto; grid-template-columns: 1fr 1fr; grid-auto-columns: 1fr; justify-content: flex-end; align-self: stretch; align-items: flex-start; width: 100%; height: 100%; padding: 1rem; text-decoration: none; transition: border-color .2s; display: flex; position: relative; overflow: clip; }
  [base] .header_nav_centers_main-cta.w--current { aspect-ratio: 380 / 252; }
### .header_nav_centers_map-wrap
  [base] .header_nav_centers_map-wrap { aspect-ratio: 527 / 308; width: 100%; min-width: 0; }
### .header_nav_chevron
  [base] .header_nav_chevron { justify-content: center; align-items: center; width: 1.25rem; transition: transform .2s; display: flex; }
### .header_nav_cta-wrap
  [@media screen and (max-width: 991px)] .header_nav_cta-wrap { grid-column-gap: 1rem; grid-row-gap: 1rem; justify-content: flex-start; align-items: center; display: flex; }
### .header_nav_dc-dot
  [base] .header_nav_dc-dot { background-color: #3b82f6; border-radius: 1px; width: .375rem; height: .375rem; margin-top: .3125rem; }
  [base] .header_nav_dc-dot.is-pink { background-color: #ec4899; }
  [base] .header_nav_dc-dot.is-green { background-color: #34d399; }
### .header_nav_dropdown
  [base] .header_nav_dropdown { visibility: hidden; border-top: 1px solid #fff3; border-right-style: solid; border-right-width: 1px; border-right-color: var(--border--glass-primary); background-color: var(--background--glass-dark); -webkit-backdrop-filter: blur(80px); backdrop-filter: blur(80px); --background--primary: #0c0c0e; --content--secondary: #ffffffe6; --content--primary: white; --content--link: #0f98f3; --background--inverse: white; --content--inverse: #0c0c0e; --border--glass-primary: #ffffff1a; --background--glass-primary: #ffffff1a; --border--secondary: #ffffff1a; --background--highlight: #0f41f3; --background--glass-secondary: #ffffff0d; --background--secondary: #161618; --content--highlight: #0f41f3; --border--primary: #fff3; --background--glass-deep-blue: #0e0e17cc; --content--tertiary: #ffffff80; --border--glass-secondary: #ffffff0d; --background--glass-dark: #1a1a2acc; --border--hover: #fff6; --background--glass-blue: #00013bcc; --background--glass-green: #0f1714cc; --background--glass-purple: #0b0313cc; --background--glass-orange: #100902cc; border-bottom: 1px solid #fff3; border-left: 1px solid #fff3; border-radius: 10px; display: flex; top: calc(100% - 10px); box-shadow: 0 20px 20px #0000000d; }
  [base] .header_nav_dropdown.is-centers { grid-column-gap: .25rem; grid-row-gap: .25rem; background-color: var(--background--glass-deep-blue); -webkit-backdrop-filter: blur(120px); backdrop-filter: blur(120px); flex-flow: column; width: 100%; max-width: 100%; padding: 1rem; position: absolute; left: 50%; transform: translate(-50%); }
  [base] .header_nav_dropdown.is-simple { grid-column-gap: .25rem; grid-row-gap: .25rem; flex-flow: column; width: 11.625rem; padding: 1rem; position: absolute; }
  [base] .header_nav_dropdown.is-services { visibility: hidden; grid-column-gap: .25rem; grid-row-gap: .25rem; -webkit-backdrop-filter: blur(120px); backdrop-filter: blur(120px); flex-flow: column; width: 1034px; max-width: 100%; padding: .25rem; position: absolute; left: 50%; transform: translate(-50%); }
### .header_nav_dropdown-bridge
  [base] .header_nav_dropdown-bridge { z-index: 4; height: 100%; display: none; position: absolute; inset: 100% 0% 0%; }
  [base] .header_nav_dropdown-bridge.is-visible { display: flex; }
### .header_nav_external-icon
  [base] .header_nav_external-icon { justify-content: center; align-items: center; width: 1rem; display: flex; }
### .header_nav_hamburger
  [base] .header_nav_hamburger { display: none; }
  [@media screen and (max-width: 991px)] .header_nav_hamburger { background-color: #0000; justify-content: center; align-items: center; width: 1rem; height: 1rem; padding: 0; display: flex; position: relative; }
### .header_nav_hamburger_line
  [@media screen and (max-width: 991px)] .header_nav_hamburger_line { background-color: #fff; width: 100%; height: 1px; padding: 0; position: absolute; }
  [@media screen and (max-width: 991px)] .header_nav_hamburger_line.is-bottom { transform: translate(0, 6px); }
  [@media screen and (max-width: 991px)] .header_nav_hamburger_line.is-top { transform: translate(0, -6px); }
### .header_nav_item
  [base] .header_nav_item { border: 1px solid #0000; border-radius: 6px; transition: all .2s; display: flex; }
  [base] .header_nav_item:hover { border: 1px solid var(--border--glass-primary); background-color: var(--background--glass-primary); }
### .header_nav_label-wrap
  [base] .header_nav_label-wrap { padding: .5rem .625rem; }
### .header_nav_link
  [base] .header_nav_link { grid-column-gap: .5rem; grid-row-gap: .5rem; color: var(--content--primary); background-color: #0000; justify-content: center; align-items: center; padding: .5rem .75rem; text-decoration: none; display: flex; position: relative; overflow: visible; }
### .header_nav_map-label
  [base] .header_nav_map-label { grid-column-gap: 4px; grid-row-gap: 4px; -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); pointer-events: auto; cursor: pointer; background-color: #fff3; border: 1px solid #fff3; border-radius: 4px; height: 32px; padding: .5rem 1rem; display: flex; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
### .header_nav_services
  [base] .header_nav_services { grid-column-gap: 1rem; grid-row-gap: 1rem; border-style: solid; border-width: 1px; border-color: #ffffff1a var(--border--primary) #ffffff1a #ffffff1a; background-color: var(--background--glass-dark); border-radius: 8px; grid-template-rows: auto; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; grid-auto-columns: 1fr; padding: 1rem; display: grid; }
### .header_nav_services_all-col
  [base] .header_nav_services_all-col { grid-column-gap: 1.5rem; grid-row-gap: 1.5rem; border-right: 1px solid var(--border--glass-primary); flex-flow: column; justify-content: flex-start; align-items: flex-start; padding: .5rem 3rem .5rem .5rem; display: flex; }
### .header_nav_services_content
  [base] .header_nav_services_content { grid-column-gap: .75rem; grid-row-gap: .75rem; flex-flow: column; display: flex; }
### .header_nav_services_content-padding
  [base] .header_nav_services_content-padding { padding-left: .5rem; padding-right: .5rem; }
### .header_nav_services_cta
  [base] .header_nav_services_cta { justify-content: space-between; align-items: center; padding: .5rem 1rem; display: flex; }
### .header_nav_services_item-desc
  [base] .header_nav_services_item-desc { color: var(--content--tertiary); font-size: .75rem; line-height: 1rem; }
### .header_nav_services_link
  [base] .header_nav_services_link { z-index: 1; position: absolute; inset: 0%; }
### .header_nav_services_list
  [base] .header_nav_services_list { grid-column-gap: .25rem; grid-row-gap: .25rem; flex-flow: column; margin-bottom: 0; padding: 2px; list-style-type: none; display: flex; }
### .header_nav_services_list-item
  [base] .header_nav_services_list-item { z-index: 2; position: relative; }
### .header_nav_services_list-link
  [base] .header_nav_services_list-link { grid-column-gap: .25rem; grid-row-gap: .25rem; color: var(--content--primary); border: 1px solid #0000; border-radius: 4px; flex-flow: column; padding: .5rem; transition: background-color .2s; display: flex; }
  [base] .header_nav_services_list-link:hover { border-color: var(--border--glass-primary); background-color: var(--background--glass-primary); }
### .header_nav_services_service-col
  [base] .header_nav_services_service-col { grid-column-gap: 1.25rem; grid-row-gap: 1.25rem; color: #fff; border: 1px solid #0000; border-radius: 8px; flex-flow: column; padding-top: .5rem; text-decoration: none; transition: background-color .2s; display: flex; position: relative; overflow: hidden; }
  [base] .header_nav_services_service-col:hover { border: 1px solid var(--background--glass-primary); background-color: var(--background--glass-secondary); }
### .header_nav_sub-link
  [base] .header_nav_sub-link { grid-column-gap: .25rem; grid-row-gap: .25rem; color: var(--content--primary); border: 1px solid #0000; border-radius: 6px; flex-flow: column; padding: .5rem .625rem; line-height: 1rem; text-decoration: none; transition: all .2s; display: flex; }
  [base] .header_nav_sub-link:hover { border-color: var(--border--glass-secondary); background-color: var(--background--glass-secondary); }
  [base] .header_nav_sub-link.is-dc { grid-column-gap: .5rem; grid-row-gap: .5rem; flex-flow: row; }
  [base] .header_nav_sub-link.is-light-grey { grid-column-gap: .25rem; grid-row-gap: .25rem; color: var(--content--secondary); flex-flow: column; display: flex; }
  [base] .header_nav_sub-link.is-light-grey.is-icon { flex-flow: row; justify-content: flex-start; align-items: center; }
### .header_nav_sub-link_desc
  [base] .header_nav_sub-link_desc { color: var(--content--tertiary); font-size: .75rem; font-weight: 400; }
### .header_nav_sub-text-wrap
  [base] .header_nav_sub-text-wrap { grid-column-gap: .25rem; grid-row-gap: .25rem; flex-flow: column; display: flex; }
### .header_wrap
  [base] .header_wrap { justify-content: space-between; align-items: center; padding-top: 1.0625rem; padding-bottom: 1.0625rem; display: flex; position: relative; }
  [@media screen and (max-width: 991px)] .header_wrap { padding-top: .5rem; padding-bottom: .5rem; }
### .mobile-menu
  [base] .mobile-menu { display: none; }
  [@media screen and (max-width: 991px)] .mobile-menu { z-index: -1; background-color: var(--background--glass-deep-blue); -webkit-backdrop-filter: blur(80px); backdrop-filter: blur(80px); display: none; position: fixed; inset: 0%; }
### .mobile-menu_cta-wrap
  [@media screen and (max-width: 991px)] .mobile-menu_cta-wrap { -webkit-backdrop-filter: blur(80px); backdrop-filter: blur(80px); border-top: 1px solid #ffffff14; flex-flow: column; padding: 1rem 2rem; display: flex; }
### .mobile-menu_group
  [@media screen and (max-width: 991px)] .mobile-menu_group { grid-column-gap: 1rem; grid-row-gap: 1rem; flex-flow: column; display: flex; }
### .mobile-menu_link
  [@media screen and (max-width: 991px)] .mobile-menu_link { grid-column-gap: .5rem; grid-row-gap: .5rem; color: #fff; justify-content: flex-start; align-items: center; font-size: 1.125rem; font-weight: 600; line-height: 2rem; text-decoration: none; display: flex; }
### .mobile-menu_links-wrap
  [@media screen and (max-width: 991px)] .mobile-menu_links-wrap { grid-column-gap: .75rem; grid-row-gap: .75rem; color: var(--content--primary); flex-flow: column; display: flex; }
### .mobile-menu_nav
  [@media screen and (max-width: 991px)] .mobile-menu_nav { grid-column-gap: 2rem; grid-row-gap: 2rem; flex-flow: column; flex: 1; padding: 1.5rem 2rem 2rem; display: flex; overflow: auto; }
### .mobile-menu_wrap
  [@media screen and (max-width: 991px)] .mobile-menu_wrap { flex-flow: column; height: 100%; display: flex; }
### .padding-global
  [base] .padding-global { padding-left: 1.5rem; padding-right: 1.5rem; }
  [@media screen and (max-width: 767px)] .padding-global { padding-left: 1.25rem; padding-right: 1.25rem; }
### .text-label-lg-bold
  [base] .text-label-lg-bold { font-size: 1.125rem; font-weight: 600; line-height: 1.5rem; }
### .text-label-tiny-regular
  [base] .text-label-tiny-regular { color: #fff; padding-left: 0; font-size: .75rem; font-weight: 400; line-height: 1.33; }
### .text-mono-xs
  [base] .text-mono-xs { font-size: .875rem; line-height: 1rem; }
### .text-nav-label-tiny
  [base] .text-nav-label-tiny { color: var(--content--tertiary); text-transform: uppercase; font-size: .625rem; font-weight: 600; line-height: .75rem; }
### .text-nav-regular
  [base] .text-nav-regular { font-size: 1rem; font-weight: 400; line-height: 1rem; }
### .w-embed
  [base] .w-embed:before, .w-embed:after { content: " "; grid-area: 1 / 1 / 2 / 2; display: table; }
  [base] .w-embed:after { clear: both; }
### .w-inline-block
  [base] .w-inline-block { max-width: 100%; display: inline-block; }
```

## Text content (verbatim, in document order)

- Data Centers
- Nscale data centers
- Glomfjord
- Norway
- Narvik
- Loughton
- United Kingdom
- Texas
- United States
- Partner-run data centers
- Sines
- Portugal
- Keflavik
- Iceland
- Stavanger
- Oslo
- Blönduós
- Hayes
- North Carolina
- AVAILABLE DATA CENTERS
- West Virginia
- Texas, USA
- All Data Centers
- Services
- Explore our full AI stack
- All Services
- AI services
- Inference Endpoints
- Run models via API
- Prompt Workbench
- Test and iterate prompts
- Fine-tuning
- Adapt models to your data
- Platform Services
- Managed Slurm
- Distributed model training
- Kubernetes service
- Run containerised workloads
- Instances
- Provision virtual machines
- INFRASTRUCTURE SERVICES
- Compute
- On-demand GPU &amp; CPU
- Networking
- Connect &amp; secure resources
- Storage
- Store and access data
- Fleet OPERATIONS
- Control Center
- Manage your environment
- Observability
- Monitor systems and jobs
- Radar API
- Track usage and events
- Use our services on demand
- Start Building
- Company
- About Nscale
- Careers
- Resources
- Newsroom
- Blog
- Docs
- Media kit
- Contact
- Login
- DATA CENTERS
- SERVICES
- AI Services
- Infrastructure Services
- Fleet Operations
- COMPANY
- About
- Media Kit
