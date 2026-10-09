import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/content/projects";
import { SOCIAL_LINKS, type SocialPlatform } from "@/content/social";

interface ProjectSidebarProps {
  projects: Partial<Project>[];
  className?: string;
}

const SOCIAL_ICON: Record<SocialPlatform, () => ReactNode> = {
  instagram: InstagramIcon,
  email: EmailIcon,
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.25" cy="6.75" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  );
}

export function ProjectSidebar({ projects, className }: ProjectSidebarProps) {
  return (
    <aside className={clsx("px-10 py-16", className)}>
      <nav aria-label="Projects">
        <ul className="flex flex-col gap-2 text-md">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="font-accent transition-colors text-army font-bold scale-125"
              >
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav aria-label="Social" className="mt-12">
        <ul className="flex items-center gap-4">
          {SOCIAL_LINKS.map((social) => {
            const Icon = SOCIAL_ICON[social.platform];
            return (
              <li key={social.platform}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="text-army transition-colors hover:text-black"
                  {...(social.platform !== "email" && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <Icon />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
