import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { PROJECT_CATEGORIES, PROJECTS } from "@/content/projects";

export default async function WorkPage(props: PageProps<"/work">) {
  const { category } = await props.searchParams;
  const activeCategory =
    typeof category === "string" && PROJECT_CATEGORIES.includes(category)
      ? category
      : undefined;

  const visibleProjects = activeCategory
    ? PROJECTS.filter((project) => project.category === activeCategory)
    : PROJECTS;

  return (
    <main className="flex-1">
      <Container variant="centered" className="py-12">
        <h1 className="font-accent text-4xl">Work</h1>
        <nav aria-label="Filter projects by category" className="mt-6">
          <ul className="flex flex-wrap gap-4 text-sm">
            <li>
              <Link href="/work" aria-current={!activeCategory ? "page" : undefined}>
                All
              </Link>
            </li>
            {PROJECT_CATEGORIES.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/work?category=${encodeURIComponent(cat)}`}
                  aria-current={activeCategory === cat ? "page" : undefined}
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Container variant="full">
        <ProjectGrid projects={visibleProjects} />
      </Container>
    </main>
  );
}
