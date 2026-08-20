---
description: Scaffold a new home-page section following this repo's section pattern
argument-hint: <folder-name> — e.g. testimonials
allowed-tools: Read, Write, Edit, Grep, Glob, Bash(pnpm exec tsc:*), Bash(pnpm exec eslint:*)
---

Create a new home-page section: **$ARGUMENTS**

Follow the existing pattern exactly — read `app/_components/stack/index.tsx` and
`app/_components/works/index.tsx` first and match them.

1. `app/_components/<name>/index.tsx` — a **server** component. Wrap the content in `MainLayout`
   (`@/components/layouts/main-layout`) and use `Section` (`@/components/common/section.tsx`) for
   the heading block: `index` (the next two-digit marker in sequence), `title`, `description` —
   all three are **i18n keys**, not literal strings. Do not hand-roll a heading.
2. Add a `"use client"` child component **only if** something is genuinely interactive
   (state, event handler, framer-motion gesture). Otherwise keep it all server-side.
3. Register it in `app/_components/index.tsx`, wrapped in `<ScrollReveal>` like its siblings, in
   the position the user asked for (default: before `ContactCta`).
4. Add every string to `messages/uz.json`, `ru.json`, `en.json` (see `/i18n` for the rules) and
   renumber the `index` markers of the following sections if you inserted in the middle.
5. Content that is data (lists, cards) belongs in `constants/`, not inline in the component —
   see `constants/stack.ts` for the shape. **It must be true**; do not invent entries.
6. Styling: design tokens only (`bg-surface`, `border-border`, `text-muted-foreground`,
   `text-primary`). A literal hex or a `purple-600` will look wrong in one of the two themes.
   Conditional classes go through `cn()`.

Verify with `pnpm exec tsc --noEmit` and `pnpm exec eslint <new files>`, then tell the user to run
`/portfolio-dev` if they want to see it in the browser.
