---
name: portfolio-dev
description: Run this portfolio locally and look at it — start the dev server, open a route in the browser, screenshot it in both dark and light theme, and read the console for errors. Use when asked to run/start/preview the app, take a screenshot, or confirm a UI change actually works in the browser rather than only in tests.
---

# Running and inspecting the portfolio

Tests and `tsc` do not catch a section that renders invisible, a token that looks wrong in light
mode, or a hydration warning. This is how to actually look at the page.

## 1. Start the dev server

```bash
pnpm dev
```

Run it **in the background** (`run_in_background: true`). It uses Turbopack and serves on
http://localhost:3000; if 3000 is taken Next picks the next free port — read the real URL out of
the output before navigating. Wait for the `Ready` line rather than sleeping a fixed amount.

If a dev server is already running on 3000, reuse it instead of starting a second one.

## 2. Open the page

Use the playwright MCP tools (`mcp__playwright__browser_navigate`, `browser_snapshot`,
`browser_take_screenshot`, `browser_console_messages`).

Routes worth checking: `/` (hero → stack → about → works → contact-cta), `/about`, `/works`,
`/contacts`.

## 3. Check both themes — always both

`next-themes` runs with `attribute="class"` and `defaultTheme="dark"`, so `<html>` carries `dark`.
A component that only got checked in dark mode is a component that got checked once. Switch by
clicking the theme toggle in the header (`components/common/theme-toggle.tsx`), or directly:

```js
// mcp__playwright__browser_evaluate
localStorage.setItem("theme", "light"); location.reload();
```

Screenshot each theme. Look specifically for: invisible text, a hard-edged coloured rectangle
behind a heading (a `.bg-glow` / `.bg-grid` layer clipped to `max-w-7xl`), and washed-out borders.

## 4. Check the locales if translations changed

The locale lives in a **cookie**, not the URL — there is no `[locale]` segment. Switch with the
header language select, or set the cookie and reload:

```js
document.cookie = "lang=en; path=/"; location.reload();
```

`uz` is the default; `ru` and `en` are the others. Longer German-style words are not a risk here,
but Russian strings are noticeably longer than Uzbek ones and are where layouts break.

## 5. Read the console

`mcp__playwright__browser_console_messages`. A hydration mismatch, a missing-message warning from
next-intl, or a `next/image` config error all show up here and nowhere else.

## 6. Clean up

Stop the background dev server when finished. Do not leave it running across turns unless the user
asked you to keep it up.

## Scroll-reveal gotcha

Sections animate in via `components/common/scroll-reveal.tsx` (framer-motion `whileInView`,
`once: true`, `amount: 0.05`). A screenshot taken immediately after navigation can catch a section
mid-fade. Scroll the section into view and give the animation a beat before capturing.
