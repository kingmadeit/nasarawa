# Roadmap

Very small phases, in order. Each step should be shippable/reviewable on its
own rather than landing as one large diff.

## Phase 1 — v1 (current scope)

Minimal core: hero, image-led project grid, about, contact. Ships as a
multi-page site (`/`, `/work`, `/work/[slug]`, `/about`, `/contact`), not a
single scrolling page with anchor nav — the landing page stays hero + a
curated work teaser only, with About/Contact as their own routes. Built so
the later phases below aren't foreclosed, without building anything
speculative into v1 itself (see `mission.md` non-goals).

1. **Foundation** — Tailwind theme tokens, base layout shell/shared
   components, the `useInView` hook + CSS animation primitives described in
   `tech-stack.md`. No real content yet.
2. **Hero section.**
3. **Project grid** — image-led, reusable `ProjectGrid` component reading
   from hardcoded `src/content/projects.ts`. Ships as a curated teaser slice
   on `/`, a full category-filterable grid at `/work` (filtering via URL
   search params), and a minimal per-project detail page at
   `/work/[slug]` (cover, title, year, category, description, gallery) —
   pulling a slice of "Phase 3" forward rather than deferring click-through
   entirely.
4. **Landing page scaffold** — rework `/`'s layout after the oski.studio
   reference: header and footer stay above, with the body below split into
   a sticky sidebar and a content column (`[sidebar (sticky)][content]`),
   the content column rendering the `ProjectGrid` from step 3. Scaffolding
   only — sidebar content/copy is whatever's already available, not new
   design work beyond this layout shift. 
5. **About page** — build out `/about` content (stub route already created
   in step 3).
6. **Contact page** — build out `/contact` content and form (stub route
   already created in step 3).
7. **Motion pass** — apply IO+CSS entry/exit across hero, grid, about, and
   contact. This is the only animation work in v1 — no scroll-driven
   choreography yet.
8. **Performance & metadata pass** — image optimization check, a Lighthouse
   pass, basic SEO/OG metadata.
9. **Launch v1.**

## Later phases (named, not designed yet)

Deliberately kept to one line each — these are real future directions the
client wants, but designing them now would contradict v1's non-goals. Pick
one up as its own spec when it's actually next.

- **Phase 2 — Scroll choreography (nice-to-have):** introduce GSAP + Lenis
  for heavier scroll-driven motion, layered on top of (not replacing) the
  v1 IO+CSS approach.
- **Phase 3 — Case study pages (enrichment):** v1 already ships a minimal
  `/work/[slug]` detail page (cover, title, year, category, description,
  gallery). This phase is for a richer case-study layout — expanded
  galleries, credits, related work — once real content and design direction
  land.
- **Phase 4 — CMS migration:** move `src/content/projects.ts` to a headless
  CMS; content model in `tech-stack.md` is already shaped for this.
- **Phase 5 — Journal / Blog.**
- **Phase 6 — Lookbook.**
- **Phase 7 — Shop.**
