---
name: i18n-keys
description: Rules for translations in this repo — the cookie-based locale (no URL segment), ClientTranslate, keeping uz/ru/en in key sync, ICU-escaped HTML for isParse, and adding a new locale. Use whenever touching messages/*.json, a translation key, or anything locale-related.
---

# Translations in this portfolio

## The locale is a cookie, not a URL segment

There is **no `[locale]` route segment and no middleware**. Do not add one.

- `constants/index.ts` → `LANGUAGE_KEY = "lang"`; `constants/options.ts` lists the locales
  (`uz` default, `ru`, `en`) with labels and flag icons.
- `components/layouts/main-layout/header/language-select.tsx` writes the cookie with `js-cookie`
  and calls `router.refresh()`. It **reads** the active locale from next-intl's `useLocale()` —
  never from the cookie — so the SSR HTML already has the right label and there is no flash of the
  default language. Do not "fix" this by syncing state in a mount effect;
  `react-hooks/set-state-in-effect` (react-hooks v7) will reject it.
- `i18n/request.ts` reads the cookie server-side and loads `messages/{locale}.json`.
- `app/layout.tsx` reads `getLocale()` for `<html lang>`.

Consequence: every route is dynamically rendered (`ƒ` in the build output) because the root layout
reads cookies. That is expected, not a regression.

## Consuming a translation

Prefer `<ClientTranslate translationKey="myKey" />` (`components/client-translate.tsx`) over
calling `useTranslations` directly — it is the `"use client"` boundary, so the component around it
can stay a server component. It renders into a `<span>`.

For a string containing HTML, pass `isParse` and it goes through `html-react-parser`. **The message
must escape its tags ICU-style**:

```json
{ "heroTitle": "Salom, men '<b>'Ruzimurod'</b>'" }
```

A bare `<b>` is read by next-intl as rich-text markup and throws because no handler was passed.

## Keeping the three files in sync

`messages/uz.json`, `ru.json`, `en.json` are **flat, single-namespace** objects. Every key must
exist in all three, and prose for content lives here rather than in components — see the
`descriptionKey` field on `constants/projects.ts`.

`tests/i18n.test.ts` is the guard: it fails with the exact missing/extra keys, and also checks that
every locale in `constants/options.ts` has both a `messages/<locale>.json` and its flag SVG in
`public/icons/`. Run it after any change here:

```bash
pnpm exec vitest run tests/i18n.test.ts
```

The `/i18n` slash command does the add-to-all-three-then-verify loop for you.

## Adding a new locale

Three things, all required or `tests/i18n.test.ts` fails:

1. an entry in `constants/options.ts` (`value`, `label`, `scr`),
2. the flag SVG at `public/icons/flag_<locale>.svg`,
3. `messages/<locale>.json` with every key the other files have.

## Testing translated components

Tests import `uz` and assert against `uz.<key>`, never a hardcoded string — see `tests/utils.tsx`
and the `test-writer` agent. Copy changes then do not break the suite.
