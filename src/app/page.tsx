import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/sections/Hero";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { PROJECTS } from "@/content/projects";

const LANDING_PROJECT_COUNT = PROJECTS.length >= 20 ? 20 : PROJECTS.length;

export default function Home() {
  const featuredProjects = PROJECTS.slice(0, LANDING_PROJECT_COUNT);

  return (
    <main className="flex-1">
      <Hero />
      <Container variant="full">
        <ProjectGrid projects={featuredProjects} />
      </Container>
    </main>
  );
}
