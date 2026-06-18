"use client";

import { LocaleLink } from "@/components/shared/locale-link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LocaleSwitcher } from "@/components/shared/locale-switcher";
import { MegaMenu } from "@/components/layout/mega-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDictionary } from "@/components/providers/dictionary-provider";

const navItems = [
  { key: "home" as const, href: "/" },
  { key: "services" as const, href: "/services", mega: true },
  { key: "portfolio" as const, href: "/portfolio" },
  { key: "caseStudies" as const, href: "/case-studies" },
  { key: "about" as const, href: "/about" },
  { key: "blog" as const, href: "/blog" },
  { key: "contact" as const, href: "/contact" },
];

export function Header() {
  const { dict } = useDictionary();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-wide flex h-[4.25rem] items-center justify-between md:h-20">
        <Logo variant="compact" size="xl" className="-my-1" />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) =>
            item.mega ? (
              <MegaMenu key={item.key} href={item.href} />
            ) : (
              <LocaleLink
                key={item.key}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {dict.nav[item.key]}
              </LocaleLink>
            )
          )}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex" size="sm">
            <LocaleLink href="/contact">{dict.nav.getStarted}</LocaleLink>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <Logo variant="compact" size="lg" />
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <div key={item.key}>
                    <LocaleLink
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-md px-3 py-2.5 text-base font-medium hover:bg-accent"
                    >
                      {dict.nav[item.key]}
                    </LocaleLink>
                    {item.mega && (
                      <div className="ml-4 flex flex-col gap-0.5 border-l border-border pl-3">
                        {Object.entries(dict.navServices)
                          .slice(0, 6)
                          .map(([slug, service]) => (
                            <LocaleLink
                              key={slug}
                              href={`/services/${slug}`}
                              onClick={() => setMobileOpen(false)}
                              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                            >
                              {service.title}
                            </LocaleLink>
                          ))}
                        <LocaleLink
                          href="/services"
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-sm font-medium text-primary"
                        >
                          {dict.nav.viewAllServices} →
                        </LocaleLink>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="mt-8">
                <Button asChild className="w-full">
                  <LocaleLink href="/contact" onClick={() => setMobileOpen(false)}>
                    {dict.nav.getStarted}
                  </LocaleLink>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
