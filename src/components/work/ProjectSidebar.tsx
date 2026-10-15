import { ContactLinks } from "@/components/layout/ContactLinks";
import { Logo } from "@/components/layout/Logo";
import type { Project } from "@/content/projects";
import { ENTRANCE_GROUP_DELAY_MS, entranceDelayStyle } from "@/lib/entrance";
import { ProjectLinks } from "./ProjectLinks";

interface ProjectSidebarProps {
  projects: Partial<Project>[];
}

export function ProjectSidebar({ projects }: ProjectSidebarProps) {
  return (
    <aside
      className="flex w-full flex-col overflow-y-auto px-10 py-16"
      data-entrance="sidebar-panel"
      style={entranceDelayStyle(ENTRANCE_GROUP_DELAY_MS)}
    >
      <Logo />
      <ProjectLinks projects={projects} />
      <ContactLinks />
    </aside>
  );
}
