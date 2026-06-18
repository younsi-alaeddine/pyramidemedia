# Database Schema

PostgreSQL via Prisma ORM. See `apps/api/prisma/schema.prisma` for the source of truth.

## Entity Relationship

```
User ──┬── Page
       ├── Service
       ├── PortfolioItem
       ├── BlogPost
       ├── Testimonial
       ├── TeamMember
       └── SeoSetting

ContactRequest (standalone)
NewsletterSubscriber (standalone)
```

## Tables

### users
Admin users with JWT auth. Social login fields ready (`provider`, `providerId`).

### pages
CMS-managed static pages (slug, title, content blocks JSON, published status).

### services
Agency services with slug, icon, description, features JSON, SEO fields.

### portfolio_items
Projects with images JSON, category, client, technologies, case study link.

### blog_posts
Articles with rich content, author relation, tags, publishedAt.

### testimonials
Client name, role, company, quote, avatar, rating, featured flag.

### team_members
Name, role, bio, photo, social links JSON, order.

### seo_settings
Global defaults: site title, description, OG image, analytics IDs.

### contact_requests
Name, email, phone, company, service interest, message, status, IP.

### newsletter_subscribers
Email, subscribedAt, active flag.
