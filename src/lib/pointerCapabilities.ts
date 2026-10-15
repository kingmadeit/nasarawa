// Gate for ProjectTile's hover tilt/parallax motion: it only attaches on
// fine-pointer/hover devices, and only when the user hasn't asked for
// reduced motion.
export function canUseHoverMotion(): boolean {
  const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return supportsFinePointer && !prefersReducedMotion;
}
