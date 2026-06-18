import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, LinkedInIcon } from "@/components/shared/social-icons";
import { Logo } from "@/components/shared/logo";
import { LocaleLink } from "@/components/shared/locale-link";
import { Newsletter } from "@/components/sections/newsletter";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

export async function Footer({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  const footerLinks = {
    services: [
      { title: dict.footer.webDev, href: "/services/website-development" },
      { title: dict.footer.ecommerce, href: "/services/e-commerce" },
      { title: dict.footer.customSoftware, href: "/services/custom-software" },
      { title: dict.footer.mobileApps, href: "/services/mobile-applications" },
      { title: dict.footer.uiux, href: "/services/ui-ux-design" },
      { title: dict.footer.seoMarketing, href: "/services/seo" },
    ],
    company: [
      { title: dict.footer.aboutUs, href: "/about" },
      { title: dict.nav.portfolio, href: "/portfolio" },
      { title: dict.nav.caseStudies, href: "/case-studies" },
      { title: dict.nav.blog, href: "/blog" },
      { title: dict.nav.contact, href: "/contact" },
    ],
    legal: [
      { title: dict.footer.privacy, href: "/privacy" },
      { title: dict.footer.terms, href: "/terms" },
    ],
  };

  return (
    <footer className="border-t border-border bg-navy text-white dark:bg-navy">
      <div className="container-wide section-padding">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="full" size="xl" appearance="dark" />
            <p className="mt-4 max-w-sm text-sm text-white/70">{dict.site.description}</p>
            <div className="mt-6 space-y-3 text-sm text-white/70">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0" />
                {siteConfig.contact.email}
              </a>
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Phone className="size-4 shrink-0" />
                {siteConfig.contact.phone}
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                {siteConfig.contact.address}
              </p>
            </div>
            <div className="mt-6">
              <p className="text-sm font-semibold text-white">{dict.footer.followUs}</p>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-5">
            <div>
              <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
                {dict.footer.services}
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <LocaleLink
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.title}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
                {dict.footer.company}
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <LocaleLink
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.title}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
                {dict.footer.legal}
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <LocaleLink
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.title}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Newsletter variant="footer" />
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} {siteConfig.name}. {dict.footer.rights}
          </p>
          <p className="text-xs tracking-widest text-white/40 uppercase">
            {dict.site.brandLine}
          </p>
        </div>
      </div>
    </footer>
  );
}
