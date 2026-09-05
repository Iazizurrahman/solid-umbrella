"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/sites/www-nscale-com-782295e3/shared/layout";
import { SectionLines } from "@/components/sites/www-nscale-com-782295e3/shared/SectionLines";
import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
} from "@/components/sites/www-nscale-com-782295e3/shared/icons";
import { cn } from "@/lib/utils";
import type { PlatformLayer } from "@/types/nscale";

/**
 * `.section.hide-desktop` > `[data-platform-slider-section].section_services-slider`
 * — the small-screen counterpart of the platform stack.
 *
 * At >=992px this renders nothing (`.ns-hide-desktop`) and the Rive-canvas
 * `PlatformStackSection` covers the same content; `.section_services-slider` is
 * itself `display: none` until the source's own `max-width: 991px` query, so the
 * two never overlap.
 *
 * Structure, verbatim from the source DOM and confirmed against the 375px
 * captures in docs/design-references/.../mobile-02-platform-stack-top.png and
 * mobile-03-platform-stack-detail.png:
 *   .services-slider_top-wrap        heading + copy + solid "Explore the platform"
 *                                    (no arrow icon — the source span is bare)
 *   [data-image-swiper]              one static PNG per platform layer, the
 *                                    selected layer lit in brand blue
 *   [data-swiper-pagination]         four progress-bar pills, injected by Swiper
 *   [data-content-swiper]            one content panel per layer, synced to the image
 *
 * It is a CAROUSEL of four layers; the accordion rows live one level deeper,
 * inside each layer's panel — they are not the four layers themselves.
 *
 * Each content panel holds `[data-accordion="single"]` with 3 (2 for Energy &
 * Power) `[data-accordion-item]` rows. The source drives the two Swipers and the
 * accordion with Webflow/Swiper scripts; both are reimplemented here in React
 * with a CSS transition and no animation library:
 *   - slider: a translateX track, driven by the pagination bullets and by a
 *     horizontal touch swipe (this section only ever renders on touch widths).
 *   - accordion: `grid-template-rows: 0fr -> 1fr` on `[data-accordion-expand]`,
 *     which animates height without measuring it in JS. `single` means at most
 *     one row open per layer; the source's default state is all-collapsed
 *     (`.plus-toggle_icon.is-minus { display: none }` with no open item), so the
 *     accordion starts fully closed and a second click re-collapses a row.
 *
 * `.platform-slider_accordion_content` is `gap: .625rem; padding-top: .625rem`
 * with an empty CMS `<h4 class="text-label-md-bold">` as its first flex child.
 * The empty heading paints nothing but still contributes one gap, so the
 * paragraph sits 1.25rem below the trigger — reproduced here as `pt-5` rather
 * than by rendering an empty, unlabelled heading element.
 */

const IMAGES = "/sites/www-nscale-com-782295e3/root-8a5edab2/images";

interface AccordionRow {
  title: string;
  body: string;
}

interface StackCta {
  label: string;
  href: string;
  /** `.button` default vs `.button.w-variant-102d8d7c…` (transparent, no padding). */
  variant: "solid" | "ghost";
}

interface StackLayer extends PlatformLayer {
  /** `.services-slider_image` — one 1340x1822 PNG per layer. */
  image: string;
  rows: AccordionRow[];
  ctas: StackCta[];
}

