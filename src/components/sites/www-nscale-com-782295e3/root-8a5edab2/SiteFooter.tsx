import {
  ArrowRightIcon,
  LinkedInIcon,
  NscaleLogoLarge,
  NscaleWordmark,
  XIcon,
  YouTubeIcon,
} from "@/components/sites/www-nscale-com-782295e3/shared/icons";
import { Container } from "@/components/sites/www-nscale-com-782295e3/shared/layout";
import { cn } from "@/lib/utils";
import type { FooterColumn, FooterLink } from "@/types/nscale";

/**
 * A `.footer_nav_group`. When `split` is set the groups are laid out inside a
 * `.footer_nav_lists-wrap` (a 2-column grid); each number says how many of
 * `groups`, in order, belong to the next `.footer_nav_lists-col`. Without it
 * the single ungrouped list is rendered straight under the heading rule.
 */
interface FooterNavColumn extends FooterColumn {
  split?: number[];
}

/** `.footer_nav_lists-wrap` under "Data Centers". DOM order is column-major. */
const DATA_CENTERS: FooterNavColumn = {
  heading: "Data Centers",
  split: [2, 1],
  groups: [
    {
      label: "Nscale Data Centers",
      links: [
        { label: "Narvik", href: "/ai-infrastructure#dc-narvik" },
        { label: "Glomfjord", href: "/ai-infrastructure#dc-glomfjord" },
        { label: "Loughton", href: "/ai-infrastructure#dc-loughton" },
        { label: "Texas", href: "/ai-infrastructure#dc-texas" },
      ],
    },
    {
      label: "Available Data Centers",
      links: [{ label: "West Virginia", href: "/ai-infrastructure#dc-monarch" }],
    },
    {
      label: "Partner-run Data Centers",
      links: [
        { label: "Sines", href: "/ai-infrastructure#dc-sines" },
        { label: "Keflavik", href: "/ai-infrastructure#dc-keflavik" },
        { label: "Stavanger", href: "/ai-infrastructure#partner-centers" },
        { label: "Oslo", href: "/ai-infrastructure#partner-centers" },
        { label: "Blönduós", href: "/ai-infrastructure#partner-centers" },
        { label: "Hayes", href: "/ai-infrastructure#partner-centers" },
        { label: "North Carolina", href: "/ai-infrastructure#partner-centers" },
      ],
    },
  ],
};

const SERVICES: FooterNavColumn = {
  heading: "Services",
  split: [2, 2],
  groups: [
    {
      label: "AI Services",
      links: [
        {
          label: "Inference Endpoints",
          href: "/services/ai-services#inference-endpoints",
        },
        {
          label: "Prompt Workbench",
          href: "/services/ai-services#prompt-workbench",
        },
        { label: "Fine-Tuning", href: "/services/ai-services#fine-tuning" },
      ],
    },
    {
      label: "Platform Services",
      links: [
        {
          label: "Managed Slurm",
          href: "/services/platform-services#managed-slurm",
        },
        {
          label: "Kubernetes Service",
          href: "/services/platform-services#scale-kubernetes-service",
        },
        { label: "Instances", href: "/services/platform-services#instances" },
      ],
    },
    {
      label: "Infrastructure Services",
      links: [
        { label: "Compute", href: "/services/infrastructure-services#compute" },
        {
          label: "Networking",
          href: "/services/infrastructure-services#networking",
        },
        { label: "Storage", href: "/services/infrastructure-services#storage" },
      ],
    },
    {
      label: "Fleet Operations",
      links: [
        {
          label: "Control Center",
          href: "/services/fleet-operations#control-center",
        },
        {
          label: "Observability",
          href: "/services/fleet-operations#observability",
        },
        { label: "Radar API", href: "/services/fleet-operations#radar-api" },
      ],
    },
  ],
};

