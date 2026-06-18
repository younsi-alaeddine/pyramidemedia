import type { Locale } from "@/i18n/config";
import { en as uiEn } from "@/i18n/dictionaries/en";
import { fr as uiFr } from "@/i18n/dictionaries/fr";
import * as contentEn from "@/data/content/en";
import * as contentFr from "@/data/content/fr";
import { fetchCmsContent, servicesToNavServices } from "@/lib/cms";

export type Dictionary = typeof uiEn & typeof contentEn;

const ui = { en: uiEn, fr: uiFr } as const;
const content = { en: contentEn, fr: contentFr } as const;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const cms = await fetchCmsContent(locale);

  return {
    ...ui[locale],
    ...content[locale],
    ...(cms.services.length > 0
      ? {
          services: cms.services,
          navServices: servicesToNavServices(
            cms.services,
          ) as Dictionary["navServices"],
        }
      : {}),
    ...(cms.portfolioItems.length > 0
      ? { portfolioItems: cms.portfolioItems }
      : {}),
    ...(cms.blogPosts.length > 0 ? { blogPosts: cms.blogPosts } : {}),
    ...(cms.testimonials.length > 0
      ? { testimonials: cms.testimonials }
      : {}),
    ...(cms.teamMembers.length > 0 ? { teamMembers: cms.teamMembers } : {}),
    ...(cms.seo?.siteTitle
      ? {
          site: {
            ...ui[locale].site,
            tagline: cms.seo.siteTitle,
            description:
              cms.seo.siteDescription || ui[locale].site.description,
          },
        }
      : {}),
  } as Dictionary;
}

export async function getServiceBySlugFromCms(locale: Locale, slug: string) {
  const dict = await getDictionary(locale);
  return dict.services.find((service) => service.slug === slug);
}

export async function getPortfolioBySlugFromCms(locale: Locale, slug: string) {
  const dict = await getDictionary(locale);
  return dict.portfolioItems.find((item) => item.slug === slug);
}

export async function getBlogPostBySlugFromCms(locale: Locale, slug: string) {
  const dict = await getDictionary(locale);
  return dict.blogPosts.find((post) => post.slug === slug);
}

export async function getAllServicesFromCms(locale: Locale) {
  const dict = await getDictionary(locale);
  return dict.services;
}

export async function getAllBlogPostsFromCms(locale: Locale) {
  const dict = await getDictionary(locale);
  return dict.blogPosts;
}

export async function getAllPortfolioFromCms(locale: Locale) {
  const dict = await getDictionary(locale);
  return dict.portfolioItems;
}
