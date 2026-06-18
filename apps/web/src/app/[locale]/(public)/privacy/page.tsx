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
    title: dict.footer.privacy,
    description: `Privacy Policy for ${siteConfig.name}. Learn how we collect, use, and protect your personal information.`,
    path: localizedPath("/privacy", locale),
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <section className="section-padding">
      <div className="container-wide max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl font-bold tracking-tight">{dict.footer.privacy}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: January 1, 2026
          </p>

          <div className="prose prose-lg dark:prose-invert mt-10 max-w-none">
            <h2>1. Introduction</h2>
            <p>
              {siteConfig.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to
              protecting your privacy. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our
              website or use our services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li>
                <strong>Personal Information:</strong> Name, email address, phone
                number, company name, and other details you provide through our
                contact forms.
              </li>
              <li>
                <strong>Usage Data:</strong> IP address, browser type, pages visited,
                time spent on pages, and other analytics data.
              </li>
              <li>
                <strong>Cookies:</strong> We use cookies and similar technologies to
                enhance your experience and analyze site traffic.
              </li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Respond to your inquiries and provide our services</li>
              <li>Send newsletters and marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to access, correct,
              delete, or restrict the processing of your personal data. Contact us at{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>{" "}
              to exercise these rights.
            </p>

            <h2>6. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{" "}
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
