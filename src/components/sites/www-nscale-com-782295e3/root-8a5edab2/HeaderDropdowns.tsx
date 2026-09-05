"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@/components/sites/www-nscale-com-782295e3/shared/icons";
import { cn } from "@/lib/utils";
import type { NavDropdownItem } from "@/types/nscale";

const IMAGES = "/sites/www-nscale-com-782295e3/root-8a5edab2/images";

/* ---------------------------------------------------------------------------
   Shared button — `.button` and the three Webflow variants the header uses.

   Lives here rather than in a fourth file because `SiteHeader.tsx` already
   imports this module (so there is no import cycle) and all three header files
   render the same glass button.

   [base] .button { gap:.25rem; radius:4px; padding:.375rem 1rem; font-family:
     Dmmono; font-size:1rem; line-height:1.25rem; letter-spacing:.02em;
     transition: all .2s }
   glass       (w-variant-5057a24d…) — 1px --border--glass-primary, bg
     --background--glass-primary, backdrop-blur(20px); hover swaps to
     --background--glass-secondary and cancels the base `opacity:.8`.
   ghost       (w-variant-102d8d7c…) — transparent, radius 0, padding 0.
   ghost-small (w-variant-1aebf52f…) — ghost at .75rem/1rem with a .75rem icon.
   --------------------------------------------------------------------------- */

type ButtonVariant = "glass" | "ghost" | "ghost-small";

