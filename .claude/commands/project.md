---
description: Add a real project to constants/projects.ts (with verified tech + working demo)
argument-hint: <github-repo-url>
allowed-tools: Read, Edit, WebFetch, Bash(pnpm exec vitest:*), Bash(gh repo view:*), Grep
---

Add a new entry to `constants/projects.ts` for: **$ARGUMENTS**

The two hard rules for this file: **the data must be true**, and its prose must live in
`messages/*.json` under a `descriptionKey`. An HR reader clicks these links.

1. Read `constants/projects.ts` for the `IProject` shape and the style of existing entries.
2. Gather the facts from the repo itself — `gh repo view <url> --json name,description,languages,
   homepageUrl` (or fetch the repo page) plus its `package.json` dependencies. The `tech` array
   must reflect what the repo **actually** uses; do not guess a stack from the project name.
3. Confirm the `demo` URL actually loads. If there is no working demo, say so and ask the user
   whether to add the entry anyway — a dead link is worse than a missing project.
4. `image`: point at a real file in `public/`. If no screenshot exists yet, tell the user which
   filename to drop in rather than referencing a non-existent path.
5. `descriptionKey`: add a `project<Name>Desc` key to all three `messages/*.json` files
   (see `/i18n`). Two short sentences: what it does, what was interesting to build.
6. `featured: true` only if the user wants it on the home page — `featuredProjects` feeds the
   home `works` section, the full list feeds `/works`.

Verify with `pnpm exec vitest run constants/projects.test.ts` — it guards the screenshots, keys and
links — and report the result.
