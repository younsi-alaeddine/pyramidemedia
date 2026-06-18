import type { Locale } from "@/i18n/config";
import type {
  BlogPost,
  PortfolioItem,
  Service,
  TeamMember,
  Testimonial,
} from "@/types";

const API_URL = process.env.API_URL ?? "http://localhost:3001";

export type CmsSeo = {
  siteTitle: string;
  siteDescription: string;
  ogImage?: string | null;
  googleAnalytics?: string | null;
};

export type CmsContent = {
  services: Service[];
  portfolioItems: PortfolioItem[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  teamMembers: TeamMember[];
  seo: CmsSeo | null;
};

type DbService = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: unknown;
  order: number;
};

type DbPortfolio = {
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  technologies: unknown;
  images: unknown;
  featured: boolean;
  caseStudyUrl: string | null;
};

type DbBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  tags: unknown;
  publishedAt: Date | string | null;
  author?: { name: string; avatar: string | null } | null;
};

type DbTestimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string | null;
  rating: number;
};

type DbTeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string | null;
  social: unknown;
};

async function fetchCms<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
}

function mapService(item: DbService): Service {
  return {
    slug: item.slug,
    title: item.title,
    shortDescription: item.shortDescription,
    description: item.description,
    icon: item.icon,
    features: asStringArray(item.features),
    order: item.order,
  };
}

function mapPortfolio(item: DbPortfolio): PortfolioItem {
  return {
    slug: item.slug,
    title: item.title,
    client: item.client,
    category: item.category,
    description: item.description,
    technologies: asStringArray(item.technologies),
    images: asStringArray(item.images),
    featured: item.featured,
    caseStudyUrl: item.caseStudyUrl ?? undefined,
  };
}

function mapBlogPost(item: DbBlogPost): BlogPost {
  return {
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    content: item.content,
    coverImage: item.coverImage ?? undefined,
    tags: asStringArray(item.tags),
    publishedAt: item.publishedAt
      ? new Date(item.publishedAt).toISOString()
      : new Date().toISOString(),
    author: {
      name: item.author?.name ?? "Pyramide Media",
      avatar: item.author?.avatar ?? undefined,
    },
  };
}

function mapTestimonial(item: DbTestimonial): Testimonial {
  return {
    id: item.id,
    name: item.name,
    role: item.role,
    company: item.company,
    quote: item.quote,
    avatar: item.avatar ?? undefined,
    rating: item.rating,
  };
}

function mapTeamMember(item: DbTeamMember): TeamMember {
  const social =
    item.social && typeof item.social === "object"
      ? (item.social as TeamMember["social"])
      : {};

  return {
    id: item.id,
    name: item.name,
    role: item.role,
    bio: item.bio,
    photo: item.photo ?? undefined,
    social,
  };
}

export async function fetchCmsContent(_locale: Locale): Promise<CmsContent> {
  const [services, portfolioItems, blogPosts, testimonials, teamMembers, seo] =
    await Promise.all([
      fetchCms<DbService[]>("/api/content/services"),
      fetchCms<DbPortfolio[]>("/api/content/portfolio"),
      fetchCms<DbBlogPost[]>("/api/content/blog"),
      fetchCms<DbTestimonial[]>("/api/content/testimonials"),
      fetchCms<DbTeamMember[]>("/api/content/team"),
      fetchCms<CmsSeo>("/api/content/seo"),
    ]);

  return {
    services: services?.map(mapService) ?? [],
    portfolioItems: portfolioItems?.map(mapPortfolio) ?? [],
    blogPosts: blogPosts?.map(mapBlogPost) ?? [],
    testimonials: testimonials?.map(mapTestimonial) ?? [],
    teamMembers: teamMembers?.map(mapTeamMember) ?? [],
    seo: seo ?? null,
  };
}

export function servicesToNavServices(services: Service[]) {
  return Object.fromEntries(
    services.map((service) => [
      service.slug,
      {
        title: service.title,
        description: service.shortDescription,
      },
    ]),
  );
}
