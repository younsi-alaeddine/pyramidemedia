"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/shared/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { useDictionary } from "@/components/providers/dictionary-provider";

export function FaqSection() {
  const { dict } = useDictionary();

  return (
    <section className="section-padding">
      <div className="container-wide">
        <FadeIn className="mb-14">
          <SectionHeading
            eyebrow={dict.sections.faqEyebrow}
            title={dict.sections.faqTitle}
            description={dict.sections.faqDescription}
          />
        </FadeIn>
        <FadeIn className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {dict.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
