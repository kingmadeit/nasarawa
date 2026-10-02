"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Masonry from "masonry-layout";
import type { Project } from "@/content/projects";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const gridRef = useRef<HTMLUListElement>(null);
  const masonryRef = useRef<Masonry | null>(null);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    const masonry = new Masonry(node, {
      itemSelector: "[data-masonry-item]",
      percentPosition: true,
      gutter: 0,
    });
    masonryRef.current = masonry;

    return () => {
      masonryRef.current = null;
      masonry.destroy?.();
    };
  }, [projects]);

  return (
    <ul ref={gridRef} className="relative overflow-hidden" data-masonry-grid>
      {projects.map((project) => (
        <li
          key={project.slug}
          data-masonry-item
          className="group relative w-1/2 sm:w-1/3 lg:w-1/4"
        >
          <Link
            href={`/work/${project.slug}`}
            className="relative block focus-visible:outline-offset-[-4px] focus-visible:outline-cream"
          >
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              loading="lazy"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="h-auto w-full"
              onLoad={() => masonryRef.current?.layout?.()}
            />
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
      ))}
    </ul>
  );
}
