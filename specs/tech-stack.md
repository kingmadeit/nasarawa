# Tech Stack

For Next.js 16-specific conventions and breaking changes (async request APIs,
`proxy.ts`, Cache Components, `next/image` defaults, etc.), see `CLAUDE.md` /
`AGENTS.md` — not restated here.

## Framework

- Next.js 16 (App Router), `src/` directory, `@/*` path alias.
- TypeScript, strict mode.
- Turbopack for dev and build (default in this version).

## Styling

- Tailwind CSS v4 via `@tailwindcss/postcss` (`@import "tailwindcss"` in
  `src/app/globals.css`, theme tokens via `@theme inline`).
- No `tailwind.config.js` — v4's CSS-first config only.

## Animation (v1)

**No animation library in v1.** Subtle text/image entry-exit is done with
native primitives only:

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
  build fields speculatively beyond what a plausible future case-study page
  would need — just don't paint the type into a corner.

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

## Linting / formatting

- ESLint 9, flat config (`eslint.config.mjs`), already in place via
  `eslint-config-next`.

## Testing

- No test runner configured. Explicitly deferred — not a v1 blocker. Revisit
  if/when logic beyond presentational components warrants it.

## Deployment

- Assumed: Vercel (native target for Next.js). This is an assumption, not a
  confirmed decision — flag if that's wrong.
