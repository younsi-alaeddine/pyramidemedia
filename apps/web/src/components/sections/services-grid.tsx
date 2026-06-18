"use client";

import { ArrowRight } from "lucide-react";
import { serviceIconMap } from "@/config/navigation";
import type { Service } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { useDictionary } from "@/components/providers/dictionary-provider";
import { LocaleLink } from "@/components/shared/locale-link";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  variant?: "default" | "compact";
  className?: string;
}

export function ServiceCard({
  service,
  variant = "default",
  className,
}: ServiceCardProps) {
  const { dict } = useDictionary();
  const Icon = serviceIconMap[service.icon] ?? serviceIconMap.globe;

  return (
    <LocaleLink
      href={`/services/${service.slug}`}
      className={cn("group block", className)}
    >
      <Card className="h-full border-border/60 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader className={variant === "compact" ? "pb-2" : undefined}>
          <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-6" />
          </div>
          <CardTitle className="text-lg">{service.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {service.shortDescription}
          </p>
          {variant === "default" && (
            <span className="mt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              {dict.common.learnMore}
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </span>
          )}
        </CardContent>
      </Card>
    </LocaleLink>
  );
}

interface ServicesGridProps {
  limit?: number;
  showHeading?: boolean;
}

export function ServicesGrid({ limit, showHeading = true }: ServicesGridProps) {
  const { dict } = useDictionary();
  const items = limit ? dict.services.slice(0, limit) : dict.services;

  return (
    <section className="section-padding">
      <div className="container-wide">
        {showHeading && (
          <FadeIn className="mb-14">
            <SectionHeading
              eyebrow={dict.sections.servicesEyebrow}
              title={dict.sections.servicesTitle}
              description={dict.sections.servicesDescription}
            />
          </FadeIn>
        )}
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
