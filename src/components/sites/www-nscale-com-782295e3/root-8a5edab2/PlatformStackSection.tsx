"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alignment,
  Fit,
  Layout,
  useRive,
  type UseRiveParameters,
} from "@rive-app/react-canvas";

import { Container } from "@/components/sites/www-nscale-com-782295e3/shared/layout";
import { SectionLines } from "@/components/sites/www-nscale-com-782295e3/shared/SectionLines";
import { ArrowRightIcon } from "@/components/sites/www-nscale-com-782295e3/shared/icons";
import { cn } from "@/lib/utils";
import type { PlatformLayer } from "@/types/nscale";

/**
 * `.section_services-stack2` — "A complete AI cloud platform".
 *
 * Desktop only: the source section carries `hide-tablet hide-mobile`, so it is
 * painted at >=992px and a separate `PlatformStackMobileSection` covers below.
 *
 * INTERACTION MODEL — hover, not scroll and not click. A Rive canvas
 * (`Artboard` / `LayerController` state machine, `autoBind: true`) sits in the
 * left grid column and the four link cards sit in the right one. The binding
 * runs both ways through `rive.viewModelInstance`:
 *
 *   - card `mouseenter`  ->  set `<key>_hovered` true, the other three false
 *   - `<key>_hovered` observed  ->  the matching card gets `.is-active`
 *   - `<key>_clicked` observed  ->  navigate to that card's href
 *
 * so hovering a card drives the artwork and hovering the artwork highlights the
 * card. The four keys are `cloud`, `infrastructure`, `dc` (NOT `data-centers`)
 * and `energy`, in DOM order.
 *
 * The canvas is a pure enhancement: `viewModelInstance` is null until the file
 * loads, every access is guarded, and if the `.riv` never arrives the cards
 * still render, still highlight on hover, and are still ordinary links.
 */

const RIVE_SRC =
  "/sites/www-nscale-com-782295e3/root-8a5edab2/rive/6a72243af8c76e6552945a54_6a71c8fd5f921f9d8e0f5fb4_nscale-stack_v2.riv";

/**
 * Lifted verbatim from the site's own bundle. Kept at module scope so the
 * object identity is stable — `useRive` captures the params on first render.
 */
const RIVE_PARAMS: UseRiveParameters = {
  src: RIVE_SRC,
  artboard: "Artboard",
  stateMachines: "LayerController",
  autoBind: true,
  autoplay: true,
  layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
};

/**
 * The source sizes the canvas itself (140% wide, 1000px min-height) and calls
 * `resizeDrawingSurfaceToCanvas()` by hand, so the hook's container-fitting is
 * off here.
 */
const RIVE_OPTIONS = { shouldResizeCanvasToContainer: false };

interface StackLayer extends PlatformLayer {
  /** Prefix of the `_hovered` / `_clicked` data-bound properties. */
  riveLayer: string;
  href: string;
}

const LAYERS: StackLayer[] = [
  {
    id: "cloud",
    riveLayer: "cloud",
    href: "/services/ai-services",
    title: "Nscale Cloud",
    description:
      "A managed platform for AI teams including dedicated inference, customizable Environments, managed Kubernetes and Slurm, enterprise IAM and security.",
  },
  {
    id: "infrastructure",
    riveLayer: "infrastructure",
    href: "/services/platform-services",
    title: "Nscale Infrastructure",
    description:
      "Dedicated GPU infrastructure with a choice of operational models depending on the customers requirements.",
  },
  {
    id: "dc",
    riveLayer: "dc",
    href: "/services/infrastructure-services",
    title: "Nscale Data Centers",
    description:
      "Predictable capacity provided by modular, multi-megawatt data centers with sovereign controls.",
  },
  {
    id: "energy",
    riveLayer: "energy",
    href: "/press-releases/nscale-acquires-american-intelligence-power-corporation",
    // "Nscale Energy &amp; Power" in the source — a literal ampersand.
    title: "Nscale Energy & Power",
    description:
      "Design and development of behind-the-meter power and grid connected land.",
  },
];

/** `.section_padding` — 7.5rem, 5.5rem at <=767px. */
function SectionPadding() {
  return <div className="h-[7.5rem] max-[767px]:h-[5.5rem]" aria-hidden="true" />;
}

