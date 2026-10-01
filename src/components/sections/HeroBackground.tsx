import type { HeroVariant } from "@/content/hero";
import { HeroFullImage } from "./HeroFullImage";
import { HeroGrid } from "./HeroGrid";

interface HeroBackgroundProps {
  variant: HeroVariant;
}

export function HeroBackground({ variant }: HeroBackgroundProps) {
  switch (variant.type) {
    case "full-image":
      return <HeroFullImage image={variant.image} />;
    case "grid":
      return <HeroGrid images={variant.images} />;
    case "video":
    case "3d":
      throw new Error(`Hero variant "${variant.type}" is not implemented yet.`);
  }
}
