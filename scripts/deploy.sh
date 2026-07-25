#!/usr/bin/env bash
set -euo pipefail

echo "━━━ LifeOS Deploy ━━━"
echo ""

# 1. Controlla Vercel CLI
if ! command -v vercel &>/dev/null; then
  echo "❌ Vercel CLI non trovato. Installalo con: npm i -g vercel"
  exit 1
fi

# 2. Pull env da Vercel (se già collegato)
if [ -f .vercel/project.json ]; then
  echo "📦 Pull ambiente Vercel..."
  vercel env pull --yes .env.vercel 2>/dev/null || true
fi

# 3. Build
echo "🔨 Build Angular..."
npx ng build

# 4. Deploy
echo ""
echo "🚀 Deploy su Vercel..."
vercel --prod

echo ""
echo "✅ Deploy completato!"
