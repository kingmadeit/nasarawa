import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/sections/Hero";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { ProjectSidebar } from "@/components/work/ProjectSidebar";
import { PROJECTS } from "@/content/projects";

const LANDING_PROJECT_COUNT = PROJECTS.length >= 20 ? 20 : PROJECTS.length;

export default function Home() {
  const featuredProjects = PROJECTS.slice(0, LANDING_PROJECT_COUNT);

  return (
    <main className="flex-1">
      {/* <Hero /> */}
      <Container variant="full" className="flex flex-col lg:flex-row">
        <ProjectSidebar
          projects={featuredProjects}
          className="lg:sticky lg:top-0 lg:w-80 lg:shrink-0 lg:self-start"
        />
        <div className="flex-1">
          <ProjectGrid projects={featuredProjects} />
        </div>
      </Container>
    </main>
  );
}
