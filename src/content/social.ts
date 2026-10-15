export type SocialPlatform = "instagram" | "email";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "instagram", label: "Instagram", href: "https://instagram.com/nasarawastudio" },
  { platform: "email", label: "Email", href: "mailto:nasarawastudio@gmail.com" },
];
