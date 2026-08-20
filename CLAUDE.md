# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # dev server (Turbopack) on http://localhost:3000
pnpm build      # production build — this is the real verification gate
pnpm start      # serve the production build
pnpm test       # vitest run — the unit/component suite
pnpm test:watch # vitest in watch mode
pnpm lint       # eslint (next lint) — clean as of the pnpm migration
pnpm exec tsc --noEmit  # typecheck — the reliable static check to run after edits
```

Verify changes with `pnpm test` + `pnpm exec tsc --noEmit` and, for anything non-trivial,
`pnpm build`.

### Tests (vitest + Testing Library)

`vitest.config.mts` — jsdom environment, `include: **/*.test.{ts,tsx}`, and `resolve.tsconfigPaths`
so the `@/*` alias comes straight from `tsconfig.json` (no second alias table to keep in sync).
`css.postcss.plugins` is emptied on purpose: vite cannot consume the Tailwind v4 postcss plugin,
so any component that imports a stylesheet would otherwise break the run.

Test files sit next to their source (`lib/utils.test.ts`, `hooks/use-modal.test.tsx`, …); the only
exception is `tests/`, which holds `setup.tsx`, the shared `utils.tsx` render helper and the
cross-cutting `i18n.test.ts`.

Almost every component renders a translation through `<ClientTranslate />`, so tests wrap it in
`NextIntlClientProvider`. Use `renderWithIntl` from `tests/utils.tsx` instead of bare `render`,
and assert against `uz.<key>` rather than a hardcoded string — copy changes then do not break
tests.

`tests/setup.tsx` is the shared harness and carries the jsdom gaps worth knowing about:

- `IntersectionObserver` / `ResizeObserver` / `matchMedia` stubs — framer-motion's `whileInView`
  (`components/common/scroll-reveal.tsx`), next-themes and the radix dropdown all crash without
  them. Do **not** add a `navigator.clipboard` stub here: `userEvent.setup()` installs its own and
  fails with `Cannot redefine property: clipboard` if one already exists.
- `next/image` is mocked to a plain `<img>` so `fill` / `priority` do not leak onto the DOM.

A framer-motion `AnimatePresence` keeps exiting nodes mounted until their animation finishes, so
assertions after a filter/toggle interaction need `waitFor` (see
`app/(main)/works/page.test.tsx`).

Do **not** enable `globals: true` — tests import `describe` / `it` / `expect` from `vitest`
explicitly, which keeps the eslint config free of test-only globals.

`tests/i18n.test.ts` is the guard behind the "keep all three message files in key sync" rule below:
it fails with the exact missing/extra keys, and also checks that every locale in
`constants/options.ts` has both a `messages/<locale>.json` and its flag SVG in `public/icons/`.

Note for `ClientTranslate`: next-intl reads a bare `<b>` in a message as rich-text markup and
throws when no handler is passed, so a message intended for `isParse` must escape its tags
ICU-style (`'<b>'`) to reach `html-react-parser` as literal HTML.

### ESLint

`pnpm lint` runs **`eslint .`** — `next lint` was removed in Next 16 and now fails with
"Invalid project directory provided, no such directory: ./lint".

`eslint.config.mjs` is a **native flat config**: `eslint-config-next@16` ships flat config arrays
(`eslint-config-next/core-web-vitals`, `eslint-config-next/typescript`), so they are spread
directly. The old `FlatCompat` / `@eslint/eslintrc` wrapper is gone — wrapping a flat config in
`compat.config({ extends: [...] })` throws `Converting circular structure to JSON`.

Two version ceilings hold this toolchain together — **do not bump past them**:

- **`eslint` and `@eslint/js` stay on `^9`.** `eslint-plugin-react`, `eslint-plugin-import` and
  `eslint-plugin-jsx-a11y` (all transitive deps of `eslint-config-next`) cap their peer range at
  eslint 9 in *every published version*. On eslint 10 the run dies with
  `contextOrFilename.getFilename is not a function`.
- **`typescript` stays on `^6`.** `typescript-eslint@8` (latest) hard-throws
  `typescript-eslint does not support TS 7.0` — it reads `ts.versionMajorMinor` and there is no
  escape hatch, so TS 7 disables the entire lint setup. Track
  https://github.com/typescript-eslint/typescript-eslint/issues/10940 before upgrading.

The config previously extended `plugin:@tanstack/query/recommended` and turned off
`@tanstack/query/exhaustive-deps`, but there is no TanStack Query anywhere in the repo, so the
plugin linted nothing — both lines and the dependency were removed.

Next 16 also pulls in `eslint-plugin-react-hooks@7`, whose `react-hooks/set-state-in-effect` rule
is why the modal provider and the language select no longer sync state from a mount effect (see
below).

### Git hooks (husky v9 + lint-staged)

Hooks are live: `prepare: "husky"` runs on `pnpm install`, which generates `.husky/_/` (self-
ignored) and points `core.hooksPath` at it. Hook files are plain commands — husky v9 dropped the
`#!/usr/bin/env sh` + `. .../husky.sh` preamble, and v10 errors on it, so do not add it back.

- `.husky/pre-commit` → `pnpm exec lint-staged` → `eslint --fix --max-warnings=0` on staged
  `*.{ts,tsx}`. The repo is at zero warnings, and `--max-warnings=0` is what keeps it there, so
  a warning blocks the commit just like an error. For a deliberately unused binding, use the `^_`
  prefix the `@typescript-eslint/no-unused-vars` rule already whitelists (`_unused`) rather than
  loosening the flag.
- `.husky/pre-push` → `pnpm exec tsc --noEmit` (~5s; deliberately not a full build).

`prettier` is intentionally **not** wired into lint-staged. `.prettierrc` (4 spaces, no semicolons)
disagrees with ~18 of the 41 `.ts`/`.tsx` files, which are tab-indented with semicolons; running
`prettier --write` on commit would reformat each of those wholesale the first time it is touched.
Formatting the repo in one pass is the prerequisite for enabling it.

Bypass with `git commit --no-verify` / `git push --no-verify` when genuinely needed.

## Architecture

Next.js 16 App Router + React 19 + Tailwind v4 + next-intl + next-themes. A single-page-ish personal portfolio;
all content is hardcoded in components — there is no backend, no API layer, no data fetching.
`services/fetch-requests.ts` is an empty placeholder and `lib/getReq.ts` is a fake delayed
promise used to simulate requests.

### Locale via cookie, not URL segment

This is the most important non-obvious decision. There is **no `[locale]` route segment and no
middleware**. Instead:

- `constants/index.ts` defines `LANGUAGE_KEY = "lang"`; `constants/options.ts` lists the three
  locales (`uz` default, `ru`, `en`) with their labels and flag icons.
- `components/layouts/main-layout/header/language-select.tsx` writes the chosen locale to a
  `js-cookie` cookie and calls `router.refresh()`. It **reads** the active locale from
  next-intl's `useLocale()`, not from the cookie — the server already resolved it, so the label is
  correct in the SSR HTML with no mount effect and no flash of the default language.
- `i18n/request.ts` (wired in via `createNextIntlPlugin` in `next.config.ts`) reads that cookie
  server-side and loads `messages/{locale}.json`.
- `app/layout.tsx` reads `getLocale()` for `<html lang>`.

Consequence: **every route is dynamically rendered** (`ƒ` in build output) because the root layout
reads cookies. URLs are locale-free. Adding a locale means: entry in `constants/options.ts`, flag
SVG in `public/icons/`, and a new `messages/<locale>.json` — keep all three message files in key
sync (they are flat, single-namespace objects).

Translations are consumed almost exclusively through `<ClientTranslate translationKey="..." />`
(`components/client-translate.tsx`), a `"use client"` wrapper over `useTranslations` that renders
into a `<span>` and optionally runs the string through `html-react-parser` when `isParse` is set.
Prefer it over calling `useTranslations` directly, so server components can stay server components.

### Layout composition

Two distinct things share the name "layout" — do not conflate them:

- `app/(main)/layout.tsx` — the route group layout: `<Header />` + children + `<Footer />`.
- `components/layouts/main-layout/index.tsx` — a **width/spacing container** (`max-w-7xl`,
  responsive padding, top offset for the fixed header). Pages and section components import it as
  `MainLayout` and override spacing via the `className` prop, which is merged with `cn()`.

Nesting is: `app/layout.tsx` (fonts, `Providers`, `NextTopLoader`, `Toaster`, `Suspense` +
`FallbackLoader`) → `app/(main)/layout.tsx` (header/footer) → page → `MainLayout` container.

### Home page sections

`app/(main)/page.tsx` renders `app/_components/index.tsx`, which composes the sections
(`hero/`, `stack/`, `about-me/`, `works/`, `contact-cta/`). The `_components` and `_providers`
underscore folders are private App Router folders — that is where page-specific composition lives,
while `components/` holds anything shared. Each section follows the pattern `index.tsx` (server,
wraps in `MainLayout`) + a `"use client"` child only where something is actually interactive.

Sections animate on scroll via `components/common/scroll-reveal.tsx` (framer-motion,
`whileInView` + `once: true`). It triggers at `amount: 0.05` on purpose — a section taller than the
viewport otherwise stays invisible while it scrolls past.

### Content lives in `constants/`, not in components

`constants/projects.ts` is the single source for both the home page (`featuredProjects`) and
`/works`; it was previously duplicated in two files. `constants/stack.ts`, `constants/contacts.ts`
(contacts + socials + `navLinks`) and `constants/experience.ts` follow the same rule.

Two hard rules for this data: **it must be true**, and its prose must live in
`messages/*.json` under a `descriptionKey`. The tech tags on each project come from that repo's
real GitHub language/dependency data, and every project links a working demo — an HR reader can
click through and check. `constants/experience.ts` is deliberately an empty array; the `/about`
timeline is hidden until it is filled in rather than showing invented employment.
`constants/projects.test.ts` guards the screenshots, keys and links.

### Theme (dark + light)

`next-themes` is wired in `app/_providers/index.tsx` (`attribute="class"`, `defaultTheme="dark"`,
`enableSystem`), `<html>` carries `suppressHydrationWarning`, and `app/globals.css` opens with
`@custom-variant dark (&:is(.dark *))` so the `dark:` variant follows the class rather than the
media query. `components/common/theme-toggle.tsx` keeps both icons in the DOM and swaps them with
CSS — no `mounted` flag, so the server HTML and first client render agree.

Decorative background layers (`.bg-grid`, `.bg-glow`) must be **full-bleed or inside a rounded
card**. Putting one behind a `max-w-7xl` page header renders it as a hard-edged coloured rectangle;
that is why `components/common/page-header.tsx` is deliberately undecorated and leans on spacing.

### Modal system

`app/_providers/modal-provider.tsx` is a context holding `Record<string, boolean>` keyed by string
IDs from `constants/modal-keys.ts`. Open/close via the `useModal(key)` hook, or a named wrapper
like `hooks/use-login-modal.ts`. It reads `usePathname()` and clears all modals when the route
changes, by adjusting state **during render** (the React-sanctioned pattern) rather than in an
effect. Note that most of the keys in `modal-keys.ts` are carried over from another project and
are currently unused.

It used to hold a `mounted` flag and `return null` before hydration. Because this provider wraps
the whole app, that blanked the entire server-rendered HTML — every page shipped empty and only
appeared after hydration. The flag is gone; nothing here reads a client-only API during render
anymore.

## Conventions

- Path alias `@/*` maps to the repo root — import as `@/components/...`, `@/lib/utils`.
- `cn()` from `@/lib/utils` (clsx + tailwind-merge) for all conditional classes; components that
  are meant to be positioned by their parent take a `className` prop and merge it last.
- shadcn/ui, "new-york" style, `rsc: true`, lucide icons — `components/ui/` is generated code
  (`pnpm dlx shadcn@latest add <component>`); prefer regenerating over hand-editing.
- Tailwind v4: no `tailwind.config`. Design tokens live in `@theme inline` + `:root` (light) and
  `.dark` inside `app/globals.css`. **Use the tokens** — `bg-surface`, `border-border`,
  `text-muted-foreground`, `text-primary`. A literal hex or a `purple-600` will look wrong in one
  of the two themes; the redesign removed every one of them.
- Section rhythm comes from `components/common/section.tsx` (mono index + heading + description)
  and `components/common/page-header.tsx` for route-level headings. Reuse them instead of
  hand-rolling a heading block.
- **Formatting is inconsistent across the repo.** `.prettierrc` says 4 spaces / no semicolons /
  double quotes, but many files (all of `app/(main)/*`, header, footer, `client-translate.tsx`)
  are tab-indented with semicolons from a different formatter. Match the file you are editing;
  do not reformat a whole file as a side effect of a small change.
- `next.config.ts` allows remote images from **any** host, so `next/image` with external URLs
  works out of the box. It used to carry a vestigial `publicRuntimeConfig.FIREBASE_CONFIG` block
  (nothing read it, and there is no Firebase dependency); Next 16 dropped `publicRuntimeConfig`
  from `NextConfig` entirely, which broke `tsc --noEmit` and `next build`, so the block is gone.

## Notes

An OpenAI Codex or Gemini CLI config was detected on this machine (`~/.gemini`). Reply `/import`
to scan and list what is importable (MCP servers, slash commands, subagents, skills,
instructions), then `/import --yes=<digest>` (the scan output names the digest) to apply the
user-level items. If `/import` is unavailable on this surface, run `claude import` from a terminal.

## Claude Code setup (`.claude/`)

The repo carries its own Claude Code configuration; it is committed, so it travels with the code.

**`.claude/settings.json`** — a permission allowlist for the routine commands (`pnpm test`,
`tsc --noEmit`, `pnpm lint`, `pnpm build`, read-only git) so they stop prompting, an `ask` on
`git push`, and a `deny` on `.env` reads, `rm -rf`, `git reset --hard` and any `--no-verify`
(bypassing the husky hooks is not something to do by accident). Personal settings — model, theme —
stay in `~/.claude/settings.json`; this file is shared. `.claude/settings.local.json` is gitignored
for machine-local overrides.

**Hooks** (`.claude/hooks/`, wired in `settings.json`):

- `post-edit-lint.sh` — `PostToolUse` on `Edit|Write`: runs `eslint --fix --max-warnings=0` on the
  single `.ts`/`.tsx` file just touched and exits 2 with the output on failure. Same rule as
  `.husky/pre-commit`, only it fires while the change is still in context.
- `stop-typecheck.sh` — `Stop`: one `pnpm exec tsc --noEmit` before the turn ends (same gate as
  `.husky/pre-push`). It bails out immediately when `stop_hook_active` is true, which is what keeps
  a type error from turning into a loop.

Both parse the hook JSON with `grep`/`sed` rather than `jq`, which is not guaranteed to be present.

**Slash commands** (`.claude/commands/`): `/check` (test → tsc → lint), `/i18n <key> "<uz matn>"`
(adds to all three message files, verifies with `tests/i18n.test.ts`), `/section <name>` (scaffolds
a home section on the `MainLayout` + `Section` pattern), `/project <repo-url>` (adds a verified
entry to `constants/projects.ts`), `/ship [msg]` (full gate, then commit — refuses on red).

**Subagents** (`.claude/agents/`): `ui-reviewer` (read-only; theme tokens, hardcoded strings,
reuse, client/server boundary) and `test-writer` (vitest + `renderWithIntl` conventions).

**Skills** (`.claude/skills/`): `portfolio-dev` (start the dev server, screenshot both themes,
read the console) and `i18n-keys` (the full translation ruleset).

No `.mcp.json` — `playwright` and `context7` are configured at user level, and duplicating them per
project would just start a second copy of each server.
