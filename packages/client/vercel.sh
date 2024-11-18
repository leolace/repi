#!/bin/bash
echo "VERCEL_ENV: $VERCEL_ENV"

if [[ "$VERCEL_ENV" == "production" || "$VERCEL_ENV" == "preview" ]] ; then
  # Proceed with the build
  echo "✅ - Build can proceed"
  pnpm --filter common run build && pnpm build

else
  # Don't build
  echo "🛑 - Build skipped"
fi