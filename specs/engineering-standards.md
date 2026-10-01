# Engineering Standards

Applies to every phase in `roadmap.md`. This is the bar for "done," not a
style preference — hold code to this before calling a phase shippable.
Read alongside `mission.md` (why), `tech-stack.md` (what), `roadmap.md`
(when) — this file is how.

These standards don't override `AGENTS.md`'s don'ts (scope, branching) or
the root-level instructions on avoiding premature abstraction/comments —
they sharpen them for this codebase. Where this file says "extract a
component," that's still subject to the Rule of Three below, not a license
to abstract early.

## Semantics & accessibility

- Use the HTML element that means what the content is: `<nav>`, `<main>`,
  `<section>`, `<article>`, `<button>` vs `<a>` (button for actions, anchor
  for navigation), `<ul>/<li>` for grids of items. Don't reach for `<div>`
  when a semantic element exists — this is an image-led portfolio that an
  Awwwards jury and screen readers both have to parse.
- Every `<img>` (via `next/image`) needs real `alt` text describing the
  work shown, not the filename or "image". Decorative images get `alt=""`.
- Heading levels (`h1`-`h3`) must nest in order per page — don't skip
  levels for visual sizing; size with Tailwind, not heading choice.
- Interactive elements must be keyboard-reachable and show a visible focus
  state (`:focus-visible`), especially since motion/hover-driven design
  tends to forget keyboard users. Respect `prefers-reduced-motion` for the
  IO+CSS entry/exit animations described in `tech-stack.md`.
- Color contrast must hold against the actual brand palette once hex
  values land (army/dark-green/cream/white/black) — check text-on-image
  and text-on-color combinations, not just text-on-white.

## Complexity & readability

- One function, one job. If you're describing what it does with "and," it's
  two functions.
- Prefer early returns / guard clauses over nested conditionals. More than
  2 levels of nesting in a function is a signal to extract or invert.
- Keep cyclomatic complexity low: if a function's branch count makes you
  lose track of which `if` you're in, split it. As a rough ceiling, a
  function mixing more than ~4 independent conditions is doing too much.
- Replace a `switch`/`if-else` chain that's just mapping a key to a value
  with an object/`Record` lookup instead — it's flatter and the branches
  can't silently fall through.
  ```ts
  // prefer this
  const SECTION_LABEL: Record<SectionId, string> = {
    hero: "Work", grid: "Projects", about: "Studio", contact: "Contact",
  };
  // over a switch with the same four cases
  ```
- Don't create multiple variables/conditions that encode the same fact.
  Consolidate into one well-named boolean/derived value and reuse it,
  rather than re-deriving `mode === "edit"` three times in one component.
- A component's JSX should read top-to-bottom as the visual structure of
  the section. Push non-trivial logic (data shaping, conditionals beyond a
  ternary) above the `return`, not inline in markup.

## File anatomy

Within a component/hook/util file, order top-to-bottom: imports → module
constants (including any `Record` lookups from above) → types/interfaces →
pure helper functions → the component or hook itself. A reader shouldn't
hit a function before knowing what the constants it closes over mean.

## Single source of truth & DRY

DRY applies differently to *data* than to *behavior* — conflating the two
is how you end up with either duplicated config or a brittle abstraction.

- **Constants, config, and types must never be duplicated.** A route path,
  a breakpoint, a `Record` of section labels, the `Project` type — each
  lives in exactly one file and everything else imports it. If the same
  literal string/number shows up in a second file, that's a bug waiting
  to happen when only one copy gets updated, not an acceptable style
  choice.
- **Component/JSX duplication is judged by the Rule of Three, not banned
  outright.** Duplication across 2 call sites is often clearer than the
  wrong shared abstraction (AHA — Avoid Hasty Abstractions). Extract
  (component, hook, util) on the 3rd real repetition, once the shared
  shape is actually confirmed rather than guessed at. The v1 example:
  `useInView` is written once in `src/hooks` and reused across
  hero/grid/about/contact for the motion pass — that's data-shape reuse,
  not a premature abstraction, because it's one concept (observe an
  element's viewport visibility) used identically four times.
  - Prefer two separate, simple components over one component with a
    `mode`/`variant` prop and a pile of conditionals bolted on to make it
    "reusable." Separate but clear beats shared but tangled.
  - Don't abstract across two things that are only *coincidentally*
    similar today (e.g. two cards that happen to share a width) — abstract
    across things that are the *same concept* (e.g. "a project tile").
- Shared primitives belong in `src/components/` (presentational,
  cross-section) or `src/lib`/`src/hooks` (logic) — not duplicated per
  section file.

## Component design

- Composition over configuration: a component that's growing a long list
  of boolean props (`isLarge`, `hasBorder`, `isCompact`...) usually wants
  to be split or to take `children`/slots instead.
