# Déploiement Pyramide Media

## Architecture production (VPS)

| Composant | Port | Description |
|-----------|------|-------------|
| `pyramide-web` (PM2) | 3010 | Next.js — site public + admin |
| `pyramide-api` (PM2) | 3011 | NestJS — API REST |
| PostgreSQL (Docker) | 5432 | Base de données (localhost only) |
| nginx | 443 | Reverse proxy → `127.0.0.1:3010` |

Les ports 3000/3001 sont utilisés par **immb** sur le même VPS — pyramidemedia utilise 3010/3011.

## Première installation sur le VPS

```bash
# 1. Cloner
git clone git@github.com:younsi-alaeddine/pyramidemedia.git /var/www/pyramidemedia
cd /var/www/pyramidemedia

# 2. PostgreSQL
cp .env.example .env  # optional, for docker-compose.prod.yml
docker compose -f docker-compose.prod.yml up -d

# 3. Variables d'environnement
cp apps/api/.env.production.example apps/api/.env
cp apps/web/.env.production.example apps/web/.env.production.local
# Éditer les secrets (JWT, mots de passe, DATABASE_URL)

# 4. Déployer
chmod +x deploy/deploy.sh
./deploy/deploy.sh

# 5. nginx + SSL
sudo cp deploy/nginx-pyramidemedia.conf /etc/nginx/sites-available/pyramidemedia
sudo ln -sf /etc/nginx/sites-available/pyramidemedia /etc/nginx/sites-enabled/
sudo certbot --nginx -d pyramidemedia.com -d www.pyramidemedia.com
sudo nginx -t && sudo systemctl reload nginx
```

## CI/CD (GitHub Actions)

Configurer ces secrets dans le dépôt GitHub :

| Secret | Valeur |
|--------|--------|
| `SERVER_HOST` | IP ou hostname du VPS |
| `SERVER_USER` | `root` |
| `SERVER_SSH_KEY` | Clé privée SSH |
| `SERVER_PORT` | `22` (optionnel) |

Le workflow `.github/workflows/deploy.yml` se déclenche sur push vers `main`.

## Développement local

```bash
./deploy/setup-local.sh
npm run dev:api   # :3001
npm run dev:web   # :3000
```

Ou stack Docker complète :

```bash
docker compose up -d
```

## Admin

- URL : `/admin`
- Identifiants par défaut (dev) : voir `apps/api/.env.example`
- **Changer le mot de passe admin en production**
