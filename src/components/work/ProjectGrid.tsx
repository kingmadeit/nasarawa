import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li key={project.slug} className="group relative" data-scroll-reveal>
          <Link
            href={`/work/${project.slug}`}
            className="relative block aspect-[3/4] focus-visible:outline-offset-[-4px] focus-visible:outline-cream"
          >
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
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
