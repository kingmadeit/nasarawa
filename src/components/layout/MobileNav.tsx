"use client";

import clsx from "clsx";
import { useState, type ReactNode } from "react";

const HAMBURGER_BARS = [
  { key: "top", transition: "transition-transform", openClass: "translate-y-2 rotate-45" },
  { key: "middle", transition: "transition-opacity", openClass: "opacity-0" },
  { key: "bottom", transition: "transition-transform", openClass: "-translate-y-2 -rotate-45" },
] as const;

interface MobileNavProps {
  children: ReactNode;
}

export function MobileNav({ children }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="primary-sidebar"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="fixed right-6 top-6 z-30 flex size-11 flex-col items-center justify-center gap-1.5 text-army lg:hidden"
      >
        {HAMBURGER_BARS.map((bar) => (
          <span
            key={bar.key}
            aria-hidden="true"
            className={clsx("h-0.5 w-6 bg-current duration-200", bar.transition, isOpen && bar.openClass)}
          />
        ))}
      </button>

      {isOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
        />
      )}

      <div
        id="primary-sidebar"
        className={clsx(
          "lg:sticky lg:top-0 lg:z-auto lg:flex lg:w-80 lg:shrink-0 lg:self-start lg:bg-transparent",
          isOpen ? "fixed inset-y-0 left-0 z-20 flex w-80 max-w-[85vw] bg-cream" : "hidden"
        )}
      >
        {children}
      </div>
    </>
  );
}
