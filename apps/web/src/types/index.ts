export type PublishStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
}

export interface PortfolioItem {
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  technologies: string[];
  images: string[];
  featured: boolean;
  caseStudyUrl?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  publishedAt: string;
  author: { name: string; avatar?: string };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  social: { linkedin?: string; twitter?: string };
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

export interface SeoMeta {
  title: string;
  description: string;
  ogImage?: string;
  noIndex?: boolean;
}