- Keep presentational components (layout, markup, styling) separate from
  data concerns (fetching, content imports). Section components read from
  `src/content/*` and pass typed props down; leaf components don't know
  where their data came from.
- Default to Server Components (no `"use client"`) per Next.js App Router
  norms. Add `"use client"` only at the leaf that actually needs
  interactivity/state/effects (e.g. the `useInView`-driven wrapper) — not
  on whole sections.
- Props should be the minimum a component needs, typed explicitly (no
  `any`, no implicit `object`). Derive narrow prop types from the shared
  `Project` type rather than redeclaring overlapping shapes.
- Co-locate a component's styles (Tailwind classes inline) and minor
  helpers with the component; only promote to `src/lib` once reused.

## State, effects & async discipline

- **Command-query separation**: a function named `get*`/`is*`/`has*`/`can*`
  must be pure (no side effects, safe to call repeatedly). Mutations go in
  functions named `set*`/`update*`/`handle*`. Don't bury a mutation inside
  what reads like a query.
- **Every `useEffect` that subscribes must unsubscribe.** The `useInView`
  hook's `IntersectionObserver` must be `disconnect()`-ed in the cleanup
  function; any `addEventListener` needs the matching `removeEventListener`.
  An effect with a subscription and no cleanup is a leak, full stop.
- Effect dependency arrays must be complete and accurate — don't suppress
  the lint rule to silence a stale-closure bug instead of fixing it.
- Async calls (the contact form submit, any future `fetch`) must be
  awaited and their rejection handled — no fire-and-forget promises. Guard
  against double-submit (disable the control or check an in-flight flag)
  rather than letting concurrent submits race.

## TypeScript discipline

- Strict mode is already on (`tech-stack.md`) — don't weaken it locally
  with `any`, `as unknown as`, or `@ts-ignore`. If a type genuinely can't
  be known, narrow with a type guard instead of casting.
- Model content/domain shapes as explicit `interface`/`type` (e.g.
  `Project`) and import them, rather than inferring the same shape
  ad hoc in multiple files.
- Prefer union types / discriminated unions over boolean flags when a
  value has more than two real states.

## Naming

- Names say what a thing *is* or *does*, not how it's implemented or why
  it was added (no `data2`, `newGrid`, `helperForContact`). A reader six
  months from now should get the intent from the name alone.
- Match Next.js/React conventions already in the repo: PascalCase for
  components, camelCase for functions/hooks/variables, `useX` for hooks,
  kebab-case for route segments under `src/app`.

## Performance

- Every raster asset goes through `next/image` with real `width`/`height`
  (or `fill` + a sized parent) so layout doesn't shift — this is an
  image-heavy site where CLS directly hurts the "feels instant" goal in
  `mission.md`.
- Don't reach for `useMemo`/`useCallback` pre-emptively; add them when a
  measured re-render cost justifies it, not as a reflex.
- Keep client-side JS minimal: per `tech-stack.md`, v1 has no animation
  library, so a section pulling in a dependency for something CSS can do
  is a regression against that decision, not a style nit.

## Error handling

- Only handle errors at real boundaries: external data (future CMS/API
  calls in later phases), user input (the contact form), not internal
  calls where the type system already guarantees shape.
- Don't add fallback/defensive branches for states the types already rule
  out (e.g. guarding against `undefined` on a required prop).
- Never swallow an error silently (`catch {}`). At minimum log it with
  context; surface it to the user when it's their action that failed (e.g.
  the contact form).

## Security by default

- Never trust the contact form's input. Validate/sanitize server-side
  (wherever it's actually submitted — API route or third-party form
  handler), not just with client-side `required`/`type="email"`, which is
  UX, not a trust boundary.
- Never interpolate user-provided or content-file strings into HTML via
  `dangerouslySetInnerHTML`. Render text as text; if rich content (e.g. a
  future CMS field) genuinely needs HTML, sanitize it first.
- No secrets (API keys, form-handler tokens) in client-side code or
  committed files — env vars only, read server-side.

## Definition of done (per phase step)

Before marking a roadmap step complete, confirm:

1. Semantic markup + keyboard/focus/contrast pass for anything new.
2. No function/component doing more than one job; no new nesting pit.
3. No duplicated logic that already hit its 3rd occurrence; no duplicated
   constant/config/type that should have had one source of truth.
4. No `any`/casts introduced; shared types reused, not redeclared.
5. Client-boundary (`"use client"`) kept as small as possible.
6. Images sized/optimized via `next/image`.
7. Every effect that subscribes (observers, listeners, timers) cleans up;
   every async call is awaited/handled, not fire-and-forget.
8. No raw user/content input rendered as HTML; no secrets in client code.
