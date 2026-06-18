import type { Service, BlogPost, PortfolioItem } from "@/types";
import { defaultLocale } from "@/i18n/config";
import {
  services as staticServices,
  blogPosts as staticBlogPosts,
  portfolioItems as staticPortfolio,
  getServiceBySlug,
  getBlogPostBySlug,
  getPortfolioBySlug,
} from "@/data/content";

const API_URL = process.env.API_URL ?? "http://localhost:3001";

async function fetchApi<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  const data = await fetchApi<Service[]>("/api/services");
  return data ?? staticServices;
}

export async function getService(slug: string): Promise<Service | undefined> {
  const data = await fetchApi<Service>(`/api/services/${slug}`);
  return data ?? getServiceBySlug(defaultLocale, slug);
}

export function getServicesSync(): Service[] {
  return staticServices;
}

export function getBlogPostsSync(): BlogPost[] {
  return staticBlogPosts;
}

export function getPortfolioSync(): PortfolioItem[] {
  return staticPortfolio;
}

export {
  getServiceBySlug as getStaticService,
  getBlogPostBySlug as getStaticBlogPost,
  getPortfolioBySlug as getStaticPortfolio,
};
