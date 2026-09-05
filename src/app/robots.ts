import type { MetadataRoute } from "next";

/**
 * The three hero variant routes are experiments, not pages. They are `noindex,
 * nofollow` in their own metadata, absent from `sitemap.ts`, and disallowed here as
 * well — belt and braces, because a crawler that finds one through a shared link
 * should not index a second copy of the homepage.
 */
export const HERO_TEST_PATHS = ["/hero-a", "/hero-b", "/hero-c"] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: [...HERO_TEST_PATHS] }],
    sitemap: "https://www.daitalabs.com/sitemap.xml",
    host: "https://www.daitalabs.com",
  };
}
