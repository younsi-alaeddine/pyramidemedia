import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales, localizedPath, type Locale } from "@/i18n/config";
import {
  getAllBlogPostsFromCms,
  getAllPortfolioFromCms,
  getAllServicesFromCms,
} from "@/i18n/get-dictionary";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    })),
  );

  const servicePages = await Promise.all(
    locales.map(async (locale) => {
      const services = await getAllServicesFromCms(locale as Locale);
      return services.map((service) => ({
        url: `${baseUrl}${localizedPath(`/services/${service.slug}`, locale as Locale)}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    }),
  );

  const blogPages = await Promise.all(
    locales.map(async (locale) => {
      const posts = await getAllBlogPostsFromCms(locale as Locale);
      return posts.map((post) => ({
        url: `${baseUrl}${localizedPath(`/blog/${post.slug}`, locale as Locale)}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    }),
  );

  const caseStudyPages = await Promise.all(
    locales.map(async (locale) => {
      const items = await getAllPortfolioFromCms(locale as Locale);
      return items
        .filter((item) => item.caseStudyUrl)
        .map((item) => ({
          url: `${baseUrl}${localizedPath(`/case-studies/${item.slug}`, locale as Locale)}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }));
    }),
  );

  return [
    ...staticPages,
    ...servicePages.flat(),
    ...blogPages.flat(),
    ...caseStudyPages.flat(),
  ];
}
