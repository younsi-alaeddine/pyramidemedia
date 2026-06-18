import { HeroSection } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { StatsSection } from "@/components/sections/stats";
import { FaqSection } from "@/components/sections/faq";
import { CtaSection } from "@/components/sections/cta";
import { FadeIn } from "@/components/shared/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { LocaleLink } from "@/components/shared/locale-link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { localizedPath } from "@/i18n/config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return createMetadata({
    title: dict.site.tagline,
    description: dict.site.description,
    path: localizedPath("/", locale),
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesGrid limit={6} />
      <section className="container-wide pb-8 text-center">
        <FadeIn>
          <Button asChild variant="outline" size="lg">
            <LocaleLink href="/services">
              {dict.common.viewAllServices}
              <ArrowRight className="ml-2 size-4" />
            </LocaleLink>
          </Button>
        </FadeIn>
      </section>
      <PortfolioGrid featured />
      <section className="container-wide pb-16 text-center">
        <FadeIn>
          <Button asChild variant="outline" size="lg">
            <LocaleLink href="/portfolio">
              {dict.common.viewFullPortfolio}
              <ArrowRight className="ml-2 size-4" />
            </LocaleLink>
          </Button>
        </FadeIn>
      </section>
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <FadeIn className="mb-14">
            <SectionHeading
              eyebrow={dict.home.whyEyebrow}
              title={dict.home.whyTitle}
              description={dict.home.whyDescription}
            />
          </FadeIn>
          <FadeIn>
            <div className="grid gap-8 md:grid-cols-3">
              {dict.home.pillars.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border/60 bg-card p-6"
                >
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
