import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { serviceIconMap } from "@/config/navigation";
import { CtaSection } from "@/components/sections/cta";
import { FadeIn } from "@/components/shared/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createMetadata, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import {
  getDictionary,
  getServiceBySlugFromCms,
  getAllServicesFromCms,
} from "@/i18n/get-dictionary";
import { isValidLocale, localizedPath, type Locale } from "@/i18n/config";

export const revalidate = 60;

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const locales: Locale[] = ["fr", "en"];
  const params = [];

  for (const locale of locales) {
    const services = await getAllServicesFromCms(locale);
    for (const service of services) {
      params.push({ locale, slug: service.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const service = await getServiceBySlugFromCms(locale, slug);
  if (!service) return {};

  return createMetadata({
    title: service.title,
    description: service.shortDescription,
    path: localizedPath(`/services/${slug}`, locale),
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const service = await getServiceBySlugFromCms(locale, slug);
  if (!service) notFound();

  const Icon = serviceIconMap[service.icon] ?? serviceIconMap.globe;
  const schema = serviceSchema(service);
  const breadcrumbs = breadcrumbSchema([
    { name: dict.nav.home, href: localizedPath("/", locale) },
    { name: dict.nav.services, href: localizedPath("/services", locale) },
    { name: service.title, href: localizedPath(`/services/${slug}`, locale) },
  ]);

  const ctaTitle = dict.serviceDetail.readyTitle.replace("{service}", service.title);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([schema, breadcrumbs]),
        }}
      />
      <section className="bg-glow section-padding">
        <div className="container-wide">
          <FadeIn>
            <Button asChild variant="ghost" size="sm" className="mb-8">
              <Link href={localizedPath("/services", locale)}>
                <ArrowLeft className="mr-2 size-4" />
                {dict.common.allServices}
              </Link>
            </Button>
            <div className="flex items-start gap-6">
              <div className="hidden size-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:flex">
                <Icon className="size-8" />
              </div>
              <div className="max-w-3xl">
                <Badge className="mb-4">{dict.common.service}</Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {service.title}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  {service.shortDescription}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-3">
            <FadeIn className="lg:col-span-2">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <h2 className="text-lg font-semibold">{dict.common.whatsIncluded}</h2>
                <ul className="mt-4 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full">
                  <Link href={localizedPath("/contact", locale)}>
                    {dict.common.getStarted}
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CtaSection
        title={ctaTitle}
        description={dict.serviceDetail.readyDescription}
      />
    </>
  );
}
