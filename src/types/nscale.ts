/** Content interfaces for the nscale.com homepage clone (site-key www-nscale-com-782295e3). */

export interface NewsCard {
  /** Card artwork shown above the headline. */
  image: string;
  imageAlt: string;
  title: string;
  href: string;
  /** Link label — "Learn more" on every card of the source page. */
  cta: string;
}

export interface PlatformLayer {
  id: string;
  title: string;
  description: string;
  /** Matches the layer name inside the Rive artboard so the canvas can sync. */
  riveLayer?: string;
}

export interface VideoCard {
  title: string;
  /** Both codecs are shipped; the browser picks via <source type>. */
  mp4: string;
  webm: string;
  poster: string;
}

export interface PartnerLogo {
  name: string;
  src: string;
  /** Intrinsic width in px, used to keep optical sizing consistent. */
  width: number;
  height: number;
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

export interface IndustrySolution {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
}

export interface StoryCard {
  image: string;
  imageAlt: string;
  title: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  /** Optional sub-groups, e.g. "Nscale Data Centers" / "Partner-run Data Centers". */
  groups: { label?: string; links: FooterLink[] }[];
}

export interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  items?: NavDropdownItem[];
}
