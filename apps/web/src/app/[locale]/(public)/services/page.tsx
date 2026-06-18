import { ServicesGrid } from "@/components/sections/services-grid";
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
    title: dict.servicesPage.metaTitle,
    description: dict.servicesPage.metaDescription,
    path: localizedPath("/services", locale),
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <section className="bg-glow section-padding pb-8">
        <div className="container-wide">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-primary uppercase">
              {dict.servicesPage.eyebrow}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {dict.servicesPage.titleBefore}{" "}
              <span className="text-gradient">{dict.servicesPage.titleHighlight}</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {dict.servicesPage.description}
            </p>
          </FadeIn>
        </div>
      </section>
      <ServicesGrid showHeading={false} />
      <CtaSection />
    </>
  );
}
