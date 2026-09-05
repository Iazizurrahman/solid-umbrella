import { CONTACT, CTA } from "@/components/sites/daita/shared/brand";
import { ArrowRightIcon } from "@/components/sites/daita/shared/icons";
import { Container } from "@/components/sites/daita/shared/layout";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";

/**
 * The /contact enquiry block — form on the left, reachable details on the right.
 *
 * NO NEW VISUAL PATTERN. Every class is lifted from an existing section:
 *   · section shell, `.section_padding` spacers, `<SectionLines />` and the
 *     `.body-content` heading block come from InfrastructureSection.
 *   · the two-column grid is SiteFooter's nav grid class string
 *     (`grid-cols-2` + `gap-[clamp(1rem,5vw,4.5rem)]` + `max-[767px]:grid-cols-1`
 *     + `max-[767px]:gap-12`), which is the site's only existing wide-gutter pair.
 *   · field boxes reuse the tab-chip geometry from IndustrySolutionsSection
 *     (`rounded-[4px] px-3 py-[0.625rem]`) over `bg-transparent` and the existing
 *     `border-ns-border-primary` / `hover:border-ns-border-hover` treatment, with the
 *     site-wide `transition-all duration-200`.
 *   · labels use `.text-nav-label-tiny` (HeroSection's eyebrow); the detail values use
 *     the mono/data treatment (PlatformStackSection / SiteFooter).
 *   · the submit button and the small print are CtaSection's markup verbatim.
 *
 * ============================ STOPGAP — READ BEFORE LAUNCH ============================
 * There is no backend. The form posts to `mailto:` so that pressing "Book a Demo" opens
 * the sender's own mail client with the field values in the body — a submission is never
 * silently swallowed, and there is deliberately no faked success state.
 *
 * This is NOT a shippable submission path: `enctype="text/plain"` mail posts are handled
 * inconsistently across browsers, and a visitor with no configured mail client gets
 * nothing. Replace `action` with a real endpoint (route handler or form provider) before
 * this page is promoted, and keep the "your data stays in your systems" line honest.
 * =====================================================================================
 */

interface ContactField {
  name: string;
  label: string;
  /** `textarea` renders the multi-line box; everything else is an `<input>`. */
  type: "text" | "email" | "tel" | "textarea";
  required?: boolean;
}

const FIELDS: readonly ContactField[] = [
  { name: "Name", label: "Name", type: "text", required: true },
  { name: "Work email", label: "Work email", type: "email", required: true },
  { name: "Company", label: "Company", type: "text", required: true },
  { name: "Role", label: "Role", type: "text" },
  { name: "Number of production units", label: "Number of production units", type: "text" },
  { name: "Message", label: "Message", type: "textarea" },
];

interface ContactDetail {
  label: string;
  value: string;
  /** Omitted for the two office rows — they are addresses, not destinations. */
  href?: string;
  external?: boolean;
}

const DETAILS: readonly ContactDetail[] = [
  { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: "Phone", value: CONTACT.phone, href: CONTACT.phoneHref },
  { label: "Tiruppur", value: "Tamil Nadu, India" },
  { label: "Bengaluru", value: "Karnataka, India" },
  {
    label: "LinkedIn",
    value: "linkedin.com/company/daitalabs",
    href: CONTACT.linkedin,
    external: true,
  },
];

/** `.text-nav-label-tiny` — 10px/12px, 600, uppercase, tertiary. */
const TINY_LABEL =
  "text-[0.625rem] leading-3 font-semibold text-ns-content-tertiary uppercase";

/** The mono/data treatment used for record values site-wide. */
const MONO_VALUE =
  "font-mono text-[0.75rem] leading-[1.25rem] tracking-[0.02em] text-ns-content-tertiary";

/** Same value, plus the site-wide link hover. */
const MONO_VALUE_LINK = `${MONO_VALUE} transition-all duration-200 hover:opacity-80`;

/** Field box — tab-chip geometry over a transparent ground. */
const FIELD_BOX =
  "w-full rounded-[4px] border border-ns-border-primary bg-transparent px-3 py-[0.625rem] text-[1rem] leading-[1.5rem] text-ns-content-primary transition-all duration-200 placeholder:text-ns-content-tertiary hover:border-ns-border-hover focus:border-ns-border-hover";

/** `.section_padding` — 7.5rem, 5.5rem at <=767px. */
function SectionPadding() {
  return <div className="h-[7.5rem] max-[767px]:h-[5.5rem]" aria-hidden="true" />;
}

export interface ContactSectionProps {
  heading?: string;
}

export function ContactSection({ heading = "Talk to us." }: ContactSectionProps = {}) {
  return (
    <section className="relative isolate bg-ns-bg-primary">
      <SectionPadding />

      <Container>
        <div>
          <div className="flex flex-col gap-10 max-[767px]:gap-8">
            {/* .body-content */}
            <div className="flex max-w-[37.75rem] flex-col gap-8 max-[767px]:max-w-none">
              <div className="flex max-w-[37.75rem] flex-col gap-6">
                <div className="flex flex-col gap-6">
                  <h2 className="text-[3rem] font-medium leading-[3.25rem] text-ns-content-primary max-[767px]:text-[2rem] max-[767px]:leading-[2.625rem]">
                    {heading}
                  </h2>
                </div>
              </div>
            </div>

            {/* Two columns — SiteFooter's nav grid class string. */}
            <div className="grid grid-cols-2 items-start gap-[clamp(1rem,5vw,4.5rem)] max-[767px]:grid-cols-1 max-[767px]:gap-12">
              {/*
                STOPGAP: mailto submission. See the block comment at the top of this file —
                replace with a real endpoint before launch. Nothing is discarded silently.
              */}
              <form
                action={`mailto:${CONTACT.email}`}
                method="post"
                encType="text/plain"
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col gap-4">
                  {FIELDS.map((field) => {
                    const id = `contact-${field.name.replace(/\s+/g, "-").toLowerCase()}`;

                    return (
                      <div key={field.name} className="flex flex-col gap-2">
                        <label htmlFor={id} className={TINY_LABEL}>
                          {field.label}
                        </label>
                        {field.type === "textarea" ? (
                          <textarea
                            id={id}
                            name={field.name}
                            rows={4}
                            className={FIELD_BOX}
                          />
                        ) : (
                          <input
                            id={id}
                            name={field.name}
                            type={field.type}
                            required={field.required}
                            className={FIELD_BOX}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-10">
                  <button type="submit" className="inline-block max-w-full">
                    {/* .button — solid variant, verbatim from CtaSection. */}
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
                  </button>

                  {/* .text-label-xs-regular .text-color-tertiary */}
                  <p className="text-ns-content-tertiary text-[0.75rem] leading-[1rem]">
                    Your data stays in your systems.
                  </p>
                </div>
              </form>

              {/* Record data, in the site's mono/data treatment. */}
              <ul
                role="list"
                className="m-0 flex list-none flex-col gap-4 rounded-[6px] bg-ns-bg-glass-secondary p-4"
              >
                {DETAILS.map((detail) => (
                  <li key={detail.label} className="flex flex-col gap-2">
                    <div className={TINY_LABEL}>{detail.label}</div>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className={MONO_VALUE_LINK}
                        {...(detail.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <div className={MONO_VALUE}>{detail.value}</div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <SectionPadding />
      <SectionLines />
    </section>
  );
}
