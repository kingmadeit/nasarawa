# Tech Stack

For Next.js 16-specific conventions and breaking changes (async request APIs,
`proxy.ts`, Cache Components, `next/image` defaults, etc.), see `CLAUDE.md` /
`AGENTS.md` — not restated here.

## Dependency philosophy

This project is **not dependency-averse** — it's being built in small,
reviewable increments (see `roadmap.md`), and tools (including animation
and layout libraries) get introduced when the current increment actually
calls for them, not avoided by default out of general caution. "v1 has no
animation library" is a **sequencing** decision tied to what hero/grid/about/
contact need right now, not a standing principle against dependencies —
GSAP + Lenis are already a named, planned Phase 2 addition, not something
being avoided forever. When a real need shows up, evaluate the trade-off
normally (bundle cost vs. what it actually buys, like any engineering
decision) and pick the right tool — don't reflexively default to the most
minimal/no-dependency option, and don't treat adding a well-chosen
dependency as something to apologize for. Flag genuinely new dependencies
for a quick sanity check before installing, the way `masonry-layout` was
(see "Layout: masonry grid" below), but that's a lightweight checkpoint, not
a bar to clear only in exceptional cases.

## Framework

- Next.js 16 (App Router), `src/` directory, `@/*` path alias.
- TypeScript, strict mode.
- Turbopack for dev and build (default in this version).

## Styling

- Tailwind CSS v4 via `@tailwindcss/postcss` (`@import "tailwindcss"` in
  `src/app/globals.css`, theme tokens via `@theme inline`).
- No `tailwind.config.js` — v4's CSS-first config only.

## Animation (v1)

**No animation library for v1's increment.** Hero/grid/about/contact's
entry-exit motion is subtle enough that native primitives cover it
completely, so there's no real need to reach further yet — not a rule
against animation libraries in general (see "Dependency philosophy"
above). Subtle text/image entry-exit is done with native primitives only:

- A small shared hook (e.g. `useInView`) wraps `IntersectionObserver` to flip
  a `data-visible` attribute/class when an element crosses into/out of the
  viewport.
- The actual animation — fade, small translate, stagger — lives in CSS
  (`transition` / `@keyframes`), authored as Tailwind utilities or a small
  CSS module, keyed off that attribute.
- No bundle cost beyond a few lines of JS; full control over easing/timing
  lives in CSS where it's easy to tune per section.

**Deferred, not v1**: GSAP + Lenis for heavier scroll-driven choreography is
a named Phase 2 "nice-to-have" (see `roadmap.md`). Do not install GSAP/Lenis
for v1 work — the IO+CSS approach is the whole animation story until that
phase is explicitly picked up.

## Layout: masonry grid

`masonry-layout` (the original Desandro/Metafizzy "Masonry") is approved,
used by `src/components/work/ProjectGrid.tsx` for height-based masonry
packing (placing each tile into the currently-shortest column). True
gapless masonry packing needs either JS measuring real rendered heights, or
native CSS masonry (`grid-template-rows: masonry`), which isn't yet
reliably supported across browsers — so CSS alone couldn't actually solve
this, and a small, well-established library was the right call per
"Dependency philosophy" above, not a last resort. `masonry-layout` is a
layout library, not an animation library — it doesn't touch motion/easing,
so the "no animation library for v1's increment" note above is unrelated.
GSAP/Lenis/Framer Motion still wait for Phase 2 because that's when
scroll-driven choreography is actually on the roadmap, not because
libraries are being avoided on principle.

## Media

- v1 is **image-led** (a grid of stills), not video. Video delivery
  (Mux/Cloudinary/self-hosted) is an open question to revisit only if/when a
  video-driven phase is actually scoped — not needed for v1.
- All raster images go through `next/image`. Assets live under `public/` for
  v1 (matches hardcoded content, below). If content moves to a remote
  host/CMS later, add it via `images.remotePatterns` (not `images.domains`,
  which is deprecated).

## Content model (v1)

Hardcoded, typed TypeScript data — no CMS yet:

- e.g. `src/content/projects.ts` exporting a typed array against an explicit
  `Project` interface.
