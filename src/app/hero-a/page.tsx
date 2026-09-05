import type { Metadata } from "next";
import { HomeComposition } from "@/components/sites/daita/daita-site/HomeComposition";
import { HeroVariantSwitcher } from "@/components/sites/daita/daita-site/HeroVariantSwitcher";

/**
 * Hero variant A. The shipped headline, kept as the control.
 *
 * Everything below the hero comes from `HomeComposition` and is identical across
 * `/hero-a`, `/hero-b` and `/hero-c`; only the h1 differs. Eyebrow, subtitle, CTAs
 * and the hero film are held constant so the test measures the headline and nothing
 * else.
 *
 * Not for production traffic: `noindex, nofollow` here, absent from `sitemap.ts`, and
 * disallowed in `robots.ts`.
 */
export const metadata: Metadata = {
  title: "Hero variant A — DAITA",
  robots: { index: false, follow: false },
};

export default function HeroVariantA() {
  return (
    <HomeComposition hero={{ title: "Coordinator" }}>
      <HeroVariantSwitcher current="a" />
    </HomeComposition>
  );
}
