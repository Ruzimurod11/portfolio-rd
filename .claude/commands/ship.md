---
description: Verify everything, then stage and commit — refuses to commit on a red check
argument-hint: [commit message]
allowed-tools: Bash(pnpm test:*), Bash(pnpm exec tsc:*), Bash(pnpm lint:*), Bash(git status:*), Bash(git diff:*), Bash(git add:*), Bash(git commit:*), Bash(git log:*), Read, Edit
---

Commit the current work. Message hint (may be empty): **$ARGUMENTS**

1. `git status --short` and `git diff --stat` — show the user what is about to be committed.
2. Run the full gate: `pnpm test`, then `pnpm exec tsc --noEmit`, then `pnpm lint`.
   **If any of them fails, stop. Do not commit.** Report the failure and offer to fix it.
3. Only when all three are green: stage the relevant files (`git add <paths>` — not `git add -A`
   unless the user asked for everything) and commit.
4. Commit message: conventional-commit style, matching `git log --oneline -10` in this repo
   (`feat:`, `fix:`, `chore:`). One line, imperative, no body unless the change needs one.
   Do not add a Claude co-author trailer — the user's `attribution` setting turns it off.
5. Never pass `--no-verify`. The husky pre-commit hook is part of the gate.
6. Do not push. If the user wants that, they will ask.

End with the commit hash and subject line.