- Shape the `Project` type generously enough (title, slug, cover image, year,
  role/category, short description, gallery) that it could later be satisfied
  by a CMS response without changing the components that consume it. Don't
  build fields speculatively beyond what the v1 `/work/[slug]` detail page
  actually renders — just don't paint the type into a corner.

## Fonts

Two-font system, both via `next/font`:

- **Accent/display** — FF Providence Sans (part of the FF Providence
  superfamily; script-derived, 2 weights only — Regular/Bold — positioned by
  FontFont for advertising/packaging/festive use, not body copy). Used for
  headlines and standout moments, not UI/body text. Candidate alternatives in
  the same handwriting/script spirit, pending license check: Storyteller
  Medium, HomegirlGetOnMyLevel, JoannesHandwriting, "Mahalo, brother!",
  Thaitea Regular.
- **Body/UI workhorse** — a plain, full-weight-range sans for body copy, nav,
  and UI chrome (Providence Sans's 2 weights aren't enough on their own).
  Not chosen yet — placeholder until design direction picks one.
- **License status unknown** for FF Providence Sans and the script
  candidates — none are on Google Fonts, all are commercial. Once licensed
  files are in hand, self-host via `next/font/local`. Until then, build with
  a free stand-in of similar character so layout/spacing work isn't blocked.

## Colors

Brand palette in progress — client has confirmed the family, not final hex
values yet:

- Army green
- Dark green
- Cream / off-white
- White
- Black

Model these as Tailwind v4 `@theme inline` tokens (e.g.
`--color-army`, `--color-dark-green`, `--color-cream`) once hex values are
supplied, so components reference semantic names rather than raw colors.

## Layout: breakpoints & containers

- **Breakpoints**: Tailwind v4 defaults (`sm` 640px / `md` 768px / `lg`
  1024px / `xl` 1280px / `2xl` 1536px), authored mobile-first (unprefixed
  utilities are the base/mobile styles; prefixes override upward). No
  custom breakpoint yet — add one only when a real layout need (e.g. an
  extra grid column at ultra-wide) justifies it, not speculatively.
- **Width is decoupled from centering.** `Container`
  (`src/components/layout/Container.tsx`) takes a `variant`:
  - `full` (default) — true edge-to-edge, no max-width, no padding. For
    the image-led project grid, which must run full-bleed.
  - `centered` — `max-w-content` (a semantic theme token, `72rem`/1152px
    today, defined once in `globals.css`'s `--container-content`, not a
    raw Tailwind `max-w-6xl`) plus horizontal padding. For nav, text
    blocks, and anything else that shouldn't run edge-to-edge.
  Pick the variant per-section rather than wrapping full-bleed content in
  a centered container and fighting it with negative margins.

## Visual taste & craft defaults

v1 has to read as awwwards-caliber craft, not a generic SaaS template —
see `mission.md`'s "editorial, not noisy" positioning. A few defaults to
default to, overridable per-section once real design direction lands:

- **White is the base canvas**, not cream. Cream/army/dark-green are
  accent and section-level tones, not the default body background — start
  every new surface white and introduce color deliberately.
- **No default borders, dividers, drop shadows, or rounded "card" chrome.**
  Separation between elements comes from whitespace and type scale, not
  strokes or boxes. A border is a considered choice for a specific moment
  (e.g. a hairline under a nav once that's actually load-bearing), never a
  reflexive default between sections.
- **Generous whitespace.** When in doubt, add more space rather than a
  visual divider to separate content.
- Avoid generic UI affordances (pill buttons, drop shadows, boxed stat
  cards) that read as dashboard/SaaS rather than editorial portfolio.
  When a styling call is ambiguous, mission.md's positioning is the
  tiebreaker.

examples: https://cipher.tv/, https://michaelgatt.com/ https://glitchandgrit.com/ https://www.meech213.com/, https://www.ilcapoproduction.com/
## Linting / formatting

- ESLint 9, flat config (`eslint.config.mjs`), already in place via
  `eslint-config-next`.

## Testing

- No test runner configured. Explicitly deferred — not a v1 blocker. Revisit
  if/when logic beyond presentational components warrants it.

## Deployment

- Assumed: Vercel (native target for Next.js). This is an assumption, not a
  confirmed decision — flag if that's wrong.
