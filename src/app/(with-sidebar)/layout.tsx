import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { ProjectSidebar } from "@/components/work/ProjectSidebar";
import { getFeaturedProjects, getProjectsTitleAndLabel } from "@/content/projects";

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const featuredProjects = getFeaturedProjects();
  const projects = getProjectsTitleAndLabel();

  return (
    <Container variant="full" className="flex flex-col lg:flex-row">
      <ProjectSidebar
        projects={projects}
        className="lg:sticky lg:top-0 lg:w-80 lg:shrink-0 lg:self-start"
      />
      {children}
    </Container>
  );
}
