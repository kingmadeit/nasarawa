import clsx from "clsx";
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
      <Container variant="centered" className="py-12">
        {(project.category || project.year) && (
          <p className="text-sm uppercase tracking-wide text-army">
            {project.category && project.year
              ? `${project.category} · ${project.year}`
              : project.category || project.year}
          </p>
        )}
        <h1 className="font-accent text-army text-4xl">{project.title}</h1>
        {project.description && (
          <p className="mt-4 max-w-prose text-base">{project.description}</p>
        )}
      </Container>
      {project.gallery.length > 0 && (
        <Container variant="full">
          <ul className="grid grid-cols-1 sm:grid-cols-2">
            {project.gallery.map((image, index) => {
              const isFullWidth = index % 3 === 0;
              return (
                <li
                  key={image.src}
                  data-scroll-reveal
                  className={clsx(
                    "overflow-hidden",
                    isFullWidth ? "sm:col-span-2" : "relative aspect-[4/5]",
                  )}
                >
                  {isFullWidth ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="100vw"
                      className="h-auto w-full"
                    />
                  ) : (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      )}
    </main>
  );
}
