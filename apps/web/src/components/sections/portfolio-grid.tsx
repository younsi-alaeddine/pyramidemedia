"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { useDictionary } from "@/components/providers/dictionary-provider";
import { LocaleLink } from "@/components/shared/locale-link";
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  item: PortfolioItem;
  className?: string;
}

export function PortfolioCard({ item, className }: PortfolioCardProps) {
  const image = item.images[0];

  return (
    <LocaleLink
      href={`/case-studies/${item.slug}`}
      className={cn("group block", className)}
    >
      <Card className="overflow-hidden border-border/60 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {image ? (
            <Image
              src={image}
              alt={item.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
              <span className="text-6xl font-bold text-primary/20">
                {item.client.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
              {item.category}
            </Badge>
          </div>
          <div className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <ArrowUpRight className="size-5" />
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{item.client}</p>
          <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
            {item.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </LocaleLink>
  );
}

interface PortfolioGridProps {
  items?: PortfolioItem[];
  featured?: boolean;
  showHeading?: boolean;
}

export function PortfolioGrid({
  items: itemsProp,
  featured,
  showHeading = true,
}: PortfolioGridProps) {
  const { dict } = useDictionary();
  const items =
    itemsProp ??
    (featured
      ? dict.portfolioItems.filter((p) => p.featured)
      : dict.portfolioItems);

  return (
    <section className="section-padding">
      <div className="container-wide">
        {showHeading && (
          <FadeIn className="mb-14">
            <SectionHeading
              eyebrow={dict.sections.portfolioEyebrow}
              title={dict.sections.portfolioTitle}
              description={dict.sections.portfolioDescription}
            />
          </FadeIn>
        )}
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <StaggerItem key={item.slug}>
              <PortfolioCard item={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
