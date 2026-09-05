import Image from "next/image";
import Link from "next/link";

import { SectionLines } from "@/components/sites/www-nscale-com-782295e3/shared/SectionLines";
import { ArrowRightIcon } from "@/components/sites/www-nscale-com-782295e3/shared/icons";
import { Container } from "@/components/sites/www-nscale-com-782295e3/shared/layout";
import type { StoryCard } from "@/types/nscale";

const IMAGE_BASE = "/sites/www-nscale-com-782295e3/root-8a5edab2/images";

/** Every card carries the same ghost-button label on the source page. */
const CTA_LABEL = "Learn more";

/**
 * The four `.blog-card` entries rendered by the `data-featured-blogs-swiper`
 * CMS list, in source order. Artwork filenames keep the Webflow asset hash of
 * the original `<img src>`.
 */
const STORY_CARDS: StoryCard[] = [
  {
    image: `${IMAGE_BASE}/6a8ef8958ec18451d3a4d1cd_ttft-raise-blog_v1.png`,
    imageAlt: "",
    title: "What time to first token reveals about AI performance",
    href: "/blog/what-time-to-first-token-reveals-about-ai-performance",
  },
  {
    image: `${IMAGE_BASE}/6a982347430473b97203fe9a_chad-with-fleet-operations-copy.png`,
    imageAlt: "",
    title: "The GPU fleet that fixes itself",
    href: "/blog/the-gpu-fleet-that-fixes-itself",
  },
  {
    image: `${IMAGE_BASE}/6a88618ff884b22d23643229_the-product-is-the-growth-engine-blog_v1-1-.png`,
    imageAlt: "",
    title: "The product is the growth engine",
    href: "/blog/the-product-is-the-growth-engine",
  },
  {
    image: `${IMAGE_BASE}/6a7ecf47a918e9784b157aad_ttft-seo-blog_v1.png`,
    imageAlt: "",
    title: "What is time to first token (TTFT)?",
    href: "/blog/what-is-time-to-first-token",
  },
];

/**
 * "Latest stories" — `.section_featured-blog`: an h2 followed by four `.blog-card`
 * links.
 *
 * The list is marked `data-featured-blogs-swiper`, but the site only instantiates
 * Swiper inside `gsap.matchMedia().add("(max-width: 767px)", …)` and destroys it
 * again above 767px. So desktop is a plain static four-column grid (no carousel,
 * no buttons, no pagination) and mobile is the 1.3-slides / 12px-gap track, which
 * is reproduced here as a CSS scroll-snap overflow container so no JS is needed.
 *
 * Cards stretch to equal height and the "Learn more" button is pushed to the
 * bottom with `margin-top: auto`, so every CTA shares a baseline despite the
 * headlines differing in length.
 */
export function LatestStoriesSection() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* .section_padding (base variant: 7.5rem / 5.5rem) */}
      <div className="h-[7.5rem] max-md:h-[5.5rem]" />

      <Container>
        <div>
          {/* .section_featured-blog */}
          <div className="flex flex-col gap-10">
            {/* .body-content > .body-content_copy > .body-content_title-wrap */}
            <div className="flex max-w-[37.75rem] flex-col gap-8 max-md:max-w-none">
              <div className="flex max-w-[37.75rem] flex-col gap-6">
                <div className="flex flex-col gap-6">
                  <h2 className="text-[3rem] leading-[3.25rem] font-medium text-ns-content-primary max-md:text-[2rem] max-md:leading-[2.625rem]">
                    Latest stories
                  </h2>
                </div>
              </div>
            </div>

            {/* .featured-blog_collection */}
            <div className="max-md:w-full">
              {/* .swiper-wrapper.is-featured-blog — grid at >=768px, scroll-snap
                  track at <=767px reproducing slidesPerView 1.3 / spaceBetween 12 */}
              <ul
                role="list"
                className="grid grid-cols-4 gap-4 max-md:grid-flow-col max-md:auto-cols-[calc((100%-3.6px)/1.3)] max-md:grid-cols-none max-md:snap-x max-md:snap-mandatory max-md:gap-3 max-md:overflow-x-auto max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden"
              >
                {STORY_CARDS.map((card) => (
                  <li key={card.href} className="flex max-md:snap-start">
                    {/* .blog-card */}
                    <Link
                      href={card.href}
                      className="flex h-full w-full max-w-full flex-col gap-4 rounded-[8px] border border-ns-border-secondary bg-ns-bg-primary transition-all duration-200 hover:border-ns-border-primary max-md:gap-3"
                    >
                      {/* .blog-card_image */}
                      <Image
                        src={card.image}
                        alt={card.imageAlt}
                        width={296}
                        height={160}
                        className="aspect-[296/160] w-full rounded-[4px] object-cover"
                      />

                      {/* .blog-card_content-wrap */}
                      <div className="flex flex-1 flex-col items-start justify-between gap-8 p-6 max-md:gap-6 max-md:p-4">
                        <h3 className="text-[1.5rem] leading-[2rem] font-medium text-ns-content-primary max-md:text-[1.5rem] max-md:leading-[2rem]">
                          {card.title}
                        </h3>

                        {/* .button (ghost variant) */}
                        <div className="mt-auto flex items-center justify-center gap-1 text-center font-mono text-[1rem] leading-[1.25rem] tracking-[0.02em] text-ns-content-primary transition-all duration-200 hover:opacity-80">
                          <span>{CTA_LABEL}</span>
                          <div>
                            {/* .button_icon */}
                            <div className="flex w-4 items-center justify-center transition-all duration-200">
                              <ArrowRightIcon />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* .section_padding */}
      <div className="h-[7.5rem] max-md:h-[5.5rem]" />

      {/* .section_lines */}
      <SectionLines />

      {/* .section_color */}
      <div className="absolute inset-0 -z-30 h-full w-full bg-ns-bg-primary" />
    </section>
  );
}
