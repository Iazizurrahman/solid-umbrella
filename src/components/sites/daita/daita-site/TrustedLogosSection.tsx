import { Container } from "@/components/sites/daita/shared/layout";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";

/**
 * SUB_NOTE: Confirm which integrations are actually built before this ships — a name
 * here reads as a working connector.
 *
 * SUB_NOTE: Once written permission lands, swap to the client wall under "Trusted by
 * garment exporters and buying offices across South India".
 */

interface IntegrationRow {
  /** `.text-nav-label-tiny` row label. */
  label: string;
  items: readonly string[];
}

/**
 * The nine source partner logo SVGs went with the rest of the pre-rebrand assets, and DAITA
 * holds no client logos it has written permission to show — so the slot keeps its job
 * (reassurance that nothing has to change) with integrations rendered as text.
 */
const INTEGRATION_ROWS: readonly IntegrationRow[] = [
  {
    label: "Messaging",
    items: [
      "WhatsApp Business",
      "voice notes",
      "Gmail",
      "Outlook",
      "IMAP",
      "SMS",
      "photos",
      "Tamil",
      "Hindi",
      "English",
    ],
  },
  {
    label: "ERP & systems",
    items: [
      "SAP",
      "Oracle",
      "Dynamics 365",
      "NetSuite",
      "Odoo",
      "Tally",
      "Zoho",
      "in-house ERP",
      "FastReact",
    ],
  },
  {
    label: "Documents",
    items: [
      "PO PDF",
      "cut report",
      "packing list",
      "invoice",
      "Excel",
      "CSV",
      "floor photos",
      "scans",
      "trim card",
    ],
  },
];

/** `.section_padding` (base 7.5rem, 5.5rem at <=767px) — a real spacer div, not padding. */
function SectionPadding() {
  return <div aria-hidden="true" className="h-[7.5rem] max-[767px]:h-[5.5rem]" />;
}

/**
 * `.section` + `.section_partner-logos` — the full-bleed blue band carrying the headline
 * and, in place of the logo wall, the integrations wall.
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
              Works with the systems your factories already run
            </h2>

            <div className="text-ns-content-secondary">
              <p className="text-base leading-6">
                Your ERP, your WhatsApp, your email. Nobody changes how they work and
                nothing has to be migrated.
              </p>
            </div>

            {/* .partner-logos_list-wrap — flex-wrap + centre justification lets each row
                reflow on its own at every breakpoint; nothing is pinned per line. */}
            <div className="flex w-full max-w-[60rem] flex-col items-center justify-center gap-10">
              {INTEGRATION_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="flex w-full flex-col items-center justify-center gap-6"
                >
                  {/* `.text-nav-label-tiny` — 10px/12px, 600, uppercase, --content--tertiary,
                      the same treatment as the header dropdown and hero eyebrow labels. */}
                  <p className="text-[0.625rem] leading-3 font-semibold text-ns-content-tertiary uppercase">
                    {row.label}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    {row.items.map((item) => (
                      <span
                        key={item}
                        className="text-[0.875rem] leading-[1.25rem] text-ns-content-primary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
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
