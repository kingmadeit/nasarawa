import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { ProjectSidebar } from "@/components/work/ProjectSidebar";
import { getProjectsTitleAndLabel } from "@/content/projects";

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const projects = getProjectsTitleAndLabel();

  return (
    <Container variant="full" className="flex flex-col lg:flex-row">
      <MobileNav>
        <ProjectSidebar projects={projects} />
      </MobileNav>
      {children}
    </Container>
  );
}
