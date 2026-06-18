import type { Locale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import * as en from "./en";
import * as fr from "./fr";

const catalogs = { en, fr } as const;

export function getServices(locale: Locale) {
  return catalogs[locale].services;
}

export function getServiceBySlug(locale: Locale, slug: string) {
  return catalogs[locale].services.find((s) => s.slug === slug);
}

export function getPortfolioItems(locale: Locale) {
  return catalogs[locale].portfolioItems;
}

export function getPortfolioBySlug(locale: Locale, slug: string) {
  return catalogs[locale].portfolioItems.find((p) => p.slug === slug);
}

export function getBlogPosts(locale: Locale) {
  return catalogs[locale].blogPosts;
}

export function getBlogPostBySlug(locale: Locale, slug: string) {
  return catalogs[locale].blogPosts.find((p) => p.slug === slug);
}

export function getTestimonials(locale: Locale) {
  return catalogs[locale].testimonials;
}

export function getTeamMembers(locale: Locale) {
  return catalogs[locale].teamMembers;
}

export function getStats(locale: Locale) {
  return catalogs[locale].stats;
}

export function getFaqs(locale: Locale) {
  return catalogs[locale].faqs;
}

export function getFeaturedPortfolio(locale: Locale) {
  return catalogs[locale].portfolioItems.filter((p) => p.featured);
}

// Backward-compatible exports for admin and legacy imports (default locale)
export const services = catalogs[defaultLocale].services;
export const portfolioItems = catalogs[defaultLocale].portfolioItems;
export const blogPosts = catalogs[defaultLocale].blogPosts;
export const testimonials = catalogs[defaultLocale].testimonials;
export const teamMembers = catalogs[defaultLocale].teamMembers;
export const stats = catalogs[defaultLocale].stats;
export const faqs = catalogs[defaultLocale].faqs;
