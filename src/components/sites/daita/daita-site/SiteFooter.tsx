import {
  ASSETS,
  CONTACT,
  COPYRIGHT,
  CTA,
  TAGLINE,
} from "@/components/sites/daita/shared/brand";
import {
  ArrowRightIcon,
  LinkedInIcon,
} from "@/components/sites/daita/shared/icons";
import { Container } from "@/components/sites/daita/shared/layout";
import type { FooterLink } from "@/types/daita";

/**
 * A `.footer_nav_group`. DAITA's columns carry no labelled sub-groups, so each
 * column is a heading, its rule, and one flat list.
 */
interface FooterNavColumn {
  heading: string;
  links: FooterLink[];
}

const PLATFORM: FooterNavColumn = {
  heading: "Platform",
  links: [
    { label: "Capture", href: "/platform#infrastructure" },
    { label: "Structure", href: "/platform#infrastructure" },
    { label: "Coordinate", href: "/platform#infrastructure" },
    { label: "Guidelines", href: "/platform#guidelines" },
  ],
};

const PRODUCT: FooterNavColumn = {
  heading: "Product",
  links: [
    { label: "TNA Engine", href: "/platform#product" },
    { label: "Pending Actions", href: "/platform#product" },
    { label: "Process In-Charges", href: "/platform#product" },
    { label: "My Team", href: "/platform#product" },
    { label: "Chat with your data", href: "/platform#product" },
  ],
};

const WHO_ITS_FOR: FooterNavColumn = {
  heading: "Who it’s for",
  links: [
    { label: "Garment exporters", href: "/#who-its-for" },
    { label: "Buying offices", href: "/#who-its-for" },
  ],
};

const COMPANY: FooterNavColumn = {
  heading: "Company",
  links: [
    { label: "Our story", href: "/our-story" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: CONTACT.linkedin },
  ],
};

const SOCIAL_LINKS: {
  label: string;
  href: string;
  Icon: typeof LinkedInIcon;
}[] = [
  {
    label: "LinkedIn",
    href: CONTACT.linkedin,
    Icon: LinkedInIcon,
  },
];

/**
 * Intentionally empty.
 *
 * The source's bottom bar carried Privacy Policy, Terms & Conditions and
 * Transparency & Human Rights, all pointing at `/policies/*` pages that do not exist in
 * this clone. Rather than 404 or misdirect them at an unrelated route, the links are
 * removed until real legal pages exist — add them back here and the bar renders again.
 */
const BOTTOM_LINKS: FooterLink[] = [];

/** `.footer_nav_lists-wrap` and `.footer_nav_group-wrap` share this grid. */
const LISTS_GRID =
  "grid grid-cols-2 grid-rows-[auto] items-start justify-between gap-[clamp(1rem,5vw,4.5rem)] max-[767px]:gap-12";

/**
 * `.footer_logo-large` — the full-bleed wordmark closing the footer.
 *
 * Set as live text rather than an image. The brand mark published at
 * daitalabs.com is a near-square glyph (1900x1652), so stretching it across the
 * 1232px content column would distort it badly; the slot was designed for a wide
 * wordmark.
 *
 * Rendered as SVG text so it behaves exactly as the original wordmark did: a fixed
 * viewBox with `width: 100%`, so it fills the content column and scales with it at
 * every breakpoint.
 *
 * Sizing is measured, not guessed. DM Sans advance widths for D-A-I-T-A total 2796
 * units at 1000 upem, so 440px is the size at which the word spans exactly 1232px with
 * no tracking; cap height there is 0.7em = 308px, which sets the viewBox height.
 * `textLength` + `lengthAdjust="spacing"` then pin the width for real — if the webfont
 * ever fails and Arial substitutes, the difference is absorbed as tracking rather than
 * leaving the wordmark short of the column edge. Glyphs are never distorted.
 *
 * Note the block is 1232x308 (4:1) where the previous wordmark was 1232x186 (6.6:1):
 * five wide letters simply occupy a taller box than six narrow custom-drawn ones at the
 * same width. Matching the old height instead would need ~0.46em of tracking.
 */
function DaitaWordmark() {
  return (
    <svg
      viewBox="0 0 1232 308"
      width="100%"
      role="img"
      aria-label="DAITA"
      className="block h-auto w-full text-ns-content-primary"
    >
      <text
        x="0"
        y="308"
        textLength="1232"
        lengthAdjust="spacing"
        fill="currentColor"
        style={{
          fontFamily: "var(--font-dm-sans), Arial, sans-serif",
          fontSize: "440px",
          fontWeight: 500,
        }}
      >
        DAITA
      </text>
    </svg>
  );
}

