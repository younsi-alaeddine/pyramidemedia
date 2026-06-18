"use client";

import { CountUp, FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { useDictionary } from "@/components/providers/dictionary-provider";

export function StatsSection() {
  const { dict } = useDictionary();

  return (
    <section className="border-y border-border bg-navy py-12 text-white dark:bg-navy">
      <div className="container-wide">
        <StaggerContainer className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {dict.stats.map((stat) => (
            <StaggerItem key={stat.label} className="text-center">
              <p className="text-4xl font-bold text-blue-400 md:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
