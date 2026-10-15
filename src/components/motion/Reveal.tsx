"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

export function Reveal({ children, className }: RevealProps) {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} data-reveal data-visible={isVisible} className={className}>
      {children}
    </div>
  );
}
