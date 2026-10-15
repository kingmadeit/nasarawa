// Single source of truth for the shared-element view-transition name used to
// link a project's grid tile (departure) to its detail-page hero image
// (landing). Both ends must call this with the same slug.
export function getProjectImageViewTransitionName(slug: string): string {
  return `project-image-${slug}`;
}

export function supportsViewTransitions(): boolean {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return false;
  }

  if (!("startViewTransition" in document)) {
    return false;
  }

  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
