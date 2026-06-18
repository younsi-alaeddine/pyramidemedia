"use client";

import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDictionary } from "@/components/providers/dictionary-provider";
import { LocaleLink } from "@/components/shared/locale-link";

export function HeroSection() {
  const { dict } = useDictionary();

  return (
    <section className="relative overflow-hidden bg-glow">
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div className="container-wide relative section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5">
              {dict.hero.badge}
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {dict.hero.titleBefore}{" "}
            <span className="text-gradient">{dict.hero.titleHighlight}</span>{" "}
            {dict.hero.titleAfter}
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {dict.site.description}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <LocaleLink href="/contact">
                {dict.hero.ctaPrimary}
                <ArrowRight className="ml-2 size-4" />
              </LocaleLink>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
              <LocaleLink href="/portfolio">
                <Play className="mr-2 size-4" />
                {dict.hero.ctaSecondary}
              </LocaleLink>
            </Button>
          </motion.div>

          <motion.p
            className="mt-8 text-xs tracking-[0.25em] text-muted-foreground uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {dict.site.brandLine}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
