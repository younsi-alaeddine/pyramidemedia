import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CtaSection } from "@/components/sections/cta";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { createMetadata } from "@/lib/seo";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale, localizedPath } from "@/i18n/config";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return createMetadata({
    title: dict.blogPage.metaTitle,
    description: dict.blogPage.metaDescription,
    path: localizedPath("/blog", locale),
  });
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const blogPosts = getBlogPosts(locale);
  const dateLocale = locale === "fr" ? "fr-CA" : "en-US";

  return (
    <>
      <section className="bg-glow section-padding pb-8">
        <div className="container-wide">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-primary uppercase">
              {dict.blogPage.eyebrow}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {dict.blogPage.titleBefore}{" "}
              <span className="text-gradient">{dict.blogPage.titleHighlight}</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {dict.blogPage.description}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-wide">
          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={localizedPath(`/blog/${post.slug}`, locale)}
                  className="group block h-full"
                >
                  <Card className="h-full border-border/60 transition-all hover:border-primary/30 hover:shadow-lg">
                    <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 to-primary/5" />
                    <CardContent className="p-6">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="text-lg font-semibold group-hover:text-primary">
                        {post.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {new Date(post.publishedAt).toLocaleDateString(dateLocale, {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1 font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                          {dict.common.readMore}
                          <ArrowRight className="size-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
