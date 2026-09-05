import { CTA, MEDIA } from "@/components/sites/daita/shared/brand";
import { ArrowRightIcon } from "@/components/sites/daita/shared/icons";
import { Container } from "@/components/sites/daita/shared/layout";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";

/**
 * `.section` > `.section_padding` — `data-wf--section_padding--variant="large"`.
 * The measured section is 428px tall (120 + 188 content + 120), so this variant
 * resolves to the base `.section_padding` height of 7.5rem, 5.5rem at <=767px.
 */
function SectionPadding() {
  return <div className="h-[5.5rem] md:h-[7.5rem]" />;
}

/** The closing call-to-action directly above the footer. */
export function CtaSection() {
  return (
    <section className="relative isolate">
      <SectionPadding />

      <Container>
        {/* .section_cta */}
        <div className="flex max-w-[45rem] flex-col items-stretch justify-start gap-10 pb-10 md:items-start md:pb-0">
          {/* .text-heading-h2 / .sm-text-heading-h2-mobile */}
          <h2 className="text-ns-content-primary text-[2.5rem] leading-[3rem] font-medium md:text-[3.5rem] md:leading-[3.625rem]">
            Stop paying the coordination tax.
          </h2>

          {/* Body copy — the section's column gap carries the spacing. */}
          <p className="text-ns-content-secondary text-[1rem] leading-[1.5rem]">
            Your merchandisers should be making decisions, not chasing status.
            Send us one live order. We’ll run DAITA against it for a week and
            show you where the updates stop.
          </p>

          <a href={CTA.href} className="inline-block max-w-full">
            {/* .button — solid variant: white ground, ink label, DM Mono */}
            <div
              data-btn-hover="True"
              className="bg-ns-bg-inverse text-ns-content-inverse flex items-center justify-center gap-1 rounded-[4px] px-4 py-1.5 text-center font-mono text-[1rem] leading-[1.25rem] tracking-[0.02em] transition-all duration-200 hover:opacity-80"
            >
              <span>{CTA.label}</span>
              <div>
                {/* .button_icon */}
                <div className="flex w-4 items-center justify-center transition-all duration-200">
                  <ArrowRightIcon />
                </div>
              </div>
            </div>
          </a>

          {/* .text-label-xs-regular .text-color-tertiary — small print under the button. */}
          <p className="text-ns-content-tertiary text-[0.75rem] leading-[1rem]">
            Your data stays in your systems.
          </p>
        </div>
      </Container>

      <SectionPadding />

      {/* .section_lines */}
      <SectionLines />

      {/*
        No darkening is applied here by design: both backdrops are the original
        pre-darkened `.avif` artwork, which carries its own tone. No scrim, overlay
        or tint has ever existed on this section to inherit.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element -- mirrors the source's
          two-<img> desktop/mobile swap. */}
      <img
        src={MEDIA.ctaBackgroundDesktop}
        alt=""
        width={1440}
        height={480}
        loading="lazy"
        className="absolute inset-0 -z-20 hidden h-full w-full object-cover md:inline-block"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- see above. */}
      <img
        src={MEDIA.ctaBackgroundMobile}
        alt=""
        width={1500}
        height={1920}
        loading="lazy"
        className="absolute inset-0 -z-20 inline-block h-full w-full object-cover md:hidden"
      />
    </section>
  );
}
