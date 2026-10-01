import Image from "next/image";
import type { HeroImage } from "@/content/hero";

interface HeroFullImageProps {
  image: HeroImage;
}

export function HeroFullImage({ image }: HeroFullImageProps) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />
  );
}