/** All four slides carry `data-layer="ai_active"` in the source markup. */
const LAYERS: StackLayer[] = [
  {
    id: "nscale-cloud",
    riveLayer: "ai_active",
    title: "Nscale Cloud",
    description:
      "A managed platform for AI teams including dedicated inference, customizable Environments, managed Kubernetes and Slurm, enterprise IAM and security.",
    image: `${IMAGES}/6a722dbde41c53471bf40caa_stack-2.0-nscale-cloud-png.png`,
    rows: [
      {
        title: "AI Services",
        body: "Move from experimentation to production without managing infrastructure, using serverless or dedicated inference, fine-tuning, prompt workbench, and OpenAI-compatible APIs.",
      },
      {
        title: "Managed platform services",
        body: "Run AI workloads with less operational complexity, using Nscale Kubernetes Service (NKS) and Managed Slurm for autoscaling and predictable training queues, while Environments isolate workloads and help teams get more from reserved GPU clusters.",
      },
      {
        title: "Bare metal instances",
        body: "Reduce operational burden for intensive AI workloads with dedicated GPU nodes managed through Nscale Cloud, while reservations and placements map workloads to physical topology and NVLink domains.",
      },
    ],
    ctas: [
      {
        label: "Get Started",
        href: "https://console.nscale.com/auth/login",
        variant: "solid",
      },
      { label: "Learn more", href: "/services/ai-services", variant: "ghost" },
    ],
  },
  {
    id: "nscale-infrastructure",
    riveLayer: "ai_active",
    title: "Nscale Infrastructure",
    description:
      "Dedicated GPU infrastructure tailored to your operational requirements.",
    image: `${IMAGES}/6a722ddacc2f903fd22c5cd0_stack-2.0-nscale-metal-png.png`,
    rows: [
      {
        title: "Fleet Operations",
        body: "Keep GPU capacity productive with a fleet-wide observability platform, automated fault detection and remediation, and resource governance that maintains healthy and schedulable capacity.",
      },
      {
        title: "GPU & CPU compute",
        body: "Get the right compute configuration into production quickly, with GPU and CPU infrastructure tailored to your platform, architecture and operating model.",
      },
      {
        title: "Fast Networking & storage",
        body: "Scale workloads without bottlenecks across low-latency InfiniBand, RoCE and NVLink interconnects that keep GPUs communicating efficiently. Keep training and inference fed with AI-optimised parallel storage for predictable throughput at scale.",
      },
    ],
    ctas: [
      { label: "Reserve GPUs", href: "/contact/sales", variant: "solid" },
      {
        label: "Learn more",
        href: "/services/platform-services",
        variant: "ghost",
      },
    ],
  },
  {
    id: "nscale-data-centers",
    riveLayer: "ai_active",
    title: "Nscale Data Centers",
    description: "Purpose-built data centers engineered for AI.",
    image: `${IMAGES}/6a722e3924f1f0e6fac27d9f_stack-2.0-nscale-data.png`,
    rows: [
      {
        title: "Modular",
        body: "Expand capacity predictably with prefabricated modules designed for rapid, repeatable deployment.",
      },
      {
        title: "Liquid cooled",
        body: "Closed-loop liquid cooling removes heat efficiently to enable reliable operation for next-generation AI infrastructure.",
      },
      {
        title: "Low PUE",
        body: "Reduce facility energy overhead and operating costs through efficient power and cooling design that targets a Power Usage Effectiveness (PUE) of 1.1–1.15, leaving more power capacity for productive AI compute.",
      },
    ],
    ctas: [
      { label: "Reserve GPUs", href: "/contact/sales", variant: "solid" },
      {
        label: "Learn more",
        href: "/services/infrastructure-services",
        variant: "ghost",
      },
    ],
  },
  {
    id: "nscale-energy-power",
    riveLayer: "ai_active",
    title: "Nscale Energy & Power",
    description:
      "Dedicated energy infrastructure for faster, more resilient AI.",
    image: `${IMAGES}/6a722e5e5485394b6d893f59_stack-2.0-nscale-power-energy-png.png`,
    rows: [
      {
        title: "Behind-the-meter power",
        body: "Bring AI capacity online faster with on-site behind-the-meter generation that bypasses multi-year grid interconnection queues and reduces dependence on utility timelines.",
      },
      {
        title: "Microgrid islands",
        body: "Keep AI workloads running during grid disruption with microgrid infrastructure designed to operate independently of the utility supply.",
      },
    ],
    ctas: [
      {
        label: "Learn more",
        href: "/press-releases/nscale-acquires-american-intelligence-power-corporation",
        variant: "ghost",
      },
    ],
  },
];

/** `.section_padding` (default "large" variant) — 7.5rem, 5.5rem at <=767px. */
function SectionPadding() {
  return <div className="h-[7.5rem] max-[767px]:h-[5.5rem]" aria-hidden="true" />;
}

/** `.button` — solid uses `--background--inverse`; ghost is the 102d8d7c variant. */
function StackButton({ cta }: { cta: StackCta }) {
  return (
    <a href={cta.href} className="inline-block max-w-full">
      <div
        data-btn-hover="True"
        className={cn(
          "flex items-center justify-center gap-1 text-center font-mono text-[1rem] leading-[1.25rem] tracking-[0.02em] transition-all duration-200 hover:opacity-80",
          cta.variant === "solid"
            ? "rounded-[4px] bg-ns-bg-inverse px-4 py-[0.375rem] text-ns-content-inverse"
            : "rounded-none bg-transparent p-0 text-ns-content-primary",
        )}
      >
        <span>{cta.label}</span>
        <div>
          {/* .button_icon — 1rem wide */}
          <div className="flex w-4 items-center justify-center transition-all duration-200">
            <ArrowRightIcon className="block w-full" />
          </div>
        </div>
      </div>
    </a>
  );
}

