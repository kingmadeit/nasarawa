import { Container } from "@/components/layout/Container";
import { HERO } from "@/content/hero";
import { HeroBackground } from "./HeroBackground";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <HeroBackground variant={HERO} />
      {/* Reserved for future overlay content (social links, etc.) */}
      <Container
        variant="centered"
        className="relative z-10 flex h-full items-end py-6"
      >
        {null}
      </Container>
    </section>
  );
}
