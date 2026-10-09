import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { getProjectBySlug, PROJECTS } from "@/content/projects";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex-1">
      <Container variant="full" className="relative aspect-[16/9]">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </Container>
      <Container variant="centered" className="py-12">
        {(project.category || project.year) && (
          <p className="text-sm uppercase tracking-wide text-army">
            {project.category && project.year
              ? `${project.category} · ${project.year}`
              : project.category || project.year}
          </p>
        )}
        <h1 className="font-accent text-4xl">{project.title}</h1>
        {project.description && (
          <p className="mt-4 max-w-prose text-base">{project.description}</p>
        )}
      </Container>
      {project.gallery.length > 0 && (
        <Container variant="full">
          <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {project.gallery.map((image) => (
              <li key={image.src} className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </Container>
      )}
    </main>
  );
}
