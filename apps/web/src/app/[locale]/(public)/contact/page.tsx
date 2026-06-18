import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { FadeIn } from "@/components/shared/motion";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
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
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    path: localizedPath("/contact", locale),
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  const contactInfo = [
    {
      icon: Mail,
      label: dict.contact.email,
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: Phone,
      label: dict.contact.phone,
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phoneHref ?? siteConfig.contact.phone.replace(/\D/g, "")}`,
    },
    {
      icon: MapPin,
      label: dict.contact.address,
      value: siteConfig.contact.address,
    },
    {
      icon: Clock,
      label: dict.contact.hours,
      value: dict.contact.hoursValue,
    },
  ];

  return (
    <>
      <section className="bg-glow section-padding pb-8">
        <div className="container-wide">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-primary uppercase">
              {dict.contact.eyebrow}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {dict.contact.titleBefore}{" "}
              <span className="text-gradient">{dict.contact.titleHighlight}</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {dict.contact.description}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-5">
            <FadeIn className="lg:col-span-3">
              <Card className="border-border/60">
                <CardContent className="p-8">
                  <h2 className="text-xl font-semibold">{dict.contact.formTitle}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {dict.contact.formDescription}
                  </p>
                  <div className="mt-8">
                    <ContactForm />
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn className="lg:col-span-2">
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <Card key={item.label} className="border-border/60">
                    <CardContent className="flex items-start gap-4 p-5">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <item.icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm text-muted-foreground hover:text-primary"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
