import Image from "next/image";
import type { ImageAsset } from "@/types/image";

interface HeroFullImageProps {
  image: ImageAsset;
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