const SOLUTIONS: FooterNavColumn = {
  heading: "Solutions",
  groups: [
    {
      links: [
        { label: "Telco", href: "/industries/telco" },
        { label: "AI Native", href: "/industries/ai-native" },
      ],
    },
  ],
};

const COMPANY: FooterNavColumn = {
  heading: "Company",
  groups: [
    {
      links: [
        { label: "About Nscale", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Careers", href: "/careers" },
      ],
    },
  ],
};

const RESOURCES: FooterNavColumn = {
  heading: "Resources",
  groups: [
    {
      links: [
        { label: "Newsroom", href: "/newsroom" },
        { label: "Blog", href: "/blog" },
        {
          label: "Docs",
          // Verbatim from the source markup — the live page really does ship
          // this doubled, query-string-mangled href.
          href: "https://docs.nscale.com/docs/getting-started/overview?_gl=1*1k74vzm*_gcl_au*MjA0OTA3MjQxNy4xNzczMjU1MzIz*FPAU*MjA0OTA3MjQxNy4xNzczMjU1MzIzhttps://docs.nscale.com/docs/getting-started/overview?_gl=1*1k74vzm*_gcl_au*MjA0OTA3MjQxNy4xNzczMjU1MzIz*FPAU*MjA0OTA3MjQxNy4xNzczMjU1MzIz",
        },
        { label: "Media Kit", href: "/media-kit" },
        { label: "SpeakUp", href: "/speakup" },
      ],
    },
  ],
};

const SOCIAL_LINKS: {
  label: string;
  href: string;
  Icon: typeof LinkedInIcon;
}[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/nscale-cloud/?originalSubdomain=uk",
    Icon: LinkedInIcon,
  },
  { label: "X", href: "https://x.com/nscale", Icon: XIcon },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@NscaleCloud",
    Icon: YouTubeIcon,
  },
];

const BOTTOM_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "/policies/privacy-policy" },
  { label: "Terms & Conditions", href: "/policies/terms-conditions" },
  {
    label: "Transparency & Human Rights",
    href: "/policies/transparency-and-human-rights",
  },
];

/** `.footer_nav_lists-wrap` and `.footer_nav_group-wrap` share this grid. */
const LISTS_GRID =
  "grid grid-cols-2 grid-rows-[auto] items-start justify-between gap-[clamp(1rem,5vw,4.5rem)] max-[767px]:gap-12";

