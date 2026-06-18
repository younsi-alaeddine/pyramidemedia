import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { CmsSeo } from "@/lib/cms";
import type { SeoMeta } from "@/types";

function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${siteConfig.url}${path}`;
}

function normalizeTwitterHandle(handle?: string | null): string | undefined {
  if (!handle?.trim()) return undefined;
  const trimmed = handle.trim();
  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
}

export function createMetadata({
  title,
  description,
  ogImage,
  noIndex = false,
  path = "",
  twitterHandle,
}: SeoMeta & { path?: string; twitterHandle?: string | null }): Metadata {
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  const url = absoluteUrl(path);
  const image = absoluteUrl(ogImage ?? siteConfig.ogImage);
  const twitterSite = normalizeTwitterHandle(twitterHandle);

  return {
    title: fullTitle,
    description,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["fr_CA"],
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      ...(twitterSite ? { site: twitterSite, creator: twitterSite } : {}),
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export function createGlobalMetadata(seo: CmsSeo | null): Metadata {
  const title = seo?.siteTitle?.trim() || `${siteConfig.name} — ${siteConfig.tagline}`;
  const description = seo?.siteDescription?.trim() || siteConfig.description;
  const ogImage = seo?.ogImage?.trim() || undefined;

  return {
    ...createMetadata({
      title,
      description,
      ogImage,
      path: "/",
      twitterHandle: seo?.twitterHandle,
    }),
    icons: {
      icon: "/images/logo-icon.png",
      apple: "/images/logo-icon.png",
    },
  };
}

export function organizationSchema(seo?: CmsSeo | null) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo-dark.png`,
    description: seo?.siteDescription?.trim() || siteConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phoneHref,
      contactType: "customer service",
      email: siteConfig.contact.email,
      areaServed: "CA",
      availableLanguage: ["English", "French"],
    },
    sameAs: Object.values(siteConfig.social),
  };
}

export function webSiteSchema(seo?: CmsSeo | null) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seo?.siteTitle?.trim() || siteConfig.name,
    url: siteConfig.url,
    description: seo?.siteDescription?.trim() || siteConfig.description,
    inLanguage: ["en-CA", "fr-CA"],
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function serviceSchema(service: {
  title: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/services/${service.slug}`,
  };
}

export function articleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  coverImage?: string;
  author: { name: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? absoluteUrl(post.coverImage) : undefined,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/images/logo-dark.png` },
    },
    url: `${siteConfig.url}/blog/${post.slug}`,
  };
}

export function breadcrumbSchema(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
