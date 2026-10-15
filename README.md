# Nasarawa

Portfolio site for Nasarawa, a creative studio working in media. It's image-led and editorial, with restrained motion, built to show the work, show who the studio is, and make it easy to get in touch.

> **Status:** Phase 1 (v1) is in progress. See [`specs/roadmap.md`](specs/roadmap.md) for what's shipped and what's next.

## Stack

| Concern    | Choice                                                         |
| ---------- | -------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack), React 19                   |
| Language   | TypeScript (strict)                                            |
| Styling    | Tailwind CSS v4: CSS-first config, no `tailwind.config.js`     |
| Motion     | `IntersectionObserver` + CSS. No animation library in v1       |
| Content    | Typed TypeScript modules in `src/content/`. No CMS yet         |
| Fonts      | `next/font/google` stand-ins (Inter, Caveat) until licensed fonts land |
| Hosting    | Vercel (assumed, not yet confirmed)                            |

> [!IMPORTANT]
> Next.js 16 has breaking changes compared with earlier versions: async request APIs, `proxy.ts`, `next/image` defaults and more. Before changing framework-level code, read the bundled docs in `node_modules/next/dist/docs/`. See [`AGENTS.md`](AGENTS.md).

## Getting started

**Requirements:** Node.js ≥ 20.9 and npm.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script          | Purpose                          |
| --------------- | -------------------------------- |
| `npm run dev`   | Dev server with Turbopack        |
| `npm run build` | Production build                 |
| `npm run start` | Serve the production build       |
| `npm run lint`  | ESLint 9 (flat config)           |

No environment variables are needed yet. When some are added (for example, for a contact form handler), document them in a committed `.env.example`. `.env*` files are gitignored, and secrets are read only on the server.

There's no test runner yet. That's a deliberate deferral for v1 (see [`specs/tech-stack.md`](specs/tech-stack.md#testing)), so `npm run lint` and `npm run build` are the pre-merge checks.

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root shell: fonts, metadata, loader, footer
│   ├── globals.css             # Theme tokens + CSS motion primitives
│   ├── (with-sidebar)/         # Route group: pages with the sticky project sidebar
│   │   ├── page.tsx            # /: featured project grid
│   │   └── work/[slug]/        # /work/:slug: project detail (statically generated)
│   ├── work/                   # /work: full grid, filterable via ?category=
│   ├── about/                  # /about: stub
│   └── contact/                # /contact: stub
├── components/
│   ├── layout/                 # Shell pieces: Container, MobileNav, Footer, Loader…
│   ├── sections/               # Page sections (Hero and its variants)
│   ├── work/                   # Project grid, tile, sidebar
│   └── motion/                 # Reveal: in-view entrance wrapper
├── content/                    # Hardcoded, typed site content (projects, hero, social)
├── hooks/                      # useInView
├── lib/                        # Small pure helpers (entrance timing, view transitions, pointer checks)
└── types/                      # Shared domain types
public/images/                  # Static assets; project photography under projects/<Project Name>/
specs/                          # Product and engineering specs (read these first)
```

## Architecture notes

- **Server Components by default.** `"use client"` is used only on leaves that need the browser, such as `Reveal`, `Loader`, `MobileNav` and the hover tilt on `ProjectTile`. Sections and pages stay on the server.
- **Content is data.** Pages read from `src/content/*` and pass typed props down, so leaf components don't know where their data comes from. The `Project` type (`src/content/projects.ts`) is deliberately shaped so a CMS can satisfy it later (roadmap Phase 4) without changes to components.
- **Motion has two layers, and both are CSS-driven:**
  - *Reveal on scroll:* `useInView` toggles `data-visible` on `[data-reveal]` elements, and `globals.css` owns the transition.
  - *Entrance stagger:* elements opt in with `data-entrance`, and timing comes from `src/lib/entrance.ts` through a `--entrance-delay` custom property.
  - *Shared-element transitions* between a grid tile and its detail page use the View Transitions API. Names are built in one place: `getProjectImageViewTransitionName` in `src/lib/view-transition.ts`.
  - All of this respects `prefers-reduced-motion`.
- **Design tokens live in one place.** Brand colors (`army`, `dark-green`, `cream`, `white`, `black`) and the `max-w-content` width are defined in `src/app/globals.css` under `@theme inline`. Components use the semantic token names, never raw hex. The hex values are placeholders until the client confirms the palette.
- **Layout width is separate from centering.** `<Container variant="full">` runs edge to edge (for the image grid). `variant="centered"` caps width at `max-w-content` (for text and navigation).

## Working with content

### Adding a project

1. Put the images in `public/images/projects/<Project Name>/`.
2. Add an entry to `PROJECTS` in `src/content/projects.ts`:
   - `slug` must be unique and kebab-case. It becomes `/work/<slug>`.
   - Use URL-encoded paths for folders with spaces (`Abby%20Jazmine`).
   - Every image needs its real pixel `width` and `height`, because `next/image` uses them to prevent layout shift. On macOS: `sips -g pixelWidth -g pixelHeight <file>`.
   - Write real `alt` text that describes the shot. Use `alt=""` only for purely decorative images.
3. `year`, `category` and `description` are nullable until the client confirms them. Categories feed the `/work` filter automatically.

The home page shows the first 20 projects in array order (`FEATURED_PROJECT_COUNT`), so order the array by how prominently each project should appear.

### Hero

`src/content/hero.ts` exports a `HeroVariant` discriminated union (`full-image` | `grid`, with `video` and `3d` reserved). The hero is currently commented out on `/` while the client reviews the layout.

## Specs and standards

Read these before making non-trivial changes:

| Doc | What it covers |
| --- | --- |
| [`specs/mission.md`](specs/mission.md) | Who the site is for, v1 scope, non-goals |
| [`specs/tech-stack.md`](specs/tech-stack.md) | Technical decisions and the reasons behind them |
| [`specs/roadmap.md`](specs/roadmap.md) | Phased delivery plan |
| [`specs/engineering-standards.md`](specs/engineering-standards.md) | The bar for "done": accessibility, DRY, effects hygiene, typing |

## Contributing

- Branch from `dev`, and never push directly to `main`.
- Keep each PR to a single roadmap step so it stays small enough to review.
- Before opening a PR, run `npm run lint && npm run build` and go through the *Definition of done* checklist in `specs/engineering-standards.md`.
- Flag any new dependency in the PR description for a quick sanity check. See the dependency philosophy in `specs/tech-stack.md`.
