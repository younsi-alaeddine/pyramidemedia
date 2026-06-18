import type {
  BlogPost,
  PortfolioItem,
  Service,
  TeamMember,
  Testimonial,
} from "@/types";
import type { Locale } from "@/i18n/config";
import {
  getAllBlogPostsFromCms,
  getAllPortfolioFromCms,
  getAllServicesFromCms,
  getBlogPostBySlugFromCms,
  getPortfolioBySlugFromCms,
  getServiceBySlugFromCms,
} from "@/i18n/get-dictionary";

export async function getServices(): Promise<Service[]> {
  return getAllServicesFromCms("fr");
}

export async function getService(
  locale: Locale,
  slug: string,
): Promise<Service | undefined> {
  return getServiceBySlugFromCms(locale, slug);
}

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  return getAllBlogPostsFromCms(locale);
}

export async function getBlogPost(
  locale: Locale,
  slug: string,
): Promise<BlogPost | undefined> {
  return getBlogPostBySlugFromCms(locale, slug);
}

export async function getPortfolioItems(locale: Locale): Promise<PortfolioItem[]> {
  return getAllPortfolioFromCms(locale);
}

export async function getPortfolioItem(
  locale: Locale,
  slug: string,
): Promise<PortfolioItem | undefined> {
  return getPortfolioBySlugFromCms(locale, slug);
}

export type { Service, BlogPost, PortfolioItem, Testimonial, TeamMember };
