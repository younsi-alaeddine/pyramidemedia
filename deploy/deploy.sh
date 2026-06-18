#!/usr/bin/env bash
set -euo pipefail

# Deploy Pyramide Media to VPS (run on the server as root)
# Usage: ./deploy/deploy.sh

DEPLOY_PATH="${DEPLOY_PATH:-/var/www/pyramidemedia}"
REPO_URL="${REPO_URL:-git@github.com:younsi-alaeddine/pyramidemedia.git}"
BRANCH="${BRANCH:-main}"

log() { echo "[deploy] $*"; }
die() { echo "[deploy] ERROR: $*" >&2; exit 1; }

command -v node >/dev/null || die "Node.js is required"
command -v npm >/dev/null || die "npm is required"
command -v pm2 >/dev/null || die "PM2 is required"

if [ ! -d "$DEPLOY_PATH/.git" ]; then
  log "Cloning repository to $DEPLOY_PATH"
  mkdir -p "$(dirname "$DEPLOY_PATH")"
  git clone "$REPO_URL" "$DEPLOY_PATH"
fi

cd "$DEPLOY_PATH"
log "Pulling latest changes ($BRANCH)"
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

mkdir -p logs

if [ ! -f apps/api/.env ]; then
  log "Creating apps/api/.env from example — edit secrets before production traffic"
  cp apps/api/.env.example apps/api/.env
fi

log "Installing dependencies"
npm ci

log "Generating Prisma client"
npm exec --workspace=api prisma generate

log "Running database migrations"
npm exec --workspace=api prisma migrate deploy

log "Seeding database (idempotent where possible)"
npm run db:seed --workspace=api || log "Seed skipped or already applied"

log "Building applications"
npm run build

log "Restarting PM2 processes"
pm2 startOrReload ecosystem.config.js --update-env
pm2 save

log "Health checks"
sleep 5
curl -fsS "http://127.0.0.1:3011/api/health" >/dev/null || die "API health check failed"
curl -fsS -o /dev/null "http://127.0.0.1:3010" || die "Web health check failed"

if command -v nginx >/dev/null; then
  nginx -t && systemctl reload nginx
  log "nginx reloaded"
fi

log "Deployment complete"
pm2 status