/** `[data-accordion="single"].services-slider_accordion` */
function LayerAccordion({ rows }: { rows: AccordionRow[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div data-accordion="single" className="flex flex-col gap-4">
      {rows.map((row, index) => {
        const isOpen = open === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={row.title} data-accordion-item="">
            {/* .platform-slider_accordion_trigger */}
            <button
              type="button"
              id={triggerId}
              data-accordion-trigger=""
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 border-b border-ns-content-primary bg-transparent py-2 text-left"
            >
              <h5 className="text-[1.5rem] font-medium leading-[2rem] text-ns-content-primary max-[767px]:text-[1rem] max-[767px]:font-bold max-[767px]:leading-[1.25rem]">
                {row.title}
              </h5>
              {/* .platform-slider_accordion_plus > .plus-toggle */}
              <div className="w-4 flex-none">
                <div className="flex items-center justify-center text-ns-content-primary">
                  {isOpen ? (
                    <MinusIcon className="block w-full" />
                  ) : (
                    <PlusIcon className="block w-full" />
                  )}
                </div>
              </div>
            </button>

            {/* .platform-slider_accordion_expand */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              data-accordion-expand=""
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                {/* .platform-slider_accordion_content */}
                <div className="flex flex-col gap-[0.625rem] pt-5">
                  <p className="text-[0.875rem] leading-[1.25rem] text-ns-content-secondary">
                    {row.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function PlatformStackMobileSection() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  function handleTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? start) - start;
    if (Math.abs(delta) < 40) return;
    setActive((current) =>
      Math.min(LAYERS.length - 1, Math.max(0, current + (delta < 0 ? 1 : -1))),
    );
  }

  const track = { transform: `translate3d(-${active * 100}%, 0, 0)` };

  return (
    <section className="ns-hide-desktop relative isolate bg-ns-bg-primary">
      <SectionPadding />

      <Container>
        <div>
          {/* .section_services-slider */}
          <div
            data-platform-slider-section=""
            className="flex flex-col gap-8 overflow-hidden"
          >
            {/* .services-slider_top-wrap */}
            <div className="flex flex-col items-start justify-start gap-8">
              {/* .services-slider_title-wrap */}
              <div className="flex flex-col gap-4">
                <h2 className="text-[2rem] font-medium leading-[2.625rem] text-ns-content-primary">
                  A complete AI cloud platform
                </h2>
                <p className="text-[1rem] leading-[1.5rem] text-ns-content-secondary">
                  Deploy AI on infrastructure designed for scale, resilience,
                  and speed.
                </p>
              </div>
              <a href="/service-overview" className="inline-block max-w-full">
                <div
                  data-btn-hover="True"
                  className="flex items-center justify-center gap-1 rounded-[4px] bg-ns-bg-inverse px-4 py-[0.375rem] text-center font-mono text-[1rem] leading-[1.25rem] tracking-[0.02em] text-ns-content-inverse transition-all duration-200 hover:opacity-80"
                >
                  <span>Explore the platform</span>
                </div>
              </a>
            </div>

            {/* [data-image-swiper].services-slider_images-slider */}
            <div
              data-image-swiper=""
              className="w-full overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={track}
              >
                {LAYERS.map((layer, index) => (
                  <div
                    key={layer.id}
                    role="group"
                    aria-hidden={index !== active}
                    className="w-full flex-none"
                  >
                    <Image
                      src={layer.image}
                      alt=""
                      width={1340}
                      height={1822}
                      sizes="100vw"
                      className="h-auto w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* [data-swiper-pagination].services-slider_pagination
                `gap: .25rem` from the stylesheet, plus Swiper's 4px horizontal
                bullet margin. The bullets are not Swiper's default 8px dots —
                measured off the 375px capture they are progress-bar pills:
                four equal 72.75px tracks 4px tall with a 2px radius, spanning
                the full 335px content width (20..355), active #fff and inactive
                rgb(61,61,62) = white at 20% over #0c0c0e. */}
            <div data-swiper-pagination="" className="flex gap-1">
              {LAYERS.map((layer, index) => (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={layer.title}
                  aria-current={index === active}
                  className={cn(
                    "mx-1 h-1 flex-1 rounded-full transition-colors duration-200",
                    index === active
                      ? "bg-ns-content-primary"
                      : "bg-[rgba(255,255,255,0.2)]",
                  )}
                />
              ))}
            </div>

            {/* [data-content-swiper].services-slider_content-slider */}
            <div
              data-content-swiper=""
              className="mt-2 w-full overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex items-start transition-transform duration-500 ease-out"
                style={track}
              >
                {LAYERS.map((layer, index) => (
                  <div
                    key={layer.id}
                    className="w-full flex-none"
                    /* Off-screen panels keep their focusable buttons out of the
                       tab order and out of the accessibility tree. */
                    inert={index !== active}
                  >
                    {/* .services-slider_content_wrap */}
                    <div
                      data-layer={layer.riveLayer}
                      className="flex flex-col gap-8"
                    >
                      {/* .services-slider_content_title-wrap */}
                      <div className="flex flex-col gap-6">
                        <h3 className="text-[2rem] font-medium leading-[2.625rem] text-ns-content-primary">
                          {layer.title}
                        </h3>
                        <p className="text-[1rem] leading-[1.5rem] text-ns-content-secondary">
                          {layer.description}
                        </p>
                      </div>

                      <LayerAccordion rows={layer.rows} />

                      {/* .services-slider_cta-wrap */}
                      <div className="flex items-center justify-start gap-6">
                        {layer.ctas.map((cta) => (
                          <StackButton key={cta.label} cta={cta} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <SectionPadding />
      <SectionLines />
    </section>
  );
}
