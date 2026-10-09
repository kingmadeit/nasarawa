import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/content/projects";
import { SOCIAL_LINKS, type SocialPlatform } from "@/content/social";
import { ENTRANCE_GROUP_DELAY_MS, ENTRANCE_STAGGER_STEP_MS, entranceDelayStyle } from "@/lib/entrance";

interface ProjectSidebarProps {
  projects: Partial<Project>[];
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

export function ProjectSidebar({ projects }: ProjectSidebarProps) {
  return (
    <aside
      className="flex w-full flex-col overflow-y-auto px-10 py-16"
      data-entrance="sidebar-panel"
      style={entranceDelayStyle(ENTRANCE_GROUP_DELAY_MS)}
    >
      <Link href="/" data-entrance="logo" className="mb-12 self-start">
        <Image
          src="/images/logo.png"
          alt="Nasarawa"
          width={96}
          height={96}
          className="h-20 w-10"
          priority
        />
      </Link>
      <nav aria-label="Projects">
        <ul className="flex flex-col gap-2 text-md">
          {projects.map((project, index) => (
            <li
              key={project.slug}
              data-entrance="sidebar-item"
              style={entranceDelayStyle(ENTRANCE_GROUP_DELAY_MS + index * ENTRANCE_STAGGER_STEP_MS)}
            >
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
          {SOCIAL_LINKS.map((social, index) => {
            const Icon = SOCIAL_ICON[social.platform];
            return (
              <li
                key={social.platform}
                data-entrance="sidebar-item"
                style={entranceDelayStyle(ENTRANCE_GROUP_DELAY_MS + index * ENTRANCE_STAGGER_STEP_MS)}
              >
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