/** `.footer_nav_list` — one column's links. */
function FooterNavList({ links }: { links: FooterLink[] }) {
  return (
    <ul role="list" className="m-0 flex list-none flex-col gap-4 p-0">
      {links.map((link) => (
        <li key={`${link.label}-${link.href}`}>
          {/* .footer_nav_link — plain <a>: most of these routes do not exist
              in the clone, so next/link would prefetch 404s. */}
          <a
            href={link.href}
            {...(link.href.startsWith("http")
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
            className="text-ns-content-primary text-[0.875rem] leading-[1.25rem] transition-opacity duration-200 hover:opacity-70"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** `.footer_nav_group` — heading, its rule, and the column's list. */
function FooterNavGroup({ column }: { column: FooterNavColumn }) {
  return (
    <div className="flex flex-col gap-6">
      {/* .footer_nav_group-title */}
      <div className="border-ns-border-primary border-b pb-1">
        {/* .text-label-md-bold */}
        <h3 className="text-ns-content-primary text-[1rem] leading-[1.5rem] font-semibold">
          {column.heading}
        </h3>
      </div>

      <FooterNavList links={column.links} />
    </div>
  );
}

/** `.footer` — the site-wide footer that closes the homepage. */
export function SiteFooter() {
  return (
    <footer className="border-ns-border-primary bg-ns-bg-primary border-t">
      <Container>
        {/* .footer_main-wrap */}
        <div className="flex items-start justify-between gap-18 pt-10 pb-30 max-[991px]:flex-col max-[991px]:gap-10 max-[767px]:pb-10">
          {/* .footer_form-col */}
          <div className="flex flex-col gap-18">
            {/* .footer_logo */}
            <div className="flex w-full max-w-[256px] items-center justify-center max-[991px]:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element -- brand lockup
                  ships as a static SVG; next/image would add no optimisation. */}
              <img src={ASSETS.logoWhite} alt="DAITA" className="w-full" />
            </div>

            {/* .footer_form-content */}
            <div className="flex flex-col gap-8">
              {/* Descriptor under the logo — .text-color-tertiary at the footer's
                  0.875rem/1.25rem body size. */}
              <p className="text-ns-content-tertiary text-[0.875rem] leading-[1.25rem]">
                {TAGLINE}
              </p>

              {/* .footer_form-wrap — now the contact strip. */}
              <div className="flex flex-col gap-4">
                {/* .footer_form_title-wrap */}
                <div className="flex flex-col gap-1">
                  {/* .text-heading-h5 */}
                  <h2 className="text-ns-content-primary text-[1.5rem] leading-[2rem] font-medium">
                    Talk to us
                  </h2>
                  {/* .text-label-xs-regular */}
                  <p className="text-ns-content-secondary text-[0.75rem] leading-[1rem] font-normal">
                    One live order is all it takes to start.
                  </p>
                  <p className="text-ns-content-secondary text-[0.75rem] leading-[1rem] font-normal">
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-ns-content-link transition-opacity duration-200 hover:opacity-70"
                    >
                      {CONTACT.email}
                    </a>
                    {" · "}
                    <a
                      href={CONTACT.phoneHref}
                      className="text-ns-content-link transition-opacity duration-200 hover:opacity-70"
                    >
                      {CONTACT.phone}
                    </a>
                  </p>
                  {/* .text-label-xs-regular .text-color-tertiary */}
                  <p className="text-ns-content-tertiary text-[0.75rem] leading-[1rem] font-normal">
                    {CONTACT.places.join(" · ")}
                  </p>
                </div>

                <a href={CTA.href} className="inline-block max-w-full">
                  {/* .button — solid variant, verbatim from the hero. */}
                  <div
                    data-btn-hover="True"
                    className="flex items-center justify-center gap-1 rounded-[4px] bg-ns-bg-inverse px-4 py-1.5 text-center font-mono text-base leading-5 tracking-[0.02em] text-ns-content-inverse transition-all duration-200 hover:opacity-80"
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

                {/* .footer_form_logos-wrap */}
                <div className="flex items-center justify-start gap-4">
                  {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="inline-block max-w-full"
                    >
                      {/* .footer_social-icon */}
                      <div className="text-ns-content-secondary hover:text-ns-content-primary flex h-5 items-center justify-center opacity-75 transition-colors duration-200">
                        <Icon />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* .footer_nav-col */}
          <nav className="grid flex-none grid-cols-2 grid-rows-[auto_auto] gap-[clamp(1rem,5vw,4.5rem)] pt-8 max-[991px]:w-full max-[767px]:grid-cols-1 max-[767px]:gap-12 max-[767px]:pt-0">
            {/* .footer_nav_group-wrap */}
            <div className={LISTS_GRID}>
              <FooterNavGroup column={PLATFORM} />
              <FooterNavGroup column={PRODUCT} />
            </div>

            {/* .footer_nav_group-wrap */}
            <div className={LISTS_GRID}>
              <FooterNavGroup column={WHO_ITS_FOR} />
              <FooterNavGroup column={COMPANY} />
            </div>
          </nav>
        </div>
      </Container>

      <Container>
        {/* .footer_logo-large */}
        <div className="mb-10 flex w-full items-center justify-center max-[767px]:mb-8">
          <DaitaWordmark />
        </div>
      </Container>

      {/* .footer_divider */}
      <div className="bg-ns-border-secondary h-px w-full" />

      <Container>
        {/* .footer_bottom_wrap */}
        <div className="flex items-center justify-between gap-8 py-10 max-[767px]:flex-col max-[767px]:pt-8">
          {/* .footer_bottom_copyright-text */}
          <div className="text-ns-content-tertiary font-mono text-[0.75rem] leading-[1.25rem] tracking-[0.02em]">
            {COPYRIGHT}
          </div>
          {/* .footer_bottom_links-wrap */}
          <div className="flex items-center justify-end gap-8 max-[767px]:flex-col max-[767px]:gap-4">
            {BOTTOM_LINKS.map((link) => (
              // .footer_bottom_link
              <a
                key={link.href}
                href={link.href}
                className="text-ns-content-tertiary hover:text-ns-content-secondary font-mono text-[0.875rem] leading-[1.25rem] tracking-[0.02em] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
