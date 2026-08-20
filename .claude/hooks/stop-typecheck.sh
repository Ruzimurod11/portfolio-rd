#!/usr/bin/env bash
# Stop: one typecheck before handing the turn back — same gate as .husky/pre-push.
set -uo pipefail

payload=$(cat)

# already re-entered once because of this hook: let the turn end, never loop
case "$payload" in
    *'"stop_hook_active":true'* | *'"stop_hook_active": true'*) exit 0 ;;
esac

root="${CLAUDE_PROJECT_DIR:-$(dirname "$(dirname "$(dirname "$(readlink -f "$0")")")")}"
cd "$root" || exit 0

out=$(pnpm exec tsc --noEmit 2>&1)
status=$?

if [ $status -ne 0 ]; then
    printf 'tsc --noEmit failed — fix before finishing:\n%s\n' "$out" >&2
    exit 2
fi
exit 0
