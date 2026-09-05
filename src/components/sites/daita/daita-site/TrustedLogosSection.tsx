import { cn } from "@/lib/utils";
import { Container } from "@/components/sites/daita/shared/layout";
import { MULTILINGUAL } from "@/components/sites/daita/shared/typography";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";

/**
 * SUB_NOTE: Confirm which integrations are actually built before this ships — a name
 * here reads as a working connector.
 *
 * SUB_NOTE: Once written permission lands, swap to the client wall under "Trusted by
 * garment exporters and buying offices across South India".
 */

const LOGO_DIR = "/images/daita/integrations";

/**
 * A named integration is drawn one of two ways.
 *
 * `logo` — official artwork, downloaded from the owner's own brand page or their own
 * CDN, living in `public/images/daita/integrations/`. Nothing here came from an icon
 * pack or a logo-aggregator CDN.
 *
 * `pill` — everything else: marks whose owners bot-block their asset hosts, marks with
 * no official monochrome variant, and the many items that simply have no logo at all
 * ("voice notes", "cut report", "in-house ERP").
 */
type Integration =
  | {
      kind: "logo";
      /** Alt text, and the tooltip on hover. */
      name: string;
      file: string;
      /**
       * Box height, tuned per mark so the *ink* lands at a consistent optical height
       * rather than the boxes lining up. Measured ink-to-box ratios (alpha bounding box
       * over a 400px render) are recorded beside each entry: a square glyph that fills
       * its box needs a much smaller box than a wordmark whose artboard is mostly air.
       * Written as a literal utility so Tailwind can see the value at build time.
       */
      height: string;
    }
  | { kind: "pill"; name: string };

const logo = (name: string, file: string, height: string): Integration => ({
  kind: "logo",
  name,
  file,
  height,
});

const pill = (name: string): Integration => ({ kind: "pill", name });

interface IntegrationCard {
  /** `.text-nav-label-tiny` card header. */
  label: string;
  items: readonly Integration[];
  /** Optional line under the item wall — only Messaging carries one. */
  caption?: string;
}

const CARDS: readonly IntegrationCard[] = [
  {
    label: "Messaging",
    items: [
      // ink 1.000 — Meta's own monochrome glyph, artwork fills the artboard edge to edge.
      logo("WhatsApp Business", "whatsapp.svg", "h-[20px]"),
      pill("voice notes"),
      // ink 0.695 — the M sits in a 96px square with generous padding.
      logo("Gmail", "gmail.png", "h-[25px]"),
      // Outlook's only official artwork is the full-colour envelope; it collapses to an
      // unreadable slab in monochrome and Microsoft publishes no mono variant, so it
      // takes a pill rather than a broken mark.
      pill("Outlook"),
      pill("IMAP"),
      pill("SMS"),
      pill("photos"),
    ],
    caption: "தமிழ் · हिन्दी · English",
  },
  {
    label: "ERP & Systems",
    // SAP, Oracle and NetSuite all serve their official logo files from hosts that
    // refuse non-browser clients (403). Rather than pull them from a third-party
    // mirror, they take pills.
    items: [
      pill("SAP"),
      pill("Oracle"),
      // ink 1.000 — the D365 swoosh fills its 96px artboard, but only 0.835 of its width,
      // so it needs a slightly taller box than the round WhatsApp mark to weigh the same.
      logo("Dynamics 365", "dynamics-365.svg", "h-[22px]"),
      pill("NetSuite"),
      // ink 0.398 — an all-lowercase wordmark with no ascenders on a tall artboard.
      logo("Odoo", "odoo.svg", "h-[32px]"),
      // ink 1.000 — script wordmark plus the "power of simplicity" tagline lockup.
      logo("Tally", "tally.svg", "h-[26px]"),
      // ink 0.965 — Zoho's official white-on-dark cut. The four "petti" boxes are outlines
      // by design and the wordmark sits under them, so this one runs a little taller.
      logo("Zoho", "zoho-white.svg", "h-[26px]"),
      pill("in-house ERP"),
      // ink 0.345 — a very wide all-caps wordmark; the white cut ships ready to use.
      logo("FastReactPlan", "fastreact.webp", "h-[28px]"),
    ],
  },
  {
    // Documents are formats, not products. None of them has a logo and none should
    // acquire one — pills throughout.
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
    ].map(pill),
  },
];

