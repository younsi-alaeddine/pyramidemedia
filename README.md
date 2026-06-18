# Pyramide Media

Production-ready digital agency website with headless CMS architecture.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui |
| Backend | NestJS, Prisma ORM |
| Database | PostgreSQL |
| Auth | JWT (social login ready) |
| Deployment | Docker, VPS-ready, CI/CD |

## Project Structure

```
apps/
  web/     → Next.js public site + admin dashboard
  api/     → NestJS REST API
docs/      → Architecture, schema, roadmap
docker/    → Dockerfiles
```

## Quick Start

### Prerequisites

- Node.js 22+
- PostgreSQL 16+ (or Docker)

### Frontend

```bash
cd apps/web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend

```bash
cd apps/api
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

API runs at [http://localhost:3001](http://localhost:3001)

### Docker (full stack)

```bash
docker compose up -d
```

## Pages

- `/` — Home
- `/services` — Services listing
- `/services/[slug]` — Service detail
- `/portfolio` — Portfolio
- `/case-studies` — Case studies
- `/about` — About us
- `/blog` — Blog listing
- `/blog/[slug]` — Article detail
- `/contact` — Contact form
- `/privacy` — Privacy policy
- `/terms` — Terms & conditions
- `/admin` — Admin dashboard

## Design System

Brand colors derived from the Stitch design reference:

- **Primary Blue**: Electric cobalt (`oklch(0.52 0.22 264)`)
- **Navy**: Deep navy backgrounds for dark mode
- **Typography**: Inter (body) + Space Grotesk (headings)
- **Theme**: Light & dark mode via `next-themes`

## SEO

- Dynamic metadata per page
- JSON-LD schema markup (Organization, Service, Article, FAQ, Breadcrumb)
- Auto-generated `sitemap.xml` and `robots.txt`

## Security

- Rate limiting (API + Next.js routes)
- Input validation (Zod + class-validator)
- Helmet security headers
- CORS configuration

## License

Proprietary — Pyramide Media © 2026
