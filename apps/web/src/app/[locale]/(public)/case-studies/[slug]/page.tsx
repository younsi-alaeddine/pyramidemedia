import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPortfolioBySlug, getPortfolioItems } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CtaSection } from "@/components/sections/cta";
import { FadeIn } from "@/components/shared/motion";
import { createMetadata } from "@/lib/seo";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale, localizedPath, type Locale } from "@/i18n/config";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const locales: Locale[] = ["fr", "en"];
  return locales.flatMap((locale) =>
    getPortfolioItems(locale)
      .filter((p) => p.caseStudyUrl)
      .map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const item = getPortfolioBySlug(locale, slug);
  if (!item) return {};

  return createMetadata({
    title: `${item.title} — Case Study`,
    description: item.description,
    path: localizedPath(`/case-studies/${slug}`, locale),
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const item = getPortfolioBySlug(locale, slug);
  if (!item) notFound();

  const challengeText = dict.caseStudy.challengeText.replace("{client}", item.client);

  return (
    <>
      <section className="bg-glow section-padding">
        <div className="container-wide max-w-4xl">
          <FadeIn>
            <Button asChild variant="ghost" size="sm" className="mb-8">
              <Link href={localizedPath("/case-studies", locale)}>
                <ArrowLeft className="mr-2 size-4" />
                {dict.common.allCaseStudies}
              </Link>
            </Button>
            <Badge className="mb-4">{item.category}</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {item.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">{item.client}</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <FadeIn>
            {item.images[0] ? (
              <div className="relative aspect-video overflow-hidden rounded-xl border border-border/60">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-primary/5" />
            )}
            <div className="mt-8 flex flex-wrap gap-2">
              {item.technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="prose prose-lg dark:prose-invert mt-8 max-w-none">
              <h2>{dict.caseStudy.challenge}</h2>
              <p>{challengeText}</p>
              <h2>{dict.caseStudy.solution}</h2>
              <p>{item.description}</p>
              <h2>{dict.caseStudy.results}</h2>
              <ul>
                {dict.caseStudy.resultsList.map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      <CtaSection title={dict.cta.similarResults} />
    </>
  );
}
