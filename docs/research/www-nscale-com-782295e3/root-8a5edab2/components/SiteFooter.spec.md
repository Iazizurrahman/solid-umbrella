# SiteFooter Specification

## Overview
- **Target file:** `src/components/sites/www-nscale-com-782295e3/root-8a5edab2/SiteFooter.tsx`
- **Screenshots:**
  - `docs/design-references/www-nscale-com-782295e3/root-8a5edab2/desktop-10-cta-footer.jpg` (top half)
  - `docs/design-references/www-nscale-com-782295e3/root-8a5edab2/desktop-11-footer-bottom.jpg` (bottom half)
- **Interaction model:** static, plus a newsletter email input
- **Measured box:** 1186px tall, starts at page Y 7874, background `#0c0c0e`

## Layout, top to bottom
1. **Left column:** the Nscale wordmark (use `NscaleLogoLarge` from the shared icons module),
   then "Stay up to date with Nscale", a line of small print with inline "Terms" and
   "Privacy Policy" links, then an email input with a circular arrow submit button, then three
   social icons (`LinkedInIcon`, `XIcon`, `YouTubeIcon` — all already in the shared module).
2. **Right side:** link columns. The first row is "Data Centers" and "Services"; the second row
   is "Company", "Resources" and "Solutions". Several columns are split into labelled sub-groups
   with a muted heading — "Nscale Data Centers" / "Partner-run Data Centers" /
   "Available Data Centers" under Data Centers, and "AI Services" / "Infrastructure Services" /
   "Platform Services" / "Fleet Operations" under Services. Column headings sit above a
   horizontal rule; the sub-group labels are smaller and muted, with no rule.
3. **A very large NSCALE wordmark** spanning the full content width. Use `NscaleWordmark` from
   the shared icons module — it is the 1232x186 viewBox one, extracted for exactly this.
4. **Bottom bar:** "©2026 Nscale Limited. All rights reserved." on the left; "Privacy Policy",
   "Terms & Conditions" and "Transparency & Human Rights" on the right. All in DM Mono.

Use the `FooterColumn` / `FooterLink` interfaces from `@/types/nscale` and drive the link columns
from a typed data structure rather than repeating JSX per column.

## The newsletter form
The real site mounts a HubSpot embedded form here
(`hbspt.forms.create({ portalId: "144080347", formId: "37a86904-1452-41d1-aa55-282933c3bdea" })`).

Do NOT embed HubSpot and do NOT post anywhere. Build the visual input exactly as the source shows
— placeholder "name@example.com", the circular arrow button — and make it inert: a `<form>` with
`onSubmit` prevented, or no form action at all. This is a visual clone, not a working signup.
If that needs a client component, mark ONLY this small piece `"use client"`, or keep the whole
footer static and give the button `type="button"`.

## States and behaviors
- Link hover: use ONLY the `:hover` rules in the CSS block below. Do not invent an underline or
  colour shift that is not in the source.
- No scroll animation.

## Content
Use the text section below verbatim, including the "©2026" year and the ampersands.

## Source DOM (verbatim from the live page)

