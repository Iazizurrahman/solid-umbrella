import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/sites/www-nscale-com-782295e3/shared/icons";
import { Container } from "@/components/sites/www-nscale-com-782295e3/shared/layout";
import { SectionLines } from "@/components/sites/www-nscale-com-782295e3/shared/SectionLines";
import type { NewsCard } from "@/types/nscale";

const IMAGE_BASE = "/sites/www-nscale-com-782295e3/root-8a5edab2/images";

/**
 * The four `.blog-card` entries rendered by the Webflow CMS list, in source order.
 * Artwork filenames keep the Webflow asset hash of the original `<img src>`.
 */
const NEWS_CARDS: NewsCard[] = [
  {
    image: `${IMAGE_BASE}/6a996c9daa69ccc1a7cb4771_newsroom-templates-23-.png`,
    imageAlt: "",
    title:
      "Nscale and Figure Sign Strategic Partnership to Power the Next Generation of Physical AI",
    href: "/press-releases/nscale-and-figure",
    cta: "Learn more",
  },
  {
    image: `${IMAGE_BASE}/6a959eeeecadeb8de0762d70_newsroom-templates-21-.png`,
    imageAlt: "",
    title:
      "Nscale Closes Approximately $3 Billion in Financing for Both Ward County, Texas and Madison, North Carolina AI Deployments",
    href: "/press-releases/nscale-3-billion-delayed-draw-term-loans",
    cta: "Learn more",
  },
  {
    image: `${IMAGE_BASE}/6a8f4bb546e53814b7c0a936_newsroom-templates-10-.png`,
    imageAlt: "",
    title:
      "Nscale Announces Initial $500,000 Gift to Advance STEM and Skilled-Trades Education in Mason County",
    href: "/press-releases/nscale-stem-skilled-trades-gift-mason-county",
    cta: "Learn more",
  },
  {
    image: `${IMAGE_BASE}/6a7b8fa971988ad21dbcd7bc_6a69e15f1b842864f4314c0c_socials_-nscale-10-.png`,
    imageAlt: "",
    title: "Nscale Acquires Anyscale, Enhancing its Full Stack AI Cloud Platform",
    href: "/press-releases/nscale-acquires-anyscale",
    cta: "Learn more",
  },
];

/**
 * "Latest news" — `.section_featured-blog`: an h2 followed by a four-across row of
 * `.blog-card` links. Cards stretch to equal height and the "Learn more" button is
 * pushed to the bottom with `margin-top: auto`, so every CTA shares a baseline.
 */
export function LatestNewsSection() {
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
                    Latest news
                  </h2>
                </div>
              </div>
            </div>

            {/* .featured-blog_collection */}
            <div className="max-md:w-full">
              {/* .swiper-wrapper.is-featured-blog */}
              <ul
                role="list"
                className="grid grid-cols-4 gap-4 max-md:grid-flow-col max-md:auto-cols-[85%] max-md:grid-cols-none max-md:snap-x max-md:snap-mandatory max-md:gap-0 max-md:overflow-x-auto"
              >
                {NEWS_CARDS.map((card) => (
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
                        <h3 className="text-[1.5rem] leading-[2rem] font-medium text-ns-content-primary">
                          {card.title}
                        </h3>

                        {/* .button (ghost variant) */}
                        <div className="mt-auto flex items-center justify-center gap-1 text-center font-mono text-[1rem] leading-[1.25rem] tracking-[0.02em] text-ns-content-primary transition-all duration-200 hover:opacity-80">
                          <span>{card.cta}</span>
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
