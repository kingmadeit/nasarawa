import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-auto">
      <Container
        variant="centered"
        className="flex items-center justify-center py-6 text-xs text-gray-500"
      >
        <p>nasarawa studio &copy; {new Date().getFullYear()} </p>
      </Container>
    </footer>
  );
}
