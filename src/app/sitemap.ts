import type { MetadataRoute } from "next";

/**
 * The four real routes. The hero variant routes are deliberately absent — see
 * `robots.ts`.
 */
const BASE = "https://www.daitalabs.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/platform`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/our-story`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];
}