/** `.footer_nav_list` — the labelled `<li>` heading plus its links. */
function FooterNavList({ group }: { group: FooterColumn["groups"][number] }) {
  return (
    <ul role="list" className="m-0 flex list-none flex-col gap-4 p-0">
      {group.label ? (
        <li>
          {/* .text-label-xs-regular .text-color-tertiary */}
          <h4 className="text-ns-content-tertiary text-[0.75rem] leading-[1rem] font-normal">
            {group.label}
          </h4>
        </li>
      ) : null}
      {group.links.map((link) => (
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

/** Slices `groups` into the `.footer_nav_lists-col` buckets named by `split`. */
function splitIntoListColumns(
  column: FooterNavColumn,
): FooterColumn["groups"][] {
  const columns: FooterColumn["groups"][] = [];
  let cursor = 0;
  for (const count of column.split ?? []) {
    columns.push(column.groups.slice(cursor, cursor + count));
    cursor += count;
  }
  return columns;
}

/** `.footer_nav_group` — heading, its rule, and one or two list columns. */
function FooterNavGroup({
  column,
  className,
}: {
  column: FooterNavColumn;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* .footer_nav_group-title */}
      <div className="border-ns-border-primary border-b pb-1">
        {/* .text-label-md-bold */}
        <h3 className="text-ns-content-primary text-[1rem] leading-[1.5rem] font-semibold">
          {column.heading}
        </h3>
      </div>

      {column.split ? (
        <div className={LISTS_GRID}>
          {splitIntoListColumns(column).map((groups, index) => (
            // .footer_nav_lists-col
            <div key={index} className="flex flex-col gap-8">
              {groups.map((group) => (
                <FooterNavList key={group.label} group={group} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        column.groups.map((group, index) => (
          <FooterNavList key={index} group={group} />
        ))
      )}
    </div>
  );
}

/**
 * The newsletter field.
 *
 * The live site mounts a HubSpot embedded form in this slot. This clone
 * reproduces the visual field only: there is deliberately no `<form>` element,
 * no action, no script and no network request of any kind — the input is
 * uncontrolled and the arrow is a `type="button"` no-op, which also keeps the
 * whole footer a server component.
 */
function NewsletterField() {
  return (
    <div className="border-ns-border-primary flex w-full max-w-[375px] items-center gap-3 rounded-[4px] border px-5 py-3">
      <input
        type="email"
        name="email"
        autoComplete="email"
        placeholder="name@example.com"
        aria-label="Email address"
        className="text-ns-content-primary placeholder:text-ns-content-tertiary min-w-0 flex-1 bg-transparent text-[1rem] leading-[1.5rem] outline-none"
      />
      <button
        type="button"
        aria-label="Subscribe"
        className="text-ns-content-primary flex size-6 shrink-0 items-center justify-center rounded-full transition-opacity duration-200 hover:opacity-70"
      >
        <span className="flex w-4 items-center justify-center">
          <ArrowRightIcon />
        </span>
      </button>
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
              <NscaleLogoLarge />
            </div>

            {/* .footer_form-content */}
            <div className="flex flex-col gap-8">
              {/* .footer_form-wrap */}
              <div className="flex flex-col gap-4">
                {/* .footer_form_title-wrap */}
                <div className="flex flex-col gap-1">
                  {/* .text-heading-h5 */}
                  <h2 className="text-ns-content-primary text-[1.5rem] leading-[2rem] font-medium">
                    Stay up to date with Nscale
                  </h2>
                  {/* .text-label-xs-regular */}
                  <p className="text-ns-content-secondary text-[0.75rem] leading-[1rem] font-normal">
                    By submitting you agree to receive Nscale emails &amp;
                    accept our{" "}
                    <a
                      href="/policies/terms-conditions"
                      className="text-ns-content-link"
                    >
                      Terms
                    </a>{" "}
                    &amp;{" "}
                    <a
                      href="/policies/privacy-policy"
                      className="text-ns-content-link"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>

                <NewsletterField />

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
            <FooterNavGroup column={DATA_CENTERS} />
            <FooterNavGroup column={SERVICES} />

            {/* .footer_nav_group-wrap */}
            <div className={LISTS_GRID}>
              {/* .footer_nav_group.hide-desktop — Solutions only shows here <=767px */}
              <FooterNavGroup
                column={SOLUTIONS}
                className="hidden max-[767px]:flex"
              />
              <FooterNavGroup column={COMPANY} />
              <FooterNavGroup column={RESOURCES} />
            </div>

            {/* .footer_nav_group-wrap.hide-mobile */}
            <div className={cn(LISTS_GRID, "max-[767px]:hidden")}>
              <FooterNavGroup column={SOLUTIONS} />
            </div>
          </nav>
        </div>
      </Container>

      <Container>
        {/* .footer_logo-large */}
        <div className="mb-10 flex w-full items-center justify-center max-[767px]:mb-8">
          <NscaleWordmark />
        </div>
      </Container>

      {/* .footer_divider */}
      <div className="bg-ns-border-secondary h-px w-full" />

      <Container>
        {/* .footer_bottom_wrap */}
        <div className="flex items-center justify-between gap-8 py-10 max-[767px]:flex-col max-[767px]:pt-8">
          {/* .footer_bottom_copyright-text */}
          <div className="text-ns-content-tertiary font-mono text-[0.75rem] leading-[1.25rem] tracking-[0.02em]">
            ©2026 Nscale Limited. All rights reserved.
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
