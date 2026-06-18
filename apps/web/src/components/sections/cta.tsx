"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/motion";
import { useDictionary } from "@/components/providers/dictionary-provider";
import { LocaleLink } from "@/components/shared/locale-link";

interface CtaSectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CtaSection({
  title,
  description,
  primaryLabel,
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref = "/services",
}: CtaSectionProps) {
  const { dict } = useDictionary();

  return (
    <section className="section-padding">
      <div className="container-wide">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-blue-700 px-8 py-16 text-center text-white md:px-16 md:py-20">
            <div className="bg-grid absolute inset-0 opacity-20" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {title ?? dict.cta.title}
              </h2>
              <p className="mt-4 text-lg text-white/80">
                {description ?? dict.cta.description}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="h-12 px-8 text-base"
                >
                  <LocaleLink href={primaryHref}>
                    {primaryLabel ?? dict.cta.primary}
                    <ArrowRight className="ml-2 size-4" />
                  </LocaleLink>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 border-white/30 bg-transparent px-8 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <LocaleLink href={secondaryHref}>
                    {secondaryLabel ?? dict.cta.secondary}
                  </LocaleLink>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
