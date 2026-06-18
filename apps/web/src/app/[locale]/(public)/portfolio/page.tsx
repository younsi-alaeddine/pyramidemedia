import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { CtaSection } from "@/components/sections/cta";
import { FadeIn } from "@/components/shared/motion";
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
    title: dict.portfolioPage.metaTitle,
    description: dict.portfolioPage.metaDescription,
    path: localizedPath("/portfolio", locale),
  });
}

export default async function PortfolioPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <section className="bg-glow section-padding pb-8">
        <div className="container-wide">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-primary uppercase">
              {dict.portfolioPage.eyebrow}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {dict.portfolioPage.titleBefore}{" "}
              <span className="text-gradient">{dict.portfolioPage.titleHighlight}</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {dict.portfolioPage.description}
            </p>
          </FadeIn>
        </div>
      </section>
      <PortfolioGrid showHeading={false} />
      <CtaSection />
    </>
  );
}
