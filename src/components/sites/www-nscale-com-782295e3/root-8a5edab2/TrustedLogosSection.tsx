/* eslint-disable @next/next/no-img-element -- Source markup uses plain <img>; these are
   static SVGs, which next/image refuses to serve without `dangerouslyAllowSVG`. */
import { Container } from "@/components/sites/www-nscale-com-782295e3/shared/layout";
import { SectionLines } from "@/components/sites/www-nscale-com-782295e3/shared/SectionLines";
import type { PartnerLogo } from "@/types/nscale";

const IMAGE_BASE = "/sites/www-nscale-com-782295e3/root-8a5edab2/images";

/**
 * Nine partner logos in source order. Every asset is authored at 40px tall
 * (`.partner-logos_logo` height: 2.5rem) with a different intrinsic width, which is
 * what gives the row its optical balance — so the widths are carried through verbatim.
 */
const PARTNER_LOGOS: readonly PartnerLogo[] = [
  { name: "ddn", src: `${IMAGE_BASE}/6a0c4727a9e4eb44ebefa4d3_ddn.svg`, width: 73, height: 40 },
  {
    name: "Moonshot AI",
    src: `${IMAGE_BASE}/6a0c471f67a961d097366e4d_moonshot.svg`,
    width: 154,
    height: 40,
  },
  {
    name: "NVIDIA",
    src: `${IMAGE_BASE}/6a0c472759dd1ad69553be79_nvidia.svg`,
    width: 122,
    height: 40,
  },
  { name: "VAST", src: `${IMAGE_BASE}/6a0c4727cc7a017e9a62e6b9_vast.svg`, width: 97, height: 40 },
  { name: "DELL", src: `${IMAGE_BASE}/6a0c4727f2909d6fb1d917c9_dell.svg`, width: 74, height: 40 },
  { name: "NOKIA", src: `${IMAGE_BASE}/6a0c4727782fbf994e6990bd_nokia.svg`, width: 101, height: 40 },
  {
    name: "OpenAI",
    src: `${IMAGE_BASE}/6a0c471f67a961d097366e4a_open-ai.svg`,
    width: 96,
    height: 40,
  },
  { name: "AKER", src: `${IMAGE_BASE}/6a0c4727f8b62fb997ec6f6b_aker.svg`, width: 48, height: 40 },
  {
    name: "Lightning AI",
    src: `${IMAGE_BASE}/6a0c471ff8b62fb997ec6e55_lightning.svg`,
    width: 188,
    height: 40,
  },
];

/** `.section_padding` (base 7.5rem, 5.5rem at <=767px) — a real spacer div, not padding. */
function SectionPadding() {
  return <div aria-hidden="true" className="h-[7.5rem] max-[767px]:h-[5.5rem]" />;
}

/**
 * `.section` + `.section_partner-logos` — the full-bleed blue band carrying the headline
 * and the nine partner logos.
 *
 * The gradient lives on the inner `.section_color` layer (z-index -3, inset 0), never on
 * the `<section>` itself, so the section's own box stays transparent and the decorative
 * `.section_lines` grid can sit between it and the content.
 */
export function TrustedLogosSection() {
  return (
    <section className="relative isolate">
      <SectionPadding />

      <Container>
        <div>
          {/* .section_partner-logos */}
          <div className="mx-auto flex max-w-[958px] flex-col items-center justify-start gap-6 text-center max-[767px]:gap-10">
            {/* .text-heading-h5-mobile */}
            <h2 className="text-[1.5rem] font-medium leading-[2rem] text-ns-content-primary">
              Trusted by leading AI labs and enterprises to run critical workloads
            </h2>

            {/* .partner-logos_list-wrap — flex-wrap + centre justification produces the 7 + 2 split */}
            <div className="flex w-full max-w-[60rem] flex-wrap items-center justify-center gap-10">
              {PARTNER_LOGOS.map((logo) => (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt=""
                  loading="lazy"
                  width={logo.width}
                  height={logo.height}
                  className="h-10 w-auto"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>

      <SectionPadding />

      {/* .section_lines */}
      <SectionLines />

      {/* .section_color, variant "gradient" */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[3] h-full w-full bg-[linear-gradient(45deg,#0f41f3_16%,#289dd0)]"
      />
    </section>
  );
}
