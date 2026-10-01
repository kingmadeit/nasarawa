import Link from "next/link";
import { Container } from "./Container";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header>
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
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
