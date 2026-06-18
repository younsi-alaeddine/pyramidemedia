import { FadeIn } from "@/components/shared/motion";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale, localizedPath } from "@/i18n/config";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return createMetadata({
    title: dict.footer.terms,
    description: `Terms and Conditions for using ${siteConfig.name} website and services.`,
    path: localizedPath("/terms", locale),
  });
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <section className="section-padding">
      <div className="container-wide max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl font-bold tracking-tight">
            {dict.footer.terms}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: January 1, 2026
          </p>

          <div className="prose prose-lg dark:prose-invert mt-10 max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the {siteConfig.name} website and services,
              you agree to be bound by these Terms and Conditions. If you do not
              agree, please do not use our services.
            </p>

            <h2>2. Services</h2>
            <p>
              {siteConfig.name} provides digital agency services including web
              development, e-commerce, custom software, mobile applications,
              design, marketing, and consulting. Specific terms for each project
              are outlined in individual service agreements.
            </p>

            <h2>3. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and
              software, is the property of {siteConfig.name} or its licensors and
              is protected by intellectual property laws. Client project
              deliverables are governed by the terms of the respective service
              agreement.
            </p>

            <h2>4. Limitation of Liability</h2>
            <p>
              {siteConfig.name} shall not be liable for any indirect, incidental,
              special, or consequential damages arising from the use of our website
              or services, to the maximum extent permitted by law.
            </p>

            <h2>5. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              applicable laws. Any disputes shall be resolved through good-faith
              negotiation or appropriate legal channels.
            </p>

            <h2>6. Contact</h2>
            <p>
              For questions about these Terms, contact us at{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
