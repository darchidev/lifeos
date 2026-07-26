#!/usr/bin/env bash
set -euo pipefail

echo "🔨 Build Angular..."
npx ng build

echo "🧹 Cleanup prerendered routes (keep only /login)..."
rm -f dist/lifeos/browser/index.html

for dir in dist/lifeos/browser/*/; do
  dirname=$(basename "$dir")
  if [ "$dirname" != "login" ] && [ -f "${dir}index.html" ]; then
    echo "   Removing: $dirname"
    rm -rf "$dir"
  fi
done

echo "✅ Build complete"
