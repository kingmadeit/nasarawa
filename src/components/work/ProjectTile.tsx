"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import type { Project } from "@/content/projects";
import { canUseHoverMotion } from "@/lib/pointerCapabilities";
import { getProjectImageViewTransitionName, supportsViewTransitions } from "@/lib/view-transition";

const TILE_MAX_TRANSLATE_PX = 10;
const IMAGE_MAX_TRANSLATE_PX = 14;
const IMAGE_REST_SCALE = 1.08;
const IMAGE_REST_TRANSFORM = `scale(${IMAGE_REST_SCALE})`;

interface ProjectTileProps {
  project: Project;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function ProjectTile({ project }: ProjectTileProps) {
  const router = useRouter();
  const tileRef = useRef<HTMLLIElement>(null);
  const pictureRef = useRef<HTMLImageElement>(null);
  const href = `/work/${project.slug}`;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!supportsViewTransitions()) return;

    event.preventDefault();
    document.startViewTransition(() => router.push(href));
  };

  useEffect(() => {
    const tile = tileRef.current;
    const picture = pictureRef.current;
    if (!tile || !picture) return;

    if (!canUseHoverMotion()) return;

    // The resting scale must be re-applied (not just cleared) on every
    // write, since setting `style.transform` imperatively replaces the
    // whole transform — it doesn't merge with a Tailwind transform class,
    // so a persistent `scale-*` utility class here would get clobbered.
    picture.style.transform = IMAGE_REST_TRANSFORM;

    const resetTransforms = () => {
      tile.style.transform = "";
      picture.style.transform = IMAGE_REST_TRANSFORM;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = tile.getBoundingClientRect();
      const normalizedX = clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2), -1, 1);
      const normalizedY = clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2), -1, 1);

      tile.style.transform = `translate(${normalizedX * TILE_MAX_TRANSLATE_PX}px, ${normalizedY * TILE_MAX_TRANSLATE_PX}px)`;
      picture.style.transform = `${IMAGE_REST_TRANSFORM} translate(${-normalizedX * IMAGE_MAX_TRANSLATE_PX}px, ${-normalizedY * IMAGE_MAX_TRANSLATE_PX}px)`;
    };

    const handlePointerLeave = () => {
      resetTransforms();
    };

    tile.addEventListener("pointermove", handlePointerMove);
    tile.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      tile.removeEventListener("pointermove", handlePointerMove);
      tile.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <li
      ref={tileRef}
      className="group relative transition-transform duration-200 ease-out will-change-transform"
    >
      <Link
        href={href}
        onClick={handleClick}
        className="relative block aspect-[3/4] focus-visible:outline-offset-[-4px] focus-visible:outline-cream"
      >
        <div
          data-logo-reveal
          className="absolute inset-0 overflow-hidden"
          style={{ viewTransitionName: getProjectImageViewTransitionName(project.slug) }}
        >
          <Image
            ref={pictureRef}
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-200 ease-out will-change-transform"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end gap-1 bg-black/40 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          {project.category && (
            <span className="text-xs uppercase tracking-wide text-cream">
              {project.category}
            </span>
          )}
          <h3 className="font-accent text-xl text-white">{project.title}</h3>
          {project.description && (
            <p className="text-sm text-white/80">{project.description}</p>
          )}
        </div>
      </Link>
    </li>
  );
}
