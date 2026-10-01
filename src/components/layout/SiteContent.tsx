"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { LOADER_DURATION_MS } from "./Loader";

interface SiteContentProps {
  children: ReactNode;
}

export function SiteContent({ children }: SiteContentProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), LOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      data-site-content
      data-visible={ready}
      inert={!ready}
      className="relative flex min-h-full flex-col"
    >
      {children}
    </div>
  );
}
