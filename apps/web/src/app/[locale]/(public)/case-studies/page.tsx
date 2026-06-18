import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPortfolioItems } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    title: dict.caseStudiesPage.metaTitle,
    description: dict.caseStudiesPage.metaDescription,
    path: localizedPath("/case-studies", locale),
  });
}

export default async function CaseStudiesPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const caseStudies = getPortfolioItems(locale).filter((p) => p.caseStudyUrl);

  return (
    <>
      <section className="bg-glow section-padding pb-8">
        <div className="container-wide">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-primary uppercase">
              {dict.caseStudiesPage.eyebrow}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {dict.caseStudiesPage.titleBefore}{" "}
              <span className="text-gradient">{dict.caseStudiesPage.titleHighlight}</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {dict.caseStudiesPage.description}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-wide">
          <StaggerContainer className="grid gap-8 lg:grid-cols-2">
            {caseStudies.map((item) => (
              <StaggerItem key={item.slug}>
                <Card className="overflow-hidden border-border/60">
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 to-primary/5" />
                  <CardContent className="p-8">
                    <Badge className="mb-3">{item.category}</Badge>
                    <h2 className="text-2xl font-bold">{item.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.client}
                    </p>
                    <p className="mt-4 text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild variant="link" className="mt-4 px-0">
                      <Link href={localizedPath(`/case-studies/${item.slug}`, locale)}>
                        {dict.common.readCaseStudy}
                        <ArrowRight className="ml-1 size-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