/** `.text-nav-label-tiny` — 10px/12px, 600, uppercase, --content--tertiary. */
const LABEL = "text-[0.625rem] leading-3 font-semibold uppercase";

/**
 * Text fallback for anything without official artwork. The spec is fixed: 1px border at
 * 12% white, fill at 6% white, mono at the label size — deliberately quieter than a real
 * mark so the wall reads as "logos, plus the rest" rather than two competing treatments.
 */
function Pill({ name }: { name: string }) {
  return (
    <span
      className={cn(
        "flex h-8 items-center rounded-[4px] border border-[#ffffff1f] bg-[#ffffff0f] px-[0.625rem] font-mono tracking-[0.02em] text-ns-content-primary",
        LABEL,
      )}
    >
      {name}
    </span>
  );
}

/**
 * Official artwork rendered monochrome white.
 *
 * `brightness(0) invert(1)` flattens whatever the file contains — colour SVG, colour
 * PNG, or an already-white cut — to solid white while leaving the alpha channel intact,
 * so one rule covers every source format without editing anyone's artwork on disk.
 *
 * WhatsApp is the exception the brand guidelines demand, and it needs no exception here:
 * Meta publishes a monochrome `currentColor` variant of the telephone mark, which is
 * what ships in `whatsapp.svg`. Nothing is being recoloured — a colourless mark is
 * simply being given a colour, which is the variant's whole purpose.
 */
function LogoMark({ name, file, height }: { name: string; file: string; height: string }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element -- fixed-size brand artwork,
       mostly SVG; next/image cannot optimise SVG and its wrapper would fight the
       per-mark height that keeps the optical sizes even. */
    <img
      src={`${LOGO_DIR}/${file}`}
      alt={name}
      title={name}
      loading="lazy"
      decoding="async"
      className={cn(
        "w-auto opacity-60 [filter:brightness(0)_invert(1)] transition-opacity duration-200 hover:opacity-100",
        height,
      )}
    />
  );
}

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
        <div className="flex flex-col items-center gap-10 max-[767px]:gap-8">
          {/* .section_partner-logos — the headline block keeps its centred 958px measure. */}
          <div className="mx-auto flex max-w-[958px] flex-col items-center justify-start gap-6 text-center">
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
          </div>

          {/* Three equal cards in the site's glass-card treatment — the same
              `rounded-[8px]` + glass border/fill the video cards use over colour.
              `items-stretch` via grid keeps the three the same height whatever the
              item wall wraps to; they stack to one column at mobile. */}
          <div className="grid w-full grid-cols-3 gap-4 max-[767px]:grid-cols-1">
            {CARDS.map((card) => (
              <div
                key={card.label}
                className="flex flex-col gap-6 rounded-[8px] border border-ns-border-glass-primary bg-ns-bg-glass-primary p-6 max-[767px]:p-4"
              >
                <p className={cn(LABEL, "text-ns-content-tertiary")}>{card.label}</p>

                {/* The wall is a plain wrapping row: marks and pills share one flow so a
                    card reads as a single list, not a logo strip with a caption of
                    leftovers. `items-center` is what makes the tuned heights line up on
                    a shared centre line. */}
                <div className="flex flex-1 flex-wrap content-start items-center gap-x-6 gap-y-4">
                  {card.items.map((item) =>
                    item.kind === "logo" ? (
                      <LogoMark
                        key={item.name}
                        name={item.name}
                        file={item.file}
                        height={item.height}
                      />
                    ) : (
                      <Pill key={item.name} name={item.name} />
                    ),
                  )}
                </div>

                {card.caption ? (
                  /* Tamil and Devanagari are absent from DM Sans and DM Mono, so this one
                     line — and only this line — adds the two Noto faces after DM Sans.
                     Per-glyph fallback keeps "English" and the separators in the site
                     face and pulls only the Indic runs from Noto. */
                  <p
                    lang="mul"
                    className={cn(MULTILINGUAL, "text-[0.875rem] leading-[1.5rem] text-ns-content-secondary")}
                  >
                    {card.caption}
                  </p>
                ) : null}
              </div>
            ))}
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
