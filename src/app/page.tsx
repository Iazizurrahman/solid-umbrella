import { HomeComposition } from "@/components/sites/daita/daita-site/HomeComposition";

/**
 * DAITA homepage.
 *
 * Twelve sections, in the order the rebrand brief defines them:
 *   header · hero · what's live today · what DAITA does (desktop + mobile) ·
 *   why DAITA · integrations · testimonial · who it's for · FAQ · CTA · footer
 *
 * The composition itself lives in `HomeComposition` so the hero variant test routes
 * render exactly the same page below the fold. This route passes no hero overrides and
 * therefore renders the shipped hero copy.
 */
export default function Home() {
  return <HomeComposition />;
}
