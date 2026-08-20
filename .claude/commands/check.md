---
description: Run the full verification gate — vitest, tsc --noEmit, eslint
allowed-tools: Bash(pnpm test:*), Bash(pnpm exec tsc:*), Bash(pnpm lint:*), Read, Grep, Glob, Edit
---

Run the three checks **in this order** and stop at the first failure:

1. `pnpm test`
2. `pnpm exec tsc --noEmit`
3. `pnpm lint`

Rules:

- Report each step's real outcome. Never say "passed" for a step you did not run.
- On a failure: name the exact file and line, explain the cause in one or two sentences, and fix
  it — then re-run **only** the failing check before moving on.
- `pnpm lint` runs at `--max-warnings=0` in `.husky/pre-commit`; treat a warning as a failure here
  too. For a deliberately unused binding use the `^_` prefix, do not loosen the rule.
- End with a one-line summary in the shape: `✅ test 42/42 · tsc toza · lint 0 warning`.

$ARGUMENTS