export function PlatformStackSection() {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string | null>(null);

  // `rive` is only populated once the file has loaded, so a non-null value
  // means `viewModelInstance` is available — it is still guarded below.
  const { rive, setCanvasRef } = useRive(RIVE_PARAMS, RIVE_OPTIONS);

  // onLoad + every window resize: match the drawing surface to the CSS box.
  useEffect(() => {
    if (!rive) return;

    const resize = () => {
      try {
        rive.resizeDrawingSurfaceToCanvas();
      } catch {
        // The instance can be torn down mid-flight; nothing to recover.
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [rive]);

  // The reverse half of the binding: observe `<key>_hovered` so hovering the
  // artwork highlights the card, and `<key>_clicked` so clicking it navigates.
  useEffect(() => {
    const viewModel = rive?.viewModelInstance;
    if (!viewModel) return;

    const teardown: Array<() => void> = [];

    for (const layer of LAYERS) {
      const hovered = viewModel.boolean(`${layer.riveLayer}_hovered`);
      if (hovered) {
        // Rive hands the boolean's value to the callback; the runtime types it
        // as its generic event payload, so widen rather than lie about it.
        const onHovered = (value: unknown) => {
          if (value === true) {
            setActiveId(layer.id);
          } else {
            setActiveId((current) => (current === layer.id ? null : current));
          }
        };
        hovered.on(onHovered);
        teardown.push(() => hovered.off(onHovered));
      }

      const clicked = viewModel.trigger(`${layer.riveLayer}_clicked`);
      if (clicked) {
        const onClicked = () => router.push(layer.href);
        clicked.on(onClicked);
        teardown.push(() => clicked.off(onClicked));
      }
    }

    return () => {
      for (const off of teardown) {
        try {
          off();
        } catch {
          // Property handles die with the instance; unsubscribing is best-effort.
        }
      }
    };
  }, [rive, router]);

  // The forward half: a card's mouseenter drives the artwork. `setActiveId`
  // runs first so the highlight is correct even with no canvas.
  const handleEnter = useCallback(
    (layer: StackLayer) => {
      setActiveId(layer.id);

      const viewModel = rive?.viewModelInstance;
      if (!viewModel) return;

      for (const other of LAYERS) {
        const hovered = viewModel.boolean(`${other.riveLayer}_hovered`);
        if (hovered) hovered.value = other.id === layer.id;
      }
    },
    [rive],
  );

  return (
    <section className="ns-hide-tablet ns-hide-mobile relative isolate bg-ns-bg-secondary">
      <SectionPadding />

      <Container>
        <div>
          {/* .section_services-stack2 */}
          <div className="flex flex-col items-center justify-start gap-4">
            {/* .body-content.is-center */}
            <div className="flex max-w-[37.75rem] flex-col items-center justify-start gap-8 text-center max-[767px]:max-w-none">
              {/* .body-content_copy */}
              <div className="flex max-w-[37.75rem] flex-col gap-6">
                {/* .body-content_title-wrap — "reversed" variant: column-reverse, .25rem gap */}
                <div className="flex flex-col-reverse gap-1">
                  <h2 className="text-[3rem] font-medium leading-[3.25rem] text-ns-content-primary max-[767px]:text-[2rem] max-[767px]:leading-[2.625rem]">
                    A complete AI cloud platform
                  </h2>
                </div>
                {/* .body-content_desc */}
                <div className="text-ns-content-secondary">
                  <div className="flex flex-col gap-6">
                    <p>
                      Deploy AI on infrastructure designed for scale, resilience,
                      and speed.
                    </p>
                  </div>
                </div>
              </div>

              {/* .body-content_buttons */}
              <div className="flex items-center justify-start gap-6 max-[767px]:flex-col max-[767px]:items-stretch">
                <a href="/service-overview" className="inline-block max-w-full">
                  {/* .button — solid variant */}
                  <div className="flex items-center justify-center gap-1 rounded-[4px] bg-ns-bg-inverse px-4 py-1.5 text-center font-mono text-[1rem] leading-[1.25rem] tracking-[0.02em] text-ns-content-inverse transition-all duration-200 hover:opacity-80">
                    <span>Explore the platform</span>
                    <div>
                      {/* .button_icon */}
                      <div className="flex w-4 items-center justify-center transition-all duration-200">
                        <ArrowRightIcon />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* .services-stack2_wrap */}
            <div className="grid w-full grid-cols-2 gap-0">
              {/* .services-stack2_rive-canvas — deliberately overflows its column */}
              <canvas
                ref={setCanvasRef}
                aria-hidden="true"
                className="ml-[-15%] block h-full min-h-[1000px] w-[140%]"
              />

              {/* .services-stack2_items-wrap */}
              <div className="relative z-[1] flex w-full flex-col items-stretch justify-center gap-6 pl-4">
                {LAYERS.map((layer) => (
                  <a
                    key={layer.id}
                    href={layer.href}
                    data-layer={layer.riveLayer}
                    onMouseEnter={() => handleEnter(layer)}
                    className={cn(
                      // .services-stack2_item
                      "flex w-full flex-col gap-4 rounded-[6px] border border-ns-border-secondary bg-ns-bg-secondary p-6 text-ns-content-primary opacity-60 transition-all duration-200 ease-[cubic-bezier(0.215,0.61,0.355,1)]",
                      // CSS fallback so the highlight still works with no canvas
                      "hover:opacity-100",
                      // .is-active, driven by the Rive `<key>_hovered` observer
                      activeId === layer.id && "opacity-100",
                    )}
                  >
                    <h3 className="text-[2rem] font-medium leading-[2.625rem]">
                      {layer.title}
                    </h3>
                    <p className="text-[1.125rem] leading-[1.625rem]">
                      {layer.description}
                    </p>
                  </a>
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
