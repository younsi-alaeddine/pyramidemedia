import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FadeIn } from "@/components/shared/motion";
import { CtaSection } from "@/components/sections/cta";
import { articleSchema, breadcrumbSchema, createMetadata } from "@/lib/seo";
import {
  getDictionary,
  getAllBlogPostsFromCms,
  getBlogPostBySlugFromCms,
} from "@/i18n/get-dictionary";
import { isValidLocale, localizedPath, type Locale } from "@/i18n/config";

export const revalidate = 60;

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const locales: Locale[] = ["fr", "en"];
  const params = [];

  for (const locale of locales) {
    const posts = await getAllBlogPostsFromCms(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const post = await getBlogPostBySlugFromCms(locale, slug);
  if (!post) return {};

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: localizedPath(`/blog/${slug}`, locale),
  });
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const post = await getBlogPostBySlugFromCms(locale, slug);
  if (!post) notFound();

  const dateLocale = locale === "fr" ? "fr-CA" : "en-US";
  const schema = articleSchema(post);
  const breadcrumbs = breadcrumbSchema([
    { name: dict.nav.home, href: localizedPath("/", locale) },
    { name: dict.nav.blog, href: localizedPath("/blog", locale) },
    { name: post.title, href: localizedPath(`/blog/${slug}`, locale) },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([schema, breadcrumbs]),
        }}
      />
      <article>
        <section className="bg-glow section-padding">
          <div className="container-wide max-w-4xl">
            <FadeIn>
              <Button asChild variant="ghost" size="sm" className="mb-8">
                <Link href={localizedPath("/blog", locale)}>
                  <ArrowLeft className="mr-2 size-4" />
                  {dict.blogPage.backToBlog}
                </Link>
              </Button>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                {post.title}
              </h1>
              <div className="mt-6 flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{post.author.name}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="size-3" />
                    {new Date(post.publishedAt).toLocaleDateString(dateLocale, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="section-padding pt-8">
          <div className="container-wide max-w-3xl">
            <FadeIn>
              <div
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .trim()
                    .split("\n")
                    .map((line) => {
                      if (line.startsWith("## "))
                        return `<h2>${line.slice(3)}</h2>`;
                      if (line.startsWith("### "))
                        return `<h3>${line.slice(4)}</h3>`;
                      if (line.trim() === "") return "";
                      return `<p>${line}</p>`;
                    })
                    .join(""),
                }}
              />
            </FadeIn>
          </div>
        </section>
      </article>
      <CtaSection />
    </>
  );
}
