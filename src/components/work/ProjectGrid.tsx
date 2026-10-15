import type { Project } from "@/content/projects";
import { ProjectTile } from "./ProjectTile";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectTile project={project} key={project.slug} />
      ))}
    </ul>
  );
}
