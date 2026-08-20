#!/usr/bin/env bash
# PostToolUse (Edit|Write): lint just the file that was touched.
# Same rule as .husky/pre-commit (eslint --fix --max-warnings=0), only it runs
# now instead of at commit time, so Claude can fix it while the context is warm.
set -uo pipefail

payload=$(cat)

# no jq dependency: pull the first "file_path" out of the tool_input JSON
file=$(printf '%s' "$payload" \
    | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' \
    | head -1 \
    | sed 's/.*:[[:space:]]*"//; s/"$//')

[ -n "$file" ] || exit 0
case "$file" in
    *.ts | *.tsx) ;;
    *) exit 0 ;;
esac
case "$file" in
    */node_modules/* | */.next/*) exit 0 ;;
esac
[ -f "$file" ] || exit 0

root="${CLAUDE_PROJECT_DIR:-$(dirname "$(dirname "$(dirname "$(readlink -f "$0")")")")}"
cd "$root" || exit 0

# outside this repo -> not ours to lint
case "$file" in
    "$root"/*) ;;
    /*) exit 0 ;;
esac

out=$(pnpm exec eslint --fix --max-warnings=0 "$file" 2>&1)
status=$?

if [ $status -ne 0 ]; then
    printf 'eslint failed on %s (pre-commit would block this):\n%s\n' "$file" "$out" >&2
    exit 2
fi
exit 0
