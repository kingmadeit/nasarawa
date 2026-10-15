import type { ImageAsset } from "@/types/image";

export type HeroVariant =
  | { type: "full-image"; image: ImageAsset }
  | { type: "grid"; images: ImageAsset[] }
  | { type: "video" } // reserved — payload shape TBD once a video phase is scoped
  | { type: "3d" }; // reserved — future, no payload yet

// Stand-in photography dropped in to preview the grid variant — not final
// studio work, so alt text stays decorative until real captions land.
export const HERO: HeroVariant = {
  type: "grid",
  images: [
    { src: "/images/hero-grid-1.jpg", alt: "" },
    { src: "/images/hero-grid-2.jpg", alt: "" },
    { src: "/images/hero-grid-3.jpg", alt: "" },
    { src: "/images/hero-grid-4.jpg", alt: "" },
  ],
};
