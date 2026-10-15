import type { CSSProperties } from "react";

export const ENTRANCE_GROUP_DELAY_MS = 300;
export const ENTRANCE_STAGGER_STEP_MS = 80;

export function entranceDelayStyle(delayMs: number): CSSProperties {
  return { "--entrance-delay": `${delayMs}ms` } as CSSProperties;
}

export function staggerDelayStyle(index: number): CSSProperties {
  return entranceDelayStyle(ENTRANCE_GROUP_DELAY_MS + index * ENTRANCE_STAGGER_STEP_MS);
}
