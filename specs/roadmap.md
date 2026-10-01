# Roadmap

Very small phases, in order. Each step should be shippable/reviewable on its
own rather than landing as one large diff.

## Phase 1 — v1 (current scope)

Minimal core: hero, image-led project grid, about, contact. Built so the
later phases below aren't foreclosed, without building anything speculative
into v1 itself (see `mission.md` non-goals).

1. **Foundation** — Tailwind theme tokens, base layout shell/shared
   components, the `useInView` hook + CSS animation primitives described in
   `tech-stack.md`. No real content yet.
2. **Hero section.**
3. **Project grid** — image-led, reads from hardcoded `src/content/projects.ts`.
   `Project` type shaped to anticipate case-study fields (see
   `tech-stack.md`) even though no detail page ships in this phase.
4. **About section.**
5. **Contact section.**
6. **Motion pass** — apply IO+CSS entry/exit across hero, grid, about, and
   contact. This is the only animation work in v1 — no scroll-driven
   choreography yet.
7. **Performance & metadata pass** — image optimization check, a Lighthouse
   pass, basic SEO/OG metadata.
8. **Launch v1.**

## Later phases (named, not designed yet)

Deliberately kept to one line each — these are real future directions the
client wants, but designing them now would contradict v1's non-goals. Pick
one up as its own spec when it's actually next.

- **Phase 2 — Scroll choreography (nice-to-have):** introduce GSAP + Lenis
  for heavier scroll-driven motion, layered on top of (not replacing) the
  v1 IO+CSS approach.
- **Phase 3 — Case study pages:** per-project detail pages, using the
  `Project` type's anticipated fields from v1.
- **Phase 4 — CMS migration:** move `src/content/projects.ts` to a headless
  CMS; content model in `tech-stack.md` is already shaped for this.
- **Phase 5 — Journal / Blog.**
- **Phase 6 — Lookbook.**
- **Phase 7 — Shop.**
