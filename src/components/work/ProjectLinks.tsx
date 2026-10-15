import Link from "next/link";
import type { Project } from "@/content/projects";
import { staggerDelayStyle } from "@/lib/entrance";

interface ProjectLinksProps {
  projects: Partial<Project>[];
}

export function ProjectLinks({ projects }: ProjectLinksProps) {
  return (
    <nav aria-label="Projects">
      <ul className="flex flex-col gap-2 text-md">
        {projects.map((project, index) => (
          <li key={project.slug} data-entrance="fade-up" style={staggerDelayStyle(index)}>
            <Link
              href={`/work/${project.slug}`}
              className="font-accent transition-colors text-army font-bold scale-125"
            >
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
