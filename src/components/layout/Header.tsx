"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

type HeaderVariant = "overlay" | "solid";

const HEADER_VARIANT_CLASS: Record<HeaderVariant, string> = {
  overlay: "absolute inset-x-0 top-0 z-20 text-white",
  solid: "relative w-full text-black",
};

export function Header() {
  const pathname = usePathname();
  const variant: HeaderVariant = pathname === "/" ? "overlay" : "solid";

  return (
    <header className={HEADER_VARIANT_CLASS[variant]}>
      <Container
        variant="centered"
        className="flex items-center justify-between py-6"
      >
        <Link href="/" className="font-accent text-2xl">
          Nasarawa
        </Link>
        <nav aria-label="Primary">
          <ul className="flex gap-6 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
