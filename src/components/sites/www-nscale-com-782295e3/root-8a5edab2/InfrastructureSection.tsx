import { Container } from "@/components/sites/www-nscale-com-782295e3/shared/layout";
import { SectionLines } from "@/components/sites/www-nscale-com-782295e3/shared/SectionLines";
import type { VideoCard } from "@/types/nscale";

/**
 * `.section_video-cards` — "Infrastructure for advanced  intelligence at scale".
 *
 * Five `.video-card`s (3 + 2 at desktop, stacked at <=767px). Each card is a real
 * looping background video (`.video-card_video.w-background-video`), not an image:
 * the source ships an mp4 + webm pair plus a poster frame per card, all mirrored
 * locally under /sites/www-nscale-com-782295e3/root-8a5edab2/.
 *
 * The `.video-card_desc` copy lives inside `[data-expand].video-card_expand`, which
 * the source keeps collapsed (`overflow: hidden`, height driven to 0 by Webflow's
 * interaction script) — the descriptions are in the DOM but never painted on the
 * homepage, which is why the reference screenshot shows title-only cards.
 */

const ASSETS = "/sites/www-nscale-com-782295e3/root-8a5edab2";
const CDN_PREFIX = "666078e26595dfe9b1e8171f-";

interface InfrastructureCard extends VideoCard {
  /** `.video-card_desc` copy — present in the DOM, collapsed to height 0. */
  description: string;
}

/** Builds the local triplet from the shutterstock slug in `data-video-urls`. */
function assets(slug: string): Pick<VideoCard, "mp4" | "webm" | "poster"> {
  return {
    mp4: `${ASSETS}/videos/${CDN_PREFIX}${slug}_mp4.mp4`,
    webm: `${ASSETS}/videos/${CDN_PREFIX}${slug}_webm.webm`,
    poster: `${ASSETS}/images/${CDN_PREFIX}${slug}_poster.0000000.jpg`,
  };
}

const CARDS: InfrastructureCard[] = [
  {
    title: "Designed to deliver scale",
    description:
      "Through our abundant and renewable power resources and the most advanced technology, we deliver scalable AI capacity at a low cost point.",
    ...assets("697c82bba5edd1c94eb95717_shutterstock_3787623545"),
  },
  {
    // The source h3 carries a trailing space; kept verbatim.
    title: "Architected for efficiency ",
    description:
      "A unified system designed for efficient deployment and stable operations, from supply chain to AI workloads.",
    ...assets("697c82c7f061bb6a689dabf2_shutterstock_3881822535"),
  },
  {
    title: "Proven through partnerships",
    description:
      "Deep partnerships with AI and infrastructure leaders power trusted deployments today and shared R&D that advances what’s possible at scale.",
    ...assets("697c82d0be15ac9b55983e3a_shutterstock_1103292547"),
  },
  {
    title: "Engineered for resilience",
    description:
      "Designed with compliance and sovereignty at the core, supported by durable local partnerships that ensure resilient operations and predictable access across jurisdictions.",
    ...assets("697c82d87be2c49bd158e307_shutterstock_3798669997"),
  },
  {
    title: "Optimized for rapid execution",
    description:
      "Modular design, reserved capacity, and AI-native operations deliver repeatable deployment velocity and first access to the latest models and technology.",
    ...assets("697c82e6de5fa540fed56a22_shutterstock_1109864221"),
  },
];

/** `.section_padding` — 7.5rem, 5.5rem at <=767px. */
function SectionPadding() {
  return <div className="h-[7.5rem] max-[767px]:h-[5.5rem]" aria-hidden="true" />;
}

export function InfrastructureSection() {
  return (
    <section className="relative isolate bg-ns-bg-primary">
      <SectionPadding />

      <Container>
        <div>
          {/* .section_video-cards */}
          <div className="flex flex-col gap-10 max-[767px]:gap-8">
            {/* .body-content */}
            <div className="flex max-w-[37.75rem] flex-col gap-8 max-[767px]:max-w-none">
              {/* .body-content_copy */}
              <div className="flex max-w-[37.75rem] flex-col gap-6">
                {/* .body-content_title-wrap */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-[3rem] font-medium leading-[3.25rem] text-ns-content-primary max-[767px]:text-[2rem] max-[767px]:leading-[2.625rem]">
                    {/* Two U+00A0 non-breaking spaces after "advanced" — they do
                        not collapse, which is the wide gap in the reference shot. */}
                    {"Infrastructure for advanced\u00a0\u00a0intelligence at scale"}
                  </h2>
                </div>
                {/* .body-content_desc */}
                <div className="text-ns-content-secondary">
                  <div className="flex flex-col gap-6">
                    <p>
                      Stay ahead of demand with scalable capacity and consistent
                      performance
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* .video-cards_list-wrap */}
            <div className="grid grid-cols-3 gap-4 max-[767px]:flex max-[767px]:flex-col max-[767px]:gap-[0.625rem]">
              {CARDS.map((card) => (
                <div
                  key={card.title}
                  className="flex aspect-[400/480] w-full min-w-0 flex-col justify-start gap-4 rounded-[8px] border border-ns-border-glass-primary bg-ns-bg-glass-primary p-4"
                >
                  {/* .video-card_video.w-background-video */}
                  <div className="relative z-[2] block w-full flex-1 overflow-hidden rounded-[6px] text-white max-[991px]:min-h-0">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={card.poster}
                      className="absolute inset-[-100%] z-[-100] m-auto h-full w-full bg-cover bg-center object-cover"
                    >
                      <source src={card.webm} type="video/webm" />
                      <source src={card.mp4} type="video/mp4" />
                    </video>
                  </div>

                  {/* .video-card_copy */}
                  <div>
                    <h3 className="text-[1.5rem] font-medium leading-[2rem] text-ns-content-primary">
                      {card.title}
                    </h3>
                    {/* .video-card_expand — collapsed on the live homepage */}
                    <div className="h-0 overflow-hidden">
                      <div className="pt-2">
                        <p className="text-[0.875rem] leading-[1.25rem] text-ns-content-primary">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <SectionPadding />
      <SectionLines />
    </section>
  );
}
