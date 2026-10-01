import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-auto">
      <Container
        variant="centered"
        className="flex items-center justify-between py-6 text-sm"
      >
        <p>&copy; {new Date().getFullYear()} Nasarawa</p>
        <a href="#contact">Get in touch</a>
      </Container>
    </footer>
  );
}