```html
<div class="footer">
  <div class="padding-global">
    <div class="container-large">
      <div class="footer_main-wrap">
        <div class="footer_form-col">
          <div class="footer_logo w-embed">
            <svg width="100%" viewBox="0 0 256 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_2174_18114)">
                <path d="…(see icons.tsx)" fill="white"/>
                <path d="…(see icons.tsx)" fill="white"/>
                <path d="…(see icons.tsx)" fill="white"/>
                <path d="…(see icons.tsx)" fill="white"/>
                <path d="M200.543 28.7061C197.384 28.7061 194.801 26.124 194.801 22.9656V0H200.543V22.9656H223.518V28.7061H200.543Z" fill="white"/>
                <path d="…(see icons.tsx)" fill="white"/>
                <path d="…(see icons.tsx)" fill="white"/>
                <path opacity="0.6" d="…(see icons.tsx)" fill="white"/>
                <path opacity="0.4" d="…(see icons.tsx)" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_2174_18114">
                  <rect width="256" height="28.8451" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="footer_form-content">
            <div class="footer_form-wrap">
              <div class="footer_form_title-wrap">
                <h2 class="text-heading-h5">Stay up to date with Nscale</h2>
                <p class="text-label-xs-regular">By submitting you agree to receive Nscale emails &amp; accept our <a href="/policies/terms-conditions">Terms</a> &amp; <a href="/policies/privacy-policy">Privacy Policy</a>.</p>
              </div>
              <div class="w-embed w-script">
                <script charset="utf-8" type="text/javascript" src="//js-eu1.hsforms.net/forms/embed/v2.js">
                </script>
                <script>
                  hbspt.forms.create({
                  portalId: "144080347",
                  formId: "37a86904-1452-41d1-aa55-282933c3bdea",
                  region: "eu1"
                  });
                </script>
              </div>
              <div class="footer_form_logos-wrap">
                <a href="https://www.linkedin.com/company/nscale-cloud/?originalSubdomain=uk" target="_blank" class="w-inline-block">
                  <div class="footer_social-icon w-embed">
                    <svg height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_2334_16369)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="…(see icons.tsx)" fill="currentColor"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_2334_16369">
                          <rect width="20" height="20" fill="currentColor"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </a>
                <a href="https://x.com/nscale" target="_blank" class="w-inline-block">
                  <div class="footer_social-icon w-embed">
                    <svg height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_2334_16370)">
                        <path d="…(see icons.tsx)" fill="currentColor"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_2334_16370">
                          <rect width="20" height="20" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </a>
                <a href="https://www.youtube.com/@NscaleCloud" target="_blank" class="w-inline-block">
                  <div class="footer_social-icon w-embed">
                    <svg height="100%" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="…(see icons.tsx)" fill="currentColor"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <nav class="footer_nav-col">
          <div class="footer_nav_group">
            <div class="footer_nav_group-title">
              <h3 class="text-label-md-bold">Data Centers</h3>
            </div>
            <div class="footer_nav_lists-wrap">
              <div class="footer_nav_lists-col">
                <ul role="list" class="footer_nav_list">
                  <li>
                    <h4 class="text-label-xs-regular text-color-tertiary">Nscale Data Centers</h4>
                  </li>
                  <li>
                    <a href="/ai-infrastructure#dc-narvik" class="footer_nav_link">Narvik</a>
                  </li>
                  <li>
                    <a href="/ai-infrastructure#dc-glomfjord" class="footer_nav_link">Glomfjord</a>
                  </li>
                  <li>
                    <a href="/ai-infrastructure#dc-loughton" class="footer_nav_link">Loughton</a>
                  </li>
                  <li>
                    <a href="/ai-infrastructure#dc-texas" class="footer_nav_link">Texas</a>
                  </li>
                </ul>
                <ul role="list" class="footer_nav_list">
                  <li>
                    <h4 class="text-label-xs-regular text-color-tertiary">Available Data Centers</h4>
                  </li>
                  <li>
                    <a href="/ai-infrastructure#dc-monarch" class="footer_nav_link">West Virginia</a>
                  </li>
                </ul>
              </div>
              <ul role="list" class="footer_nav_list">
                <li>
                  <h4 class="text-label-xs-regular text-color-tertiary">Partner-run Data Centers</h4>
                </li>
                <li>
                  <a href="/ai-infrastructure#dc-sines" class="footer_nav_link">Sines</a>
                </li>
                <li>
                  <a href="/ai-infrastructure#dc-keflavik" class="footer_nav_link">Keflavik</a>
                </li>
                <li>
                  <a href="/ai-infrastructure#partner-centers" class="footer_nav_link">Stavanger</a>
                </li>
                <li>
                  <a href="/ai-infrastructure#partner-centers" class="footer_nav_link">Oslo</a>
                </li>
                <li>
                  <a href="/ai-infrastructure#partner-centers" class="footer_nav_link">Blönduós</a>
                </li>
                <li>
                  <a href="/ai-infrastructure#partner-centers" class="footer_nav_link">Hayes</a>
                </li>
                <li>
                  <a href="/ai-infrastructure#partner-centers" class="footer_nav_link">North Carolina</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="footer_nav_group">
            <div class="footer_nav_group-title">
              <h3 class="text-label-md-bold">Services</h3>
            </div>
            <div class="footer_nav_lists-wrap">
              <div class="footer_nav_lists-col">
                <ul role="list" class="footer_nav_list">
                  <li>
                    <h4 class="text-label-xs-regular text-color-tertiary">AI Services</h4>
                  </li>
                  <li>
                    <a href="/services/ai-services#inference-endpoints" class="footer_nav_link">Inference Endpoints</a>
                  </li>
                  <li>
                    <a href="/services/ai-services#prompt-workbench" class="footer_nav_link">Prompt Workbench</a>
                  </li>
                  <li>
                    <a href="/services/ai-services#fine-tuning" class="footer_nav_link">Fine-Tuning</a>
                  </li>
                </ul>
                <ul role="list" class="footer_nav_list">
                  <li>
                    <h4 class="text-label-xs-regular text-color-tertiary">Platform Services</h4>
                  </li>
                  <li>
                    <a href="/services/platform-services#managed-slurm" class="footer_nav_link">Managed Slurm</a>
                  </li>
                  <li>
                    <a href="/services/platform-services#scale-kubernetes-service" class="footer_nav_link">Kubernetes Service</a>
                  </li>
                  <li>
                    <a href="/services/platform-services#instances" class="footer_nav_link">Instances</a>
                  </li>
                </ul>
              </div>
              <div class="footer_nav_lists-col">
                <ul role="list" class="footer_nav_list">
                  <li>
                    <h4 class="text-label-xs-regular text-color-tertiary">Infrastructure Services</h4>
                  </li>
                  <li>
                    <a href="/services/infrastructure-services#compute" class="footer_nav_link">Compute</a>
                  </li>
                  <li>
                    <a href="/services/infrastructure-services#networking" class="footer_nav_link">Networking</a>
                  </li>
                  <li>
                    <a href="/services/infrastructure-services#storage" class="footer_nav_link">Storage</a>
                  </li>
                </ul>
                <ul role="list" class="footer_nav_list">
                  <li>
                    <h4 class="text-label-xs-regular text-color-tertiary">Fleet Operations</h4>
                  </li>
                  <li>
                    <a href="/services/fleet-operations#control-center" class="footer_nav_link">Control Center</a>
                  </li>
                  <li>
                    <a href="/services/fleet-operations#observability" class="footer_nav_link">Observability</a>
                  </li>
                  <li>
                    <a href="/services/fleet-operations#radar-api" class="footer_nav_link">Radar API</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer_nav_group-wrap">
            <div class="footer_nav_group hide-desktop">
              <div class="footer_nav_group-title">
                <h3 class="text-label-md-bold">Solutions</h3>
              </div>
              <ul role="list" class="footer_nav_list">
                <li>
                  <a href="/industries/telco" class="footer_nav_link">Telco</a>
                </li>
                <li>
                  <a href="/industries/ai-native" class="footer_nav_link">AI Native</a>
                </li>
              </ul>
            </div>
            <div id="w-node-_6c7eb05c-610c-4017-2438-903959543e95-59543e04" class="footer_nav_group">
              <div class="footer_nav_group-title">
                <h3 class="text-label-md-bold">Company</h3>
              </div>
              <ul role="list" class="footer_nav_list">
                <li>
                  <a href="/about" class="footer_nav_link">About Nscale</a>
                </li>
                <li>
                  <a href="/contact" class="footer_nav_link">Contact</a>
                </li>
                <li>
                  <a href="/careers" class="footer_nav_link">Careers</a>
                </li>
              </ul>
            </div>
            <div class="footer_nav_group">
              <div class="footer_nav_group-title">
                <h3 class="text-label-md-bold">Resources</h3>
              </div>
              <ul role="list" class="footer_nav_list">
                <li>
                  <a href="/newsroom" class="footer_nav_link">Newsroom</a>
                </li>
                <li>
                  <a href="/blog" class="footer_nav_link">Blog</a>
                </li>
                <li>
                  <a href="https://docs.nscale.com/docs/getting-started/overview?_gl=1*1k74vzm*_gcl_au*MjA0OTA3MjQxNy4xNzczMjU1MzIz*FPAU*MjA0OTA3MjQxNy4xNzczMjU1MzIzhttps://docs.nscale.com/docs/getting-started/overview?_gl=1*1k74vzm*_gcl_au*MjA0OTA3MjQxNy4xNzczMjU1MzIz*FPAU*MjA0OTA3MjQxNy4xNzczMjU1MzIz" target="_blank" class="footer_nav_link">Docs</a>
                </li>
                <li>
                  <a href="/media-kit" class="footer_nav_link">Media Kit</a>
                </li>
                <li>
                  <a href="/speakup" class="footer_nav_link">SpeakUp</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="footer_nav_group-wrap hide-mobile">
            <div class="footer_nav_group">
              <div class="footer_nav_group-title">
                <h3 class="text-label-md-bold">Solutions</h3>
              </div>
              <ul role="list" class="footer_nav_list">
                <li>
                  <a href="/industries/telco" class="footer_nav_link">Telco</a>
                </li>
                <li>
                  <a href="/industries/ai-native" class="footer_nav_link">AI Native</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
  <div class="padding-global">
    <div class="container-large">
      <div class="footer_logo-large w-embed">
        <svg width="100%" viewBox="0 0 1232 186" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_5422_9281)">
            <path d="…(see icons.tsx)" fill="white"/>
            <path d="…(see icons.tsx)" fill="white"/>
            <path d="…(see icons.tsx)" fill="white"/>
            <path d="…(see icons.tsx)" fill="white"/>
            <path d="M874.729 185.104C854.359 185.104 837.706 168.454 837.706 148.088V0H874.729V148.088H1022.84V185.104H874.729Z" fill="white"/>
            <path d="…(see icons.tsx)" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_5422_9281">
              <rect width="1232" height="186" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  </div>
  <div class="footer_divider">
  </div>
  <div class="padding-global">
    <div class="container-large">
      <div class="footer_bottom_wrap">
        <div class="footer_bottom_copyright-text">©2026 Nscale Limited. All rights reserved.</div>
        <div class="footer_bottom_links-wrap">
          <a href="/policies/privacy-policy" class="footer_bottom_link">Privacy Policy</a>
          <a href="/policies/terms-conditions" class="footer_bottom_link">Terms &amp; Conditions</a>
          <a href="/policies/transparency-and-human-rights" class="footer_bottom_link">Transparency &amp; Human Rights</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Exact CSS for every class in this section

Rules are copied from `nscale-v4.webflow.shared.04a529bd2.css`. `[base]` has no media
query; other tags show the exact query the rule sits inside. These are source values, not
estimates — use them literally.

```css
### .container-large
  [base] .container-large { width: 100%; max-width: 77rem; margin-left: auto; margin-right: auto; }
