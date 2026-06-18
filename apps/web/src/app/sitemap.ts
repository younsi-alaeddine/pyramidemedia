import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales, localizedPath } from "@/i18n/config";
import {
  getServices,
  getBlogPosts,
  getPortfolioItems,
} from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPaths = [
    "",
    "/services",
    "/portfolio",
    "/case-studies",
    "/about",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const staticPages = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${baseUrl}${localizedPath(path, locale)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }))
  );

  const servicePages = locales.flatMap((locale) =>
    getServices(locale).map((s) => ({
      url: `${baseUrl}${localizedPath(`/services/${s.slug}`, locale)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const blogPages = locales.flatMap((locale) =>
    getBlogPosts(locale).map((p) => ({
      url: `${baseUrl}${localizedPath(`/blog/${p.slug}`, locale)}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  const caseStudyPages = locales.flatMap((locale) =>
    getPortfolioItems(locale)
      .filter((p) => p.caseStudyUrl)
      .map((p) => ({
        url: `${baseUrl}${localizedPath(`/case-studies/${p.slug}`, locale)}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
  );

  return [...staticPages, ...servicePages, ...blogPages, ...caseStudyPages];
}
