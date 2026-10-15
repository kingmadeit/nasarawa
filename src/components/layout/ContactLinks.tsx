import type { ReactNode } from "react";
import { SOCIAL_LINKS, type SocialPlatform } from "@/content/social";
import { staggerDelayStyle } from "@/lib/entrance";

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

export function ContactLinks() {
  return (
    <nav aria-label="Social" className="mt-12">
      <ul className="flex items-center gap-4">
        {SOCIAL_LINKS.map((social, index) => {
          const Icon = SOCIAL_ICON[social.platform];
          return (
            <li key={social.platform} data-entrance="fade-up" style={staggerDelayStyle(index)}>
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
  );
}
