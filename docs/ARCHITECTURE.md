# Pyramide Media — Architecture

## Overview

Monorepo with a **Next.js 15** public site + admin dashboard and a **NestJS** headless CMS API backed by **PostgreSQL**.

```
pyramide-media/
├── apps/
│   ├── web/          # Next.js frontend (public + admin)
│   └── api/          # NestJS REST API
├── packages/
│   └── shared/       # Shared TypeScript types
├── docker/           # Docker configs
├── docs/             # Documentation
└── docker-compose.yml
```

## Frontend (`apps/web`)

### Layer separation

| Layer | Path | Responsibility |
|-------|------|----------------|
| UI | `src/components/` | Presentational components |
| Pages | `src/app/` | Route composition, metadata |
| Services | `src/services/` | API calls, data fetching |
| Business logic | `src/lib/` | Validation, SEO, utilities |
| Config | `src/config/` | Site constants, navigation |
| Types | `src/types/` | TypeScript interfaces |

### Route groups

- `(public)` — Marketing site with shared layout
- `admin` — Protected CMS dashboard
- `api` — Next.js route handlers (sitemap, revalidation)

## Backend (`apps/api`)

### Modules

- `auth` — JWT + social login ready
- `pages` — CMS pages
- `services` — Service catalog
- `portfolio` — Projects & case studies
- `blog` — Articles
- `testimonials` — Client reviews
- `team` — Team members
- `seo` — Global & per-page SEO
- `contact` — Form submissions
- `newsletter` — Subscriptions

### Security

- Helmet, CORS, rate limiting (`@nestjs/throttler`)
- Input validation (`class-validator`)
- JWT with refresh tokens
- CSRF via double-submit cookie pattern for admin

## Data flow

```
Browser → Next.js (SSR/ISR) → NestJS API → PostgreSQL
                ↓
         Static fallback data (dev / offline)
```

## Deployment

- **Docker Compose**: web, api, postgres, nginx
- **CI/CD**: GitHub Actions build → push images → VPS deploy
- **VPS ready**: Environment-based config, health checks