export function HeaderButton({
  label,
  variant,
  className,
}: {
  label: string;
  variant: ButtonVariant;
  className?: string;
}) {
  return (
    <div
      data-btn-hover="True"
      className={cn(
        "flex items-center justify-center gap-1 text-center font-mono text-base leading-5 tracking-[0.02em] transition-all duration-200",
        variant === "glass" &&
          "rounded-[4px] border border-ns-border-glass-primary bg-ns-bg-glass-primary px-4 py-1.5 text-ns-content-primary backdrop-blur-[20px] hover:bg-ns-bg-glass-secondary",
        variant === "ghost" &&
          "rounded-none bg-transparent p-0 text-ns-content-primary hover:opacity-80",
        variant === "ghost-small" &&
          "rounded-none bg-transparent p-0 text-xs leading-4 text-ns-content-primary hover:opacity-80",
        className,
      )}
    >
      <span>{label}</span>
      <div>
        {/* .button_icon — 1rem wide, .75rem on the ghost-small variant */}
        <div
          className={cn(
            "flex items-center justify-center transition-all duration-200",
            variant === "ghost-small" ? "w-3" : "w-4",
          )}
        >
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Panel shell — `.header_nav_dropdown`

   The panels are DOM children of `.header_nav_item`, which is `display:flex`
   with NO `position`, so `position:absolute` resolves against the nearest
   positioned ancestor: `.header_wrap` (`position: relative`). That is what makes
   `.is-centers`/`.is-services` able to say `left:50%; translate(-50%)` and span
   the whole content column. `top: calc(100% - 10px)` is therefore measured from
   the bottom of `.header_wrap` (72px) → y = 62px, i.e. the panel starts 10px
   *inside* the bar so the hover bridge always overlaps it.

   `.is-simple` has no left/right, so it falls back to its static position — the
   left content edge of its own nav item. To express that, the simple panels get
   `relative` on the nav item instead and offset by `100% + 7px`
   (`.header_wrap` padding-bottom 17px − the 10px pull-up).

   Source state is `visibility: hidden`, flipped by the site's GSAP timeline.
   `invisible` also removes the closed panel's links from the tab order.
   --------------------------------------------------------------------------- */

const PANEL_BASE =
  "flex rounded-[10px] border border-[#ffffff33] border-r-[#ffffff1a] shadow-[0_20px_20px_#0000000d] transition-[opacity,translate] duration-200";

function panelState(open: boolean) {
  return open
    ? "visible opacity-100 translate-y-0"
    : "invisible opacity-0 translate-y-[-4px]";
}

/** `.text-nav-label-tiny` — 10px/12px, 600, uppercase, --content--tertiary. */
function NavLabel({ children }: { children: ReactNode }) {
  return (
    <div className="px-2.5 py-2">
      <h3 className="text-[0.625rem] leading-3 font-semibold text-ns-content-tertiary uppercase">
        {children}
      </h3>
    </div>
  );
}

/* ===========================================================================
   1. Data Centers — `.header_nav_dropdown.is-centers`
   =========================================================================== */

interface DataCentre extends NavDropdownItem {
  /** `data-dc-location` — the key the source map script keys off. */
  location: string;
}

const NSCALE_CENTRES: DataCentre[] = [
  { location: "glomfjord", label: "Glomfjord", description: "Norway", href: "/ai-infrastructure#dc-glomfjord" },
  { location: "narvik", label: "Narvik", description: "Norway", href: "/ai-infrastructure#dc-narvik" },
  { location: "loughton", label: "Loughton", description: "United Kingdom", href: "/ai-infrastructure#dc-loughton" },
  { location: "texas", label: "Texas", description: "United States", href: "/ai-infrastructure#dc-texas" },
];

const PARTNER_CENTRES: DataCentre[] = [
  { location: "sines", label: "Sines", description: "Portugal", href: "/ai-infrastructure#dc-sines" },
  { location: "keflavik", label: "Keflavik", description: "Iceland", href: "/ai-infrastructure#dc-keflavik" },
  { location: "stavanger", label: "Stavanger", description: "Norway", href: "/ai-infrastructure#partner-centers" },
  { location: "oslo", label: "Oslo", description: "Norway", href: "/ai-infrastructure#partner-centers" },
  { location: "borealis", label: "Blönduós", description: "Iceland", href: "/ai-infrastructure#partner-centers" },
  { location: "slough", label: "Hayes", description: "United Kingdom", href: "/ai-infrastructure#partner-centers" },
  { location: "northCarolina", label: "North Carolina", description: "United States", href: "/ai-infrastructure#partner-centers" },
];

const AVAILABLE_CENTRES: DataCentre[] = [
  { location: "westVirginia", label: "West Virginia", description: "United States", href: "/ai-infrastructure#dc-monarch" },
];

/** `.header_nav_sub-link.is-dc` — dot + name/country stack. */
function DataCentreLink({
  centre,
  dot,
}: {
  centre: DataCentre;
  dot: "blue" | "pink" | "green";
}) {
  return (
    <a
      data-dc-location={centre.location}
      href={centre.href}
      className="flex flex-row gap-2 rounded-[6px] border border-transparent px-2.5 py-2 leading-4 text-ns-content-primary no-underline transition-all duration-200 hover:border-ns-border-glass-secondary hover:bg-ns-bg-glass-secondary"
    >
      {/* .header_nav_dc-dot — 6px square, 1px radius, 5px optical nudge */}
      <div
        aria-hidden="true"
        className={cn(
          "mt-[5px] h-1.5 w-1.5 rounded-[1px]",
          dot === "blue" && "bg-[#3b82f6]",
          dot === "pink" && "bg-[#ec4899]",
          dot === "green" && "bg-[#34d399]",
        )}
      />
      <div className="flex flex-col gap-1">
        <div className="text-base leading-4 font-normal">{centre.label}</div>
        <div className="text-xs font-normal text-ns-content-tertiary">
          {centre.description}
        </div>
      </div>
    </a>
  );
}

function CentresColumn({
  title,
  centres,
  dot,
  hasBorder,
}: {
  title: string;
  centres: DataCentre[];
  dot: "blue" | "pink" | "green";
  hasBorder?: boolean;
}) {
  return (
    // .header_nav_centers_column — note the source declares flex-flow but no
    // `display`, so this stays a block-level flex *item*.
    <div
      className={cn(
        "gap-1",
        hasBorder && "border-r border-ns-border-glass-secondary pr-4",
      )}
    >
      <div className="flex w-[10.75rem] flex-col gap-1">
        <NavLabel>{title}</NavLabel>
        {centres.map((centre) => (
          <DataCentreLink key={centre.location} centre={centre} dot={dot} />
        ))}
      </div>
    </div>
  );
}

export function CentersDropdown({ open }: { open: boolean }) {
  return (
    <div
      data-nav-dc-map=""
      data-dropdown=""
      className={cn(
        PANEL_BASE,
        panelState(open),
        "absolute top-[calc(100%-10px)] left-1/2 w-full max-w-full -translate-x-1/2 flex-col gap-1 bg-ns-bg-glass-deep-blue p-4 backdrop-blur-[120px]",
      )}
    >
      {/* .header_nav_centers — 2-column grid, 2.5rem gutter */}
      <div className="grid grid-cols-2 gap-10">
        <div className="flex gap-4">
          <CentresColumn
            title="Nscale data centers"
            centres={NSCALE_CENTRES}
            dot="blue"
            hasBorder
          />
          <CentresColumn
            title="Partner-run data centers"
            centres={PARTNER_CENTRES}
            dot="pink"
            hasBorder
          />
          <CentresColumn
            title="AVAILABLE DATA CENTERS"
            centres={AVAILABLE_CENTRES}
            dot="green"
          />
        </div>

        {/* .header_nav_centers_map-wrap — aspect-ratio 527 / 308 */}
        <div className="aspect-[527/308] w-full min-w-0">
          <a
            href="/ai-infrastructure"
            className="relative flex h-full w-full flex-col items-start justify-end gap-4 self-stretch overflow-clip rounded-[10px] border border-ns-border-secondary p-4 no-underline transition-colors duration-200"
          >
            <Image
              src={`${IMAGES}/6a005c353e5bc3f7560008ff_map_bg-2-.avif`}
              alt=""
              fill
              sizes="527px"
              data-map-el=""
              className="z-[-1] object-cover opacity-80"
            />
            {/* .header_nav_map-label */}
            <div
              data-map-label="wrap"
              className="absolute top-1/2 left-1/2 flex h-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer gap-1 rounded-[4px] border border-[#ffffff33] bg-[#ffffff33] px-4 py-2 backdrop-blur-[4px]"
            >
              <div
                data-map-label="content"
                className="pl-0 text-xs leading-[1.33] font-normal text-white"
              >
                Texas, USA
              </div>
            </div>
            <HeaderButton label="All Data Centers" variant="ghost" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ===========================================================================
   2. Services — `.header_nav_dropdown.is-services`
   =========================================================================== */

interface ServiceColumn {
  /** `data-menu-service` — the tint the source script paints on hover. */
  tint: string;
  title: string;
  href: string;
  items: NavDropdownItem[];
}

const SERVICE_COLUMNS: ServiceColumn[] = [
  {
    tint: "rgba(0, 1, 59, 0.8)",
    title: "AI services",
    href: "/services/ai-services",
    items: [
      { label: "Inference Endpoints", description: "Run models via API", href: "/services/ai-services#inference-endpoints" },
      { label: "Prompt Workbench", description: "Test and iterate prompts", href: "/services/ai-services#prompt-workbench" },
      { label: "Fine-tuning", description: "Adapt models to your data", href: "/services/ai-services#fine-tuning" },
    ],
  },
  {
    tint: "rgba(11, 3, 19, 0.8)",
    title: "Platform Services",
    href: "/services/platform-services",
    items: [
      { label: "Managed Slurm", description: "Distributed model training", href: "/services/platform-services#managed-slurm" },
      { label: "Kubernetes service", description: "Run containerised workloads", href: "/services/platform-services#scale-kubernetes-service" },
      { label: "Instances", description: "Provision virtual machines", href: "/services/platform-services#instances" },
    ],
  },
  {
    tint: "rgba(16, 9, 2, 0.8)",
    title: "INFRASTRUCTURE SERVICES",
    href: "/services/infrastructure-services",
    items: [
      { label: "Compute", description: "On-demand GPU & CPU", href: "/services/infrastructure-services#compute" },
      { label: "Networking", description: "Connect & secure resources", href: "/services/infrastructure-services#networking" },
      { label: "Storage", description: "Store and access data", href: "/services/infrastructure-services#storage" },
    ],
  },
  {
    tint: "rgba(15, 23, 20, 0.8)",
    title: "Fleet OPERATIONS",
    href: "/services/fleet-operations",
    items: [
      { label: "Control Center", description: "Manage your environment", href: "/services/fleet-operations#control-center" },
      { label: "Observability", description: "Monitor systems and jobs", href: "/services/fleet-operations#observability" },
      { label: "Radar API", description: "Track usage and events", href: "/services/fleet-operations#radar-api" },
    ],
  },
];

export function ServicesDropdown({ open }: { open: boolean }) {
  return (
    <div
      data-dropdown=""
      className={cn(
        PANEL_BASE,
        panelState(open),
        "absolute top-[calc(100%-10px)] left-1/2 w-[1034px] max-w-full -translate-x-1/2 flex-col gap-1 p-1 backdrop-blur-[120px]",
      )}
    >
      {/* .header_nav_services — 5 equal columns; only the right border is
          --border--primary (#ffffff33), the other three are #ffffff1a. */}
      <div
        data-menu-services-block=""
        className="grid grid-cols-5 gap-4 rounded-[8px] border border-[#ffffff1a] border-r-ns-border-primary bg-ns-bg-glass-dark p-4"
      >
        {/* .header_nav_services_all-col */}
        <div className="flex flex-col items-start justify-start gap-6 border-r border-ns-border-glass-primary py-2 pr-12 pl-2">
          <h3 className="text-lg leading-6 font-semibold">
            Explore our full AI stack
          </h3>
          <a href="/service-overview">
            <HeaderButton label="All Services" variant="ghost-small" />
          </a>
        </div>

        {SERVICE_COLUMNS.map((column) => (
          <div
            key={column.title}
            data-menu-service={column.tint}
            className="relative flex flex-col gap-5 overflow-hidden rounded-[8px] border border-transparent pt-2 text-white no-underline transition-colors duration-200 hover:border-ns-bg-glass-primary hover:bg-ns-bg-glass-secondary"
          >
            <div className="flex flex-col gap-3">
              <div className="px-2">
                <h3 className="text-[0.625rem] leading-3 font-semibold text-ns-content-tertiary uppercase">
                  {column.title}
                </h3>
              </div>
              <ul role="list" className="mb-0 flex list-none flex-col gap-1 p-[2px]">
                {column.items.map((item) => (
                  // .header_nav_services_list-item — z-2 so it stays clickable
                  // above the z-1 whole-column cover link below.
                  <li key={item.label} className="relative z-[2]">
                    <a
                      href={item.href}
                      className="flex flex-col gap-1 rounded-[4px] border border-transparent p-2 text-ns-content-primary transition-colors duration-200 hover:border-ns-border-glass-primary hover:bg-ns-bg-glass-primary"
                    >
                      <h4 className="text-base leading-4 font-normal">
                        {item.label}
                      </h4>
                      <div className="text-xs leading-4 text-ns-content-tertiary">
                        {item.description}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* .header_nav_services_link — bare cover link, a sibling (not a
                parent) of the list links, so nothing is nested. */}
            <a
              href={column.href}
              aria-label={column.title}
              className="absolute inset-0 z-[1]"
            />
          </div>
        ))}
      </div>

      {/* .header_nav_services_cta */}
      <div className="flex items-center justify-between px-4 py-2">
        <h3 className="text-sm leading-4">Use our services on demand</h3>
        <a href="https://console.nscale.com" target="_blank" rel="noreferrer">
          <HeaderButton label="Start Building" variant="glass" />
        </a>
      </div>
    </div>
  );
}

/* ===========================================================================
   3 & 4. Company / Resources — `.header_nav_dropdown.is-simple`
   =========================================================================== */

interface SimpleLink extends NavDropdownItem {
  external?: boolean;
}

const COMPANY_LINKS: SimpleLink[] = [
  { label: "About Nscale", href: "/about" },
  { label: "Careers", href: "/careers" },
];

const RESOURCES_LINKS: SimpleLink[] = [
  { label: "Newsroom", href: "/newsroom" },
  { label: "Blog", href: "/blog" },
  {
    label: "Docs",
    href: "https://docs.nscale.com/docs/getting-started/overview",
    external: true,
  },
  { label: "Media kit", href: "/media-kit" },
];

function SimpleDropdown({
  title,
  links,
  open,
}: {
  title: string;
  links: SimpleLink[];
  open: boolean;
}) {
  return (
    <div
      data-dropdown=""
      className={cn(
        PANEL_BASE,
        panelState(open),
        // No left/right in the source: the panel lands on its static position,
        // the left content edge of its own nav item. `top` is 100% + 7px here
        // because the offset parent is the nav item, not `.header_wrap`.
        "absolute top-[calc(100%+7px)] left-0 w-[11.625rem] flex-col gap-1 bg-ns-bg-glass-dark p-4 backdrop-blur-[80px]",
      )}
    >
      <NavLabel>{title}</NavLabel>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
          className={cn(
            "flex gap-1 rounded-[6px] border border-transparent px-2.5 py-2 leading-4 text-ns-content-secondary no-underline transition-all duration-200 hover:border-ns-border-glass-secondary hover:bg-ns-bg-glass-secondary",
            link.external
              ? "flex-row items-center justify-start"
              : "flex-col",
          )}
        >
          <div className="text-base leading-4 font-normal">{link.label}</div>
          {link.external ? (
            // .header_nav_external-icon
            <div className="flex w-4 items-center justify-center">
              <ArrowUpRightIcon />
            </div>
          ) : null}
        </a>
      ))}
    </div>
  );
}

export function CompanyDropdown({ open }: { open: boolean }) {
  return <SimpleDropdown title="Company" links={COMPANY_LINKS} open={open} />;
}

export function ResourcesDropdown({ open }: { open: boolean }) {
  return (
    <SimpleDropdown title="Resources" links={RESOURCES_LINKS} open={open} />
  );
}