### .footer
  [base] .footer { border-top: 1px solid var(--border--primary); background-color: var(--background--primary); --background--primary: #0c0c0e; --content--secondary: #ffffffe6; --content--primary: white; --content--link: #0f98f3; --background--inverse: white; --content--inverse: #0c0c0e; --border--glass-primary: #ffffff1a; --background--glass-primary: #ffffff1a; --border--secondary: #ffffff1a; --background--highlight: #0f41f3; --background--glass-secondary: #ffffff0d; --background--secondary: #161618; --content--highlight: #0f41f3; --border--primary: #fff3; --background--glass-deep-blue: #0e0e17cc; --content--tertiary: #ffffff80; --border--glass-secondary: #ffffff0d; --background--glass-dark: #1a1a2acc; --border--hover: #fff6; --background--glass-blue: #00013bcc; --background--glass-green: #0f1714cc; --background--glass-purple: #0b0313cc; --background--glass-orange: #100902cc; }
### .footer_bottom_copyright-text
  [base] .footer_bottom_copyright-text { color: var(--content--tertiary); letter-spacing: .02em; font-family: Dmmono, Arial, sans-serif; font-size: .75rem; line-height: 1.25rem; }
### .footer_bottom_link
  [base] .footer_bottom_link { color: var(--content--tertiary); letter-spacing: .02em; font-family: Dmmono, Arial, sans-serif; font-size: .875rem; line-height: 1.25rem; transition: color .2s; }
  [base] .footer_bottom_link:hover { color: var(--content--secondary); }
### .footer_bottom_links-wrap
  [base] .footer_bottom_links-wrap { grid-column-gap: 2rem; grid-row-gap: 2rem; justify-content: flex-end; align-items: center; display: flex; }
  [@media screen and (max-width: 767px)] .footer_bottom_links-wrap { grid-column-gap: 1rem; grid-row-gap: 1rem; flex-flow: column; }
### .footer_bottom_wrap
  [base] .footer_bottom_wrap { grid-column-gap: 2rem; grid-row-gap: 2rem; justify-content: space-between; align-items: center; padding-top: 2.5rem; padding-bottom: 2.5rem; display: flex; }
  [@media screen and (max-width: 767px)] .footer_bottom_wrap { flex-flow: column; padding-top: 2rem; }
### .footer_divider
  [base] .footer_divider { background-color: var(--border--secondary); width: 100%; height: 1px; }
### .footer_form-col
  [base] .footer_form-col { grid-column-gap: 4.5rem; grid-row-gap: 4.5rem; flex-flow: column; display: flex; }
### .footer_form-content
  [base] .footer_form-content { grid-column-gap: 2rem; grid-row-gap: 2rem; flex-flow: column; display: flex; }
### .footer_form-wrap
  [base] .footer_form-wrap { grid-column-gap: 1rem; grid-row-gap: 1rem; flex-flow: column; display: flex; }
### .footer_form_logos-wrap
  [base] .footer_form_logos-wrap { grid-column-gap: 1rem; grid-row-gap: 1rem; justify-content: flex-start; align-items: center; display: flex; }
### .footer_form_title-wrap
  [base] .footer_form_title-wrap { grid-column-gap: .25rem; grid-row-gap: .25rem; flex-flow: column; display: flex; }
### .footer_logo
  [base] .footer_logo { justify-content: center; align-items: center; width: 100%; max-width: 256px; display: flex; }
  [@media screen and (max-width: 991px)] .footer_logo { display: none; }
### .footer_logo-large
  [base] .footer_logo-large { justify-content: center; align-items: center; width: 100%; margin-bottom: 2.5rem; display: flex; }
  [@media screen and (max-width: 767px)] .footer_logo-large { margin-bottom: 2rem; }
### .footer_main-wrap
  [base] .footer_main-wrap { grid-column-gap: 4.5rem; grid-row-gap: 4.5rem; justify-content: space-between; align-items: flex-start; padding-top: 2.5rem; padding-bottom: 7.5rem; display: flex; }
  [@media screen and (max-width: 991px)] .footer_main-wrap { grid-column-gap: 2.5rem; grid-row-gap: 2.5rem; flex-flow: column; }
  [@media screen and (max-width: 767px)] .footer_main-wrap { padding-bottom: 2.5rem; }
### .footer_nav-col
  [base] .footer_nav-col { grid-column-gap: clamp(1rem, 5vw, 4.5rem); grid-row-gap: clamp(1rem, 5vw, 4.5rem); flex: none; grid-template-rows: auto auto; grid-template-columns: 1fr 1fr; grid-auto-columns: 1fr; padding-top: 2rem; display: grid; }
  [@media screen and (max-width: 991px)] .footer_nav-col { width: 100%; }
  [@media screen and (max-width: 767px)] .footer_nav-col { grid-column-gap: 3rem; grid-row-gap: 3rem; grid-template-columns: 1fr; padding-top: 0; }
### .footer_nav_group
  [base] .footer_nav_group { grid-column-gap: 1.5rem; grid-row-gap: 1.5rem; flex-flow: column; display: flex; }
  [base] .footer_nav_group.hide-desktop { display: none; }
  [@media screen and (max-width: 767px)] .footer_nav_group.hide-desktop { display: flex; }
### .footer_nav_group-title
  [base] .footer_nav_group-title { border-bottom: 1px solid var(--border--primary); padding-bottom: .25rem; }
### .footer_nav_group-wrap
  [base] .footer_nav_group-wrap { grid-column-gap: clamp(1rem, 5vw, 4.5rem); grid-row-gap: clamp(1rem, 5vw, 4.5rem); grid-template-rows: auto; grid-template-columns: 1fr 1fr; grid-auto-columns: 1fr; justify-content: space-between; align-items: flex-start; display: grid; }
  [@media screen and (max-width: 767px)] .footer_nav_group-wrap { grid-column-gap: 3rem; grid-row-gap: 3rem; }
  [@media screen and (max-width: 767px)] .footer_nav_group-wrap.hide-mobile { display: none; }
### .footer_nav_link
  [base] .footer_nav_link { color: var(--content--primary); font-size: .875rem; line-height: 1.25rem; transition: opacity .2s; }
  [base] .footer_nav_link:hover { opacity: .7; }
### .footer_nav_list
  [base] .footer_nav_list { grid-column-gap: 1rem; grid-row-gap: 1rem; flex-flow: column; margin-bottom: 0; padding-left: 0; list-style-type: none; display: flex; }
### .footer_nav_lists-col
  [base] .footer_nav_lists-col { grid-column-gap: 2rem; grid-row-gap: 2rem; flex-flow: column; display: flex; }
### .footer_nav_lists-wrap
  [base] .footer_nav_lists-wrap { grid-column-gap: clamp(1rem, 5vw, 4.5rem); grid-row-gap: clamp(1rem, 5vw, 4.5rem); grid-template-rows: auto; grid-template-columns: 1fr 1fr; grid-auto-columns: 1fr; justify-content: space-between; align-items: flex-start; display: grid; }
  [@media screen and (max-width: 767px)] .footer_nav_lists-wrap { grid-column-gap: 3rem; grid-row-gap: 3rem; }
### .footer_social-icon
  [base] .footer_social-icon { opacity: .75; height: 1.25rem; color: var(--content--secondary); justify-content: center; align-items: center; transition: color .2s; display: flex; }
  [base] .footer_social-icon:hover { color: var(--content--primary); }
  [@media screen and (max-width: 991px)] .footer_social-icon { justify-content: center; align-items: center; display: flex; }
### .padding-global
  [base] .padding-global { padding-left: 1.5rem; padding-right: 1.5rem; }
  [@media screen and (max-width: 767px)] .padding-global { padding-left: 1.25rem; padding-right: 1.25rem; }
### .text-color-tertiary
  [base] .text-color-tertiary { color: var(--content--tertiary); }
### .text-heading-h5
  [base] .text-heading-h5 { font-size: 1.5rem; font-weight: 500; line-height: 2rem; }
  [base] .text-heading-h5.sm-text-heading-h5-mobile:where(.w-variant-9b10d970-4b22-d119-6bb1-ce94eb659ac4) { font-size: 1rem; line-height: 1.25rem; }
### .text-label-md-bold
  [base] .text-label-md-bold { font-size: 1rem; font-weight: 600; line-height: 1.5rem; }
### .text-label-xs-regular
  [base] .text-label-xs-regular { font-size: .75rem; font-weight: 400; line-height: 1rem; }
### .w-embed
  [base] .w-embed:before, .w-embed:after { content: " "; grid-area: 1 / 1 / 2 / 2; display: table; }
  [base] .w-embed:after { clear: both; }
### .w-inline-block
  [base] .w-inline-block { max-width: 100%; display: inline-block; }
```

## Text content (verbatim, in document order)

- Stay up to date with Nscale
- By submitting you agree to receive Nscale emails &amp; accept our
- Terms
- &amp;
- Privacy Policy
- .
- Data Centers
- Nscale Data Centers
- Narvik
- Glomfjord
- Loughton
- Texas
- Available Data Centers
- West Virginia
- Partner-run Data Centers
- Sines
- Keflavik
- Stavanger
- Oslo
- Blönduós
- Hayes
- North Carolina
- Services
- AI Services
- Inference Endpoints
- Prompt Workbench
- Fine-Tuning
- Platform Services
- Managed Slurm
- Kubernetes Service
- Instances
- Infrastructure Services
- Compute
- Networking
- Storage
- Fleet Operations
- Control Center
- Observability
- Radar API
- Solutions
- Telco
- AI Native
- Company
- About Nscale
- Contact
- Careers
- Resources
- Newsroom
- Blog
- Docs
- Media Kit
- SpeakUp
- ©2026 Nscale Limited. All rights reserved.
- Terms &amp; Conditions
- Transparency &amp; Human Rights
