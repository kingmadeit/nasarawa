"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";

const NAV_LINKS = [
  { href: "/", label: "Home" },
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

  return (
    <header className={HEADER_VARIANT_CLASS["solid"]}>
      <Container
        variant="centered"
        className="flex flex-col items-center gap-8 py-12"
      >
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Nasarawa"
            width={96}
            height={96}
            className="h-60 w-30"
            priority
          />
        </Link>
        <nav aria-label="Primary">
          <ul className="flex font-accent gap-6 text-md">
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
