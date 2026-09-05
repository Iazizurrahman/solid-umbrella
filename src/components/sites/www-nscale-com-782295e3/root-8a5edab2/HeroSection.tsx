import { Container } from "@/components/sites/www-nscale-com-782295e3/shared/layout";
import { ArrowRightIcon } from "@/components/sites/www-nscale-com-782295e3/shared/icons";
import { SectionLines } from "@/components/sites/www-nscale-com-782295e3/shared/SectionLines";

const VIDEO_BASE = "/sites/www-nscale-com-782295e3/root-8a5edab2/videos";

/**
 * `.index_hero` — full-viewport hero.
 *
 * Layering inside the (isolated) hero stacking context, back to front:
 *   -z-30  `.section_color` gradient variant — linear-gradient(45deg, #0f41f3 16%, #289dd0)
 *   -z-20  `.section_lines` — five 1px dashed vertical rules
 *   -z-10  `.index-hero_video` — 880px square, pinned bottom-right, luminosity blend
 *    auto  copy block
 *
 * The page header is fixed and transparent at scroll 0, so this section starts
 * at page Y 0 and deliberately runs underneath it — no top padding.
 */
export function HeroSection() {
  return (
    <div className="relative isolate flex items-stretch justify-start overflow-hidden">
      {/* .section_color — data-wf--section_color--variant="gradient" */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 h-full w-full bg-[linear-gradient(45deg,#0f41f3_16%,#289dd0)]"
      />

      {/* .index-hero_video */}
      <div className="absolute right-0 bottom-0 -z-10 flex aspect-square w-[880px] items-end justify-end max-md:w-[420px] max-[479px]:w-[320px]">
        {/* Must fill the 880px box: without an explicit size this flex wrapper is
            auto-sized, so the video's h-full/w-full collapse to the intrinsic 300x150. */}
        <div className="isolate flex h-full w-full transform-gpu mix-blend-luminosity will-change-transform">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          >
            {/* WebM first: 22MB VP9 for Chrome/Firefox ahead of the 65MB HEVC build. */}
            <source
              src={`${VIDEO_BASE}/nscale-homepage-animation-web-v4-vp9-chrome.webm`}
              type="video/webm"
            />
            <source
              src={`${VIDEO_BASE}/nscale-homepage-animation-web-v4-hevc-safari.mp4`}
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      {/* .section .section-full-height
          padding-top is the 73px header height — the source sets it so the centred
          content clears the fixed header. Measured on the live page: with it, the h1
          lands at y=309 in a 945px viewport; without it, at y=273. Do not drop it.
          min-height is 100vh (not svh) to match the source's own declaration. */}
      <section className="relative flex min-h-[100vh] w-full flex-col justify-center pt-[73px]">
        {/* .section_padding — variant "none" */}
        <div className="h-0" />

        <Container>
          <div>
            {/* .section_hero-split */}
            <div className="flex items-center justify-between gap-12 max-md:flex-col">
              {/* .hero-split_content */}
              <div className="flex w-full flex-col gap-10">
                {/* .hero-content */}
                <div className="flex max-w-[37.75rem] flex-col gap-8 max-md:max-w-none max-md:gap-6">
                  {/* .hero-content_copy */}
                  <div className="flex max-w-[37.75rem] flex-col gap-6">
                    <h1 className="text-[4.5rem] leading-[4.5rem] font-medium tracking-[-0.03em] text-ns-content-primary max-md:text-[2.5rem] max-md:leading-[2.5rem]">
                      The engine of superintelligence
                    </h1>
                    {/* .hero-content_desc */}
                    <div className="max-w-[25rem] text-ns-content-secondary max-md:max-w-none">
                      <p className="text-base leading-6">
                        Full-stack AI infrastructure powering the world&#8217;s
                        most powerful systems, from ground to cloud.
                      </p>
                    </div>
                  </div>

                  {/* .hero-content_buttons */}
                  <div className="flex items-center justify-start gap-6 max-md:flex-col max-md:items-stretch">
                    <a href="/contact/sales" className="inline-block max-w-full">
                      {/*
                        TODO: swap for the shared Button component once it lands.
                        `.button` (solid variant) verbatim: gap .25rem,
                        bg var(--background--inverse), color var(--content--inverse),
                        letter-spacing .02em, radius 4px, padding .375rem 1rem,
                        DM Mono 1rem/1.25rem, transition all .2s, hover opacity .8.
                        Carries the site-wide `data-btn-hover` treatment.
                      */}
                      <div
                        data-btn-hover="True"
                        className="flex items-center justify-center gap-1 rounded-[4px] bg-ns-bg-inverse px-4 py-1.5 text-center font-mono text-base leading-5 tracking-[0.02em] text-ns-content-inverse transition-all duration-200 hover:opacity-80"
                      >
                        <span>Reserve GPUs</span>
                        <div>
                          {/* .button_icon */}
                          <div className="flex w-4 items-center justify-center transition-all duration-200">
                            <ArrowRightIcon />
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* .section_padding — default (large) */}
        <div className="h-[7.5rem] max-md:h-[5.5rem]" />

        {/*
          .section_lines — the shared overlay is `z-index: -1` against its own
          containing block, so it is nested in an `absolute inset-0 -z-20` shell
          that pins it to the hero's -20 layer: still above the -30 gradient and
          still below the -10 video, exactly as before.
        */}
        <div aria-hidden="true" className="absolute inset-0 -z-20">
          <SectionLines />
        </div>
      </section>
    </div>
  );
}
