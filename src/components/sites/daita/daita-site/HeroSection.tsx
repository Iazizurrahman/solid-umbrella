/* eslint-disable @next/next/no-img-element -- The `"image"` hero variant drops a still
   into the former video box verbatim (same 880px square, same blend wrapper, same
   object-cover); next/image's wrapper element would fight that fixed layout. */
import { Container } from "@/components/sites/daita/shared/layout";
import { ArrowRightIcon } from "@/components/sites/daita/shared/icons";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";
import {
  CTA,
  MEDIA,
  SECONDARY_CTA,
} from "@/components/sites/daita/shared/brand";

/** `.button` target — label plus destination. */
export interface HeroCta {
  label: string;
  href: string;
}

/** The 880px blended box's payload: a looping film or a single still. */
export interface HeroMedia {
  /** The still for the `"image"` variant; the MP4 fallback source for `"video"`. */
  src: string;
  /**
   * Video only — the VP9 build, emitted as the FIRST `<source>` so Chrome and Firefox
   * take the 22MB WebM and only Safari falls through to the 65MB HEVC `src`.
   */
  webm?: string;
  /** Image variant only; decorative by default, matching the video's aria posture. */
  alt?: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: HeroCta;
  /** `null` renders no secondary button; omitted falls back to the homepage default. */
  secondaryCta: HeroCta | null;
  variant: "video" | "image";
  media: HeroMedia;
}

/** Homepage hero copy and media, unchanged from the rebrand build. */
export const HOMEPAGE_HERO: HeroContent = {
  eyebrow: "AI Textile Supply Chain",
  title: "Coordinator",
  subtitle: "From purchase order to delivery, automated.",
  primaryCta: CTA,
  secondaryCta: SECONDARY_CTA,
  variant: "video",
  media: {
    /* The original two-codec hero film: VP9 for Chrome/Firefox, HEVC for Safari.
       No poster — the source markup carried none. */
    webm: MEDIA.heroVideoWebm,
    src: MEDIA.heroVideoMp4,
  },
};

export interface HeroSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: HeroCta;
  /** Pass `null` to drop the secondary button entirely. */
  secondaryCta?: HeroCta | null;
  /** `"image"` swaps the <video> for an <img> in the identical box. */
  variant?: "video" | "image";
  media?: HeroMedia;
}

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
 *
 * Content is fully overridable per route; every prop defaults to the homepage
 * value, so calling `<HeroSection />` renders exactly what it always did.
 */
export function HeroSection({
  eyebrow = HOMEPAGE_HERO.eyebrow,
  title = HOMEPAGE_HERO.title,
  subtitle = HOMEPAGE_HERO.subtitle,
  primaryCta = HOMEPAGE_HERO.primaryCta,
  secondaryCta = HOMEPAGE_HERO.secondaryCta,
  variant = HOMEPAGE_HERO.variant,
  media = HOMEPAGE_HERO.media,
}: HeroSectionProps = {}) {
  return (
    <div className="relative isolate flex items-stretch justify-start overflow-hidden">
      {/* .section_color — data-wf--section_color--variant="gradient" */}
      <div
        aria-hidden="true"
        data-brand-gradient=""
        className="absolute inset-0 -z-30 h-full w-full bg-[linear-gradient(45deg,#0f41f3_16%,#289dd0)]"
      />

      {/* .index-hero_video */}
      <div className="absolute right-0 bottom-0 -z-10 flex aspect-square w-[880px] items-end justify-end max-md:w-[420px] max-[479px]:w-[320px]">
        {/* Must fill the 880px box: without an explicit size this flex wrapper is
            auto-sized, so the video's h-full/w-full collapse to the intrinsic 300x150. */}
        <div className="isolate flex h-full w-full transform-gpu mix-blend-luminosity will-change-transform">
          {variant === "image" ? (
            /* Same box, same blend, same object-cover — a still instead of the film. */
            <img
              src={media.src}
              alt={media.alt ?? ""}
              className="h-full w-full object-cover"
            />
          ) : (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            >
              {/* WebM first: the browser takes the first source it can play, so
                  Chrome/Firefox get the 22MB VP9 build and only Safari falls
                  through to the 65MB HEVC one. Do not reorder these. */}
              {media.webm ? (
                <source src={media.webm} type="video/webm" />
              ) : null}
              <source src={media.src} type="video/mp4" />
            </video>
          )}
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
                    {/* Eyebrow — `.text-nav-label-tiny`: 10px/12px, 600, uppercase,
                        --content--tertiary. Same treatment as the header dropdown
                        and mobile-menu group labels; the column gap does the spacing. */}
                    <p className="text-[0.625rem] leading-3 font-semibold text-ns-content-tertiary uppercase">
                      {eyebrow}
                    </p>
                    <h1 className="text-[4.5rem] leading-[4.5rem] font-medium tracking-[-0.03em] text-ns-content-primary max-md:text-[2.5rem] max-md:leading-[2.5rem]">
                      {title}
                    </h1>
                    {/* .hero-content_desc */}
                    <div className="max-w-[25rem] text-ns-content-secondary max-md:max-w-none">
                      <p className="text-base leading-6">{subtitle}</p>
                    </div>
                  </div>

                  {/* .hero-content_buttons */}
                  <div className="flex items-center justify-start gap-6 max-md:flex-col max-md:items-stretch">
                    <a href={primaryCta.href} className="inline-block max-w-full">
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
                        <span>{primaryCta.label}</span>
                        <div>
                          {/* .button_icon */}
                          <div className="flex w-4 items-center justify-center transition-all duration-200">
                            <ArrowRightIcon />
                          </div>
                        </div>
                      </div>
                    </a>

                    {secondaryCta ? (
                      <a
                        href={secondaryCta.href}
                        className="inline-block max-w-full"
                      >
                        {/*
                          `.button` ghost variant, verbatim from StackButton in
                          PlatformStackMobileSection — no new variant introduced.
                        */}
                        <div
                          data-btn-hover="True"
                          className="flex items-center justify-center gap-1 rounded-none bg-transparent p-0 text-center font-mono text-[1rem] leading-[1.25rem] tracking-[0.02em] text-ns-content-primary transition-all duration-200 hover:opacity-80"
                        >
                          <span>{secondaryCta.label}</span>
                          <div>
                            {/* .button_icon — 1rem wide */}
                            <div className="flex w-4 items-center justify-center transition-all duration-200">
                              <ArrowRightIcon className="block w-full" />
                            </div>
                          </div>
                        </div>
                      </a>
                    ) : null}
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
