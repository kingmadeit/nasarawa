import { ProjectGrid } from "@/components/work/ProjectGrid";
import { getFeaturedProjects } from "@/content/projects";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <main className="flex-1">
      {/* <Hero /> */}
      <ProjectGrid projects={featuredProjects} />
    </main>
  );
}
