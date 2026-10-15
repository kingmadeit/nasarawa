import Image from "next/image";
import type { ImageAsset } from "@/types/image";

interface HeroGridProps {
  images: ImageAsset[];
}

export function HeroGrid({ images }: HeroGridProps) {
  return (
    <ul className="absolute inset-0 grid auto-rows-fr grid-cols-2 gap-1 sm:grid-cols-4">
      {images.map((image) => (
        <li key={image.src} className="relative overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 640px) 25vw, 50vw"
            className="object-cover"
          />
        </li>
      ))}
    </ul>
  );
}
