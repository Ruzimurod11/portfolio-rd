<div align="center">

# portfolio-rd

**Ruzimurod Doniev — frontend developer portfolio**

A trilingual (🇺🇿 / 🇷🇺 / 🇬🇧) single-page portfolio built on the Next.js App Router,
with cookie-driven locale switching, scroll-reveal animations and a real test suite.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![next-intl](https://img.shields.io/badge/next--intl-4.13-7C3AED)](https://next-intl.dev)
[![Vitest](https://img.shields.io/badge/Vitest-4.1-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev)
[![pnpm](https://img.shields.io/badge/pnpm-10.24-F69220?logo=pnpm&logoColor=white)](https://pnpm.io)

</div>

---

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Architecture](#architecture)
  - [Locale via cookie, not URL segment](#locale-via-cookie-not-url-segment)
  - [Translating content](#translating-content)
  - [Layout composition](#layout-composition)
  - [Modal system](#modal-system)
- [Adding a language](#adding-a-language)
- [Testing](#testing)
- [Code quality](#code-quality)
- [Deployment](#deployment)
- [Contact](#contact)

---

## Features

| | |
|---|---|
| 🌍 **Three languages** | Uzbek (default), Russian and English, switchable from the header with no page reload and no locale prefix in the URL. |
| 🍪 **Cookie-based i18n** | The active locale lives in a `lang` cookie and is resolved on the server, so the very first HTML render is already in the right language — no flash of the default locale. |
| 🎞️ **Motion by default** | Hero and works carousels (embla + autoplay), scroll-triggered reveals and staggered page transitions via framer-motion. |
| 📱 **Responsive** | Mobile-first layout with a dedicated hamburger header, a shared `MainLayout` width container and Tailwind v4 design tokens. |
| ⚡ **Fast feedback** | Turbopack dev server, route progress bar (`nextjs-toploader`) and a `Suspense` fallback loader at the root. |
| 🧪 **Tested** | Vitest + Testing Library component tests, plus an i18n guard test that fails on any message-key drift between locales. |
| 🪝 **Guarded commits** | husky + lint-staged run ESLint at zero warnings on commit and a full typecheck on push. |

## Tech stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) — App Router, React Server Components, Turbopack |
| UI runtime | [React 19](https://react.dev) |
| Language | [TypeScript 6](https://www.typescriptlang.org) (`strict: true`) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config, no `tailwind.config`) |
| Components | [shadcn/ui](https://ui.shadcn.com) (`new-york`, RSC) on Radix primitives, [lucide](https://lucide.dev) + [react-icons](https://react-icons.github.io/react-icons/) |
| i18n | [next-intl](https://next-intl.dev) + [`js-cookie`](https://github.com/js-cookie/js-cookie) |
| Animation | [framer-motion](https://motion.dev), [embla-carousel](https://www.embla-carousel.com) |
| Feedback | [sonner](https://sonner.emilkowal.ski) toasts, [nextjs-toploader](https://github.com/TheSGJ/nextjs-toploader) |
| Testing | [Vitest 4](https://vitest.dev) + [Testing Library](https://testing-library.com) in jsdom |
| Tooling | ESLint 9 (flat config), Prettier, husky 9, lint-staged, pnpm 10 |

## Quick start

**Requirements**

- Node.js **20.9+** (Next 16's minimum; the repo is developed on 22 LTS)
- pnpm **10.24+** (`corepack enable pnpm`) — the repo pins `packageManager`, so other package managers will drift from `pnpm-lock.yaml`

```bash
git clone git@github.com:Ruzimurod11/portfolio-rd.git
cd portfolio-rd
pnpm install          # also runs `husky` and installs the git hooks
pnpm dev              # http://localhost:3000
```

There is **no `.env` file and nothing to configure** — the site has no backend, no API layer
and no data fetching. All content is hardcoded in components and translated through
`messages/*.json`.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server with Turbopack on `http://localhost:3000` |
| `pnpm build` | Production build — **the real verification gate** |
| `pnpm start` | Serve the production build |
| `pnpm test` | `vitest run` — the unit/component suite |
| `pnpm test:watch` | Vitest in watch mode |
| `pnpm lint` | `eslint .` (note: **not** `next lint`, which Next 16 removed) |
| `pnpm exec tsc --noEmit` | Typecheck — the fastest reliable static check after an edit |

> **Verify before you call it done:** `pnpm test` + `pnpm exec tsc --noEmit` for ordinary
> changes, and `pnpm build` for anything non-trivial.

## Project structure

```
.
├── app/
│   ├── layout.tsx              # root: fonts, Providers, top loader, Toaster, Suspense
│   ├── globals.css             # Tailwind v4 @theme tokens + :root variables
│   ├── (main)/                 # route group
│   │   ├── layout.tsx          # Header + children + Footer
│   │   ├── page.tsx            # home  →  app/_components
│   │   ├── about/page.tsx
│   │   ├── works/page.tsx
│   │   └── contacts/page.tsx
│   ├── _components/            # page-private composition (home sections)
│   │   ├── banner/             # hero + hero-swiper
│   │   ├── about-me/
│   │   └── works-swiper/       # content + work-card
│   └── _providers/             # ModalProvider and friends
├── components/
│   ├── client-translate.tsx    # the translation primitive (see below)
│   ├── common/                 # rating, scroll-reveal, title
│   ├── layouts/main-layout/    # width container + header/ + footer
│   └── ui/                     # shadcn/ui generated components
├── constants/                  # LANGUAGE_KEY, locale options, modal keys
├── hooks/                      # use-modal, use-login-modal
├── i18n/request.ts             # server-side locale resolution
├── lib/                        # cn(), getReq() (a fake delayed promise)
├── messages/                   # uz.json · ru.json · en.json  (flat, single namespace)
├── public/icons/               # flag_uz.svg · flag_ru.svg · flag_en.svg
├── tests/                      # setup.tsx + cross-cutting i18n.test.ts
└── vitest.config.mts
```

Underscore folders (`_components`, `_providers`) are **private App Router folders** — they hold
page-specific composition and never become routes. Anything shared lives in `components/`.

## Architecture

### Locale via cookie, not URL segment

This is the single most important non-obvious decision in the repo. There is **no `[locale]`
route segment and no middleware**. Instead:

```
header/language-select.tsx        i18n/request.ts               app/layout.tsx
  writes cookie "lang" ──────────► reads cookie server-side ───► getLocale() → <html lang>
  router.refresh()                 loads messages/{locale}.json
```

- `constants/index.ts` defines `LANGUAGE_KEY = "lang"`; `constants/options.ts` lists the locales.
- The select **reads** the active locale from next-intl's `useLocale()`, not from the cookie —
  the server already resolved it, so the label is correct in the SSR HTML with no mount effect.
- `i18n/request.ts` is wired in through `createNextIntlPlugin` in `next.config.ts`.

**Consequence:** every route is dynamically rendered (`ƒ` in the build output), because the root
layout reads cookies. In exchange, URLs stay locale-free and switching a language is a refresh,
not a navigation.

### Translating content

Prefer `<ClientTranslate />` over calling `useTranslations` directly — it is a thin `"use client"`
wrapper, so the component holding it can stay a server component:

```tsx
import ClientTranslate from "@/components/client-translate"

<ClientTranslate translationKey="aboutMe" className="text-purple-600" />
<ClientTranslate translationKey="profPortfolio" isParse />   // runs through html-react-parser
```

> **Gotcha:** next-intl reads a bare `<b>` in a message as rich-text markup and throws when no
> handler is passed. A message meant for `isParse` must escape its tags ICU-style (`'<b>'`) so it
> reaches `html-react-parser` as literal HTML.

### Layout composition

Two different things share the name "layout" — don't conflate them:

| | |
|---|---|
| `app/(main)/layout.tsx` | the **route group layout**: `<Header />` + children + `<Footer />` |
| `components/layouts/main-layout/index.tsx` | a **width/spacing container** (`max-w-7xl`, responsive padding, top offset for the fixed header). Pages import it as `MainLayout` and override spacing via `className`, merged with `cn()`. |

The full nesting is:

```
app/layout.tsx  →  app/(main)/layout.tsx  →  page  →  MainLayout container
```

### Modal system

`app/_providers/modal-provider.tsx` holds a `Record<string, boolean>` keyed by the string IDs in
`constants/modal-keys.ts`. Open and close through `useModal(key)`, or a named wrapper such as
`hooks/use-login-modal.ts`:

```tsx
const { isOpen, openModal, closeModal } = useModal(MODAL_KEYS.login)
```

The provider watches `usePathname()` and clears every modal on a route change by adjusting state
**during render** — the React-sanctioned pattern, not a `useEffect`. (Next 16 ships
`react-hooks/set-state-in-effect`, which flags the effect version.)

## Adding a language

Three steps, all guarded by `tests/i18n.test.ts`:

1. Add an entry to `constants/options.ts` — `{ value, label, scr }`.
2. Drop the flag SVG into `public/icons/flag_<locale>.svg` (the path must match `scr`).
3. Create `messages/<locale>.json` with **exactly** the same keys as the existing files.

Then run `pnpm test`. `tests/i18n.test.ts` fails with the precise list of missing or extra keys,
and also asserts that every locale in `constants/options.ts` has both a message file and its flag.

## Testing

```bash
pnpm test          # vitest run
pnpm test:watch    # watch mode
```

Test files sit **next to their source** (`lib/utils.test.ts`, `hooks/use-modal.test.tsx`, …).
The only exception is `tests/`, which holds the shared harness and the cross-cutting i18n guard.

`vitest.config.mts` — jsdom environment, `include: **/*.test.{ts,tsx}`, and
`resolve.tsconfigPaths` so the `@/*` alias comes straight from `tsconfig.json` (no second alias
table to keep in sync). `css.postcss.plugins` is emptied **on purpose**: `components/common/rating.tsx`
imports `@smastrom/react-rating/style.css`, and vite cannot consume the Tailwind v4 postcss plugin.

`tests/setup.tsx` carries the jsdom gaps worth knowing about:

- `IntersectionObserver` / `ResizeObserver` / `matchMedia` stubs — framer-motion's `whileInView`,
  embla and the radix dropdown all crash without them.
- `SVGElement.prototype.getBBox` — `@smastrom/react-rating` measures its star on mount.
- `next/image` mocked to a plain `<img>` so `fill` / `priority` don't leak onto the DOM.

Do **not** enable `globals: true` — tests import `describe` / `it` / `expect` from `vitest`
explicitly, which keeps the ESLint config free of test-only globals.

## Code quality

### ESLint

`eslint.config.mjs` is a **native flat config**. `eslint-config-next@16` ships flat config arrays
(`core-web-vitals`, `typescript`), so they are spread directly — the old `FlatCompat` wrapper is
gone, because wrapping a flat config in `compat.config({ extends: [...] })` throws
`Converting circular structure to JSON`.

Two version ceilings hold this toolchain together — **do not bump past them**:

| Package | Ceiling | Why |
|---|---|---|
| `eslint`, `@eslint/js` | `^9` | `eslint-plugin-react`, `eslint-plugin-import` and `eslint-plugin-jsx-a11y` (transitive deps of `eslint-config-next`) cap their peer range at eslint 9 in *every* published version. On eslint 10 the run dies with `contextOrFilename.getFilename is not a function`. |
| `typescript` | `^6` | `typescript-eslint@8` hard-throws `typescript-eslint does not support TS 7.0` — it reads `ts.versionMajorMinor` with no escape hatch. Track [typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940). |

### Git hooks

`prepare: "husky"` runs on `pnpm install`, generates `.husky/_/` and points `core.hooksPath` at it.
Hook files are plain commands — husky v9 dropped the `#!/usr/bin/env sh` preamble and v10 errors
on it, so don't add it back.

| Hook | Runs | Notes |
|---|---|---|
| `pre-commit` | `pnpm exec lint-staged` → `eslint --fix --max-warnings=0` on staged `*.{ts,tsx}` | The repo is at zero warnings and `--max-warnings=0` is what keeps it there. For a deliberately unused binding use the `^_` prefix (`_unused`) rather than loosening the flag. |
| `pre-push` | `pnpm exec tsc --noEmit` | ~5s; deliberately not a full build. |

Bypass with `--no-verify` when genuinely needed.

### Formatting

`.prettierrc` says 4 spaces / no semicolons / double quotes, but 17 of the 52 `.ts`/`.tsx`
files are tab-indented with semicolons from a different formatter. **Match the file you are
editing; never reformat a whole file as a side effect of a small change.** Prettier is
intentionally *not* wired into lint-staged — formatting the repo in one pass is the prerequisite
for enabling it.

### Conventions

- Path alias `@/*` → repo root. Import as `@/components/...`, `@/lib/utils`.
- `cn()` from `@/lib/utils` (clsx + tailwind-merge) for **all** conditional classes. Components
  positioned by their parent take a `className` prop and merge it last.
- `components/ui/` is generated code — regenerate with `pnpm dlx shadcn@latest add <component>`
  instead of hand-editing.
- Tailwind v4, no `tailwind.config`. Design tokens live in `@theme inline` / `:root` in
  `app/globals.css`. Much of the styling bypasses the tokens and uses literal hex values
  (`bg-[#eff3ff]`, `text-purple-600`) — match the surrounding file rather than "correcting" it.
- `next.config.ts` allows remote images from **any** host, so `next/image` with external URLs
  works out of the box.

## Deployment

Any Node host that runs `next start` works. Vercel is the zero-config path:

```bash
pnpm build && pnpm start     # verify the production build locally first
```

Nothing to set up beyond the build — there are no environment variables. Keep in mind that every
route is dynamic (cookie-based locale), so this is a **server-rendered** deployment, not a static
export.

## Contact

**Ruzimurod Doniev** — Frontend Developer

[![Email](https://img.shields.io/badge/Email-ruzimurod__doniev%40mail.ru-D14836?logo=maildotru&logoColor=white)](mailto:ruzimurod_doniev@mail.ru)
[![Telegram](https://img.shields.io/badge/Telegram-%40ruzimurod-26A5E4?logo=telegram&logoColor=white)](https://t.me/ruzimurod)
[![GitHub](https://img.shields.io/badge/GitHub-Ruzimurod11-181717?logo=github&logoColor=white)](https://github.com/Ruzimurod11)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ruzimurod--doniev-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ruzimurod-doniev-243026266/)
