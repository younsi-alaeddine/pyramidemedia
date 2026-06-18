"use client";

import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { useDictionary } from "@/components/providers/dictionary-provider";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className="h-full border-border/60">
      <CardContent className="flex h-full flex-col p-6">
        <Quote className="mb-4 size-8 text-primary/30" />
        <p className="flex-1 text-muted-foreground italic">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="mt-6 flex items-center gap-1">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="size-4 fill-primary text-primary" />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TestimonialsSection() {
  const { dict } = useDictionary();

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        <FadeIn className="mb-14">
          <SectionHeading
            eyebrow={dict.sections.testimonialsEyebrow}
            title={dict.sections.testimonialsTitle}
            description={dict.sections.testimonialsDescription}
          />
        </FadeIn>
        <StaggerContainer className="grid gap-6 md:grid-cols-2">
          {dict.testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <TestimonialCard testimonial={t} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
