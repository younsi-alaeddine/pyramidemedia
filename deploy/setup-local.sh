#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

log() { echo "[setup] $*"; }

if [ ! -f apps/api/.env ]; then
  cp apps/api/.env.example apps/api/.env
  log "Created apps/api/.env"
fi

if [ ! -f apps/web/.env.local ]; then
  cp apps/web/.env.example apps/web/.env.local
  log "Created apps/web/.env.local"
fi

log "Installing dependencies"
npm install

log "Generating Prisma client"
npm run db:generate

if command -v docker >/dev/null && docker compose version >/dev/null 2>&1; then
  log "Starting PostgreSQL via Docker"
  docker compose up -d postgres
  log "Waiting for PostgreSQL..."
  sleep 5
  npm run db:migrate
  npm run db:seed
else
  log "Docker not found — start PostgreSQL manually, then run: npm run db:setup"
fi

log "Building apps"
npm run build

log "Local setup complete"
log "Run: npm run dev:api  (port 3001) and npm run dev:web  (port 3000)"
