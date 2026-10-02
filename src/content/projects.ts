import type { ImageAsset } from "@/types/image";

// Cover images need real width/height (not just src/alt) so the masonry
// grid can size each tile to the image's actual aspect ratio — that's what
// produces the staggered masonry effect, no JS layout library involved.
export interface ProjectCover extends ImageAsset {
  width: number;
  height: number;
}

export interface Project {
  title: string;
  slug: string;
  cover: ProjectCover;
  year: number | null;
  category: string | null;
  description: string | null;
  gallery: ImageAsset[];
}

// Placeholder covers — round-robin the existing hero stand-in photography
// until each project has real work delivered. alt stays decorative ("")
// since these images don't depict the project they're attached to yet.
// Dimensions are each file's real pixel size (via `sips`), not guessed.
const PLACEHOLDER_COVERS: ProjectCover[] = [
  { src: "/images/hero-cover.png", alt: "", width: 2400, height: 1600 },
  { src: "/images/hero-grid-1.jpg", alt: "", width: 1537, height: 2305 },
  { src: "/images/hero-grid-2.jpg", alt: "", width: 1537, height: 2305 },
  { src: "/images/hero-grid-3.jpg", alt: "", width: 1537, height: 2305 },
  { src: "/images/hero-grid-4.jpg", alt: "", width: 1536, height: 2316 },
];

function placeholderCover(index: number): ProjectCover {
  return PLACEHOLDER_COVERS[index % PLACEHOLDER_COVERS.length];
}

// Confirmed project titles — year/category/description are null until the
// client confirms them.
export const PROJECTS: Project[] = [
  { title: "6Fo", slug: "6fo", cover: placeholderCover(0), year: null, category: null, description: null, gallery: [] },
  { title: "Abby Jazmine", slug: "abby-jazmine", cover: placeholderCover(1), year: null, category: null, description: null, gallery: [] },
  { title: "Amaarae", slug: "amaarae", cover: placeholderCover(2), year: null, category: null, description: null, gallery: [] },
  { title: "Asakaa Boys", slug: "asakaa-boys", cover: placeholderCover(3), year: null, category: null, description: null, gallery: [] },
  { title: "Bigg Hommie Flee", slug: "bigg-hommie-flee", cover: placeholderCover(4), year: null, category: null, description: null, gallery: [] },
  { title: "Biqo Super Jazz Club", slug: "biqo-super-jazz-club", cover: placeholderCover(0), year: null, category: null, description: null, gallery: [] },
  { title: "Burna Boy", slug: "burna-boy", cover: placeholderCover(1), year: null, category: null, description: null, gallery: [] },
  { title: "Daily Paper", slug: "daily-paper", cover: placeholderCover(2), year: null, category: null, description: null, gallery: [] },
  { title: "Dee Moneey", slug: "dee-moneey", cover: placeholderCover(3), year: null, category: null, description: null, gallery: [] },
  { title: "Everyday People", slug: "everyday-people", cover: placeholderCover(4), year: null, category: null, description: null, gallery: [] },
  { title: "Ghana To The World Concert", slug: "ghana-to-the-world-concert", cover: placeholderCover(0), year: null, category: null, description: null, gallery: [] },
  { title: "Halloween", slug: "halloween", cover: placeholderCover(1), year: null, category: null, description: null, gallery: [] },
  { title: "Joey B", slug: "joey-b", cover: placeholderCover(2), year: null, category: null, description: null, gallery: [] },
  { title: "Kwasi Paul x GQ", slug: "kwasi-paul-x-gq", cover: placeholderCover(3), year: null, category: null, description: null, gallery: [] },
  { title: "Kwesi Arthur Los Angeles", slug: "kwesi-arthur-los-angeles", cover: placeholderCover(4), year: null, category: null, description: null, gallery: [] },
  { title: "New Nasarawa 2025 and beyond", slug: "new-nasarawa-2025-and-beyond", cover: placeholderCover(0), year: null, category: null, description: null, gallery: [] },
  { title: "NS Products", slug: "ns-products", cover: placeholderCover(1), year: null, category: null, description: null, gallery: [] },
  { title: "Project 96", slug: "project-96", cover: placeholderCover(2), year: null, category: null, description: null, gallery: [] },
  { title: "Rolling Dice", slug: "rolling-dice", cover: placeholderCover(3), year: null, category: null, description: null, gallery: [] },
  { title: "Shawtyme", slug: "shawtyme", cover: placeholderCover(4), year: null, category: null, description: null, gallery: [] },
  { title: "Vintage Parasite", slug: "vintage-parasite", cover: placeholderCover(0), year: null, category: null, description: null, gallery: [] },
  { title: "Vonnie Mack", slug: "vonnie-mack", cover: placeholderCover(1), year: null, category: null, description: null, gallery: [] },
  { title: "Yeboah Studios", slug: "yeboah-studios", cover: placeholderCover(2), year: null, category: null, description: null, gallery: [] },
];

// Derived from the data itself, not a separate hardcoded list — single
// source of truth for which filter options the /work page can show.
export const PROJECT_CATEGORIES: string[] = Array.from(
  new Set(PROJECTS.map((project) => project.category).filter((category): category is string => category !== null)),
);

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
