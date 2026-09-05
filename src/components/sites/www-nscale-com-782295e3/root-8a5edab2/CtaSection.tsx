import { ArrowRightIcon } from "@/components/sites/www-nscale-com-782295e3/shared/icons";
import { Container } from "@/components/sites/www-nscale-com-782295e3/shared/layout";
import { SectionLines } from "@/components/sites/www-nscale-com-782295e3/shared/SectionLines";

const IMAGES = "/sites/www-nscale-com-782295e3/root-8a5edab2/images";

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
            Access thousands of GPUs tailored to your needs
          </h2>

          <a href="/contact/sales" className="inline-block max-w-full">
            {/* .button — solid variant: white ground, ink label, DM Mono */}
            <div
              data-btn-hover="True"
              className="bg-ns-bg-inverse text-ns-content-inverse flex items-center justify-center gap-1 rounded-[4px] px-4 py-1.5 text-center font-mono text-[1rem] leading-[1.25rem] tracking-[0.02em] transition-all duration-200 hover:opacity-80"
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
      </Container>

      <SectionPadding />

      {/* .section_lines */}
      <SectionLines />

      {/* eslint-disable-next-line @next/next/no-img-element -- mirrors the source's
          two-<img> desktop/mobile swap; the .avif assets are already optimised. */}
      <img
        src={`${IMAGES}/69ef2ee669eaa4a13d803d32_section_cta-bg.avif`}
        alt=""
        width={1440}
        height={480}
        loading="lazy"
        className="absolute inset-0 -z-20 hidden h-full w-full object-cover md:inline-block"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- see above. */}
      <img
        src={`${IMAGES}/69ef53b54feaaf14e5110977_section_cta-bg-mobile.avif`}
        alt=""
        width={1500}
        height={1920}
        loading="lazy"
        className="absolute inset-0 -z-20 inline-block h-full w-full object-cover md:hidden"
      />
    </section>
  );
}
