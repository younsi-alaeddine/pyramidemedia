import { StatsSection } from "@/components/sections/stats";
import { CtaSection } from "@/components/sections/cta";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale, localizedPath } from "@/i18n/config";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return createMetadata({
    title: dict.aboutPage.metaTitle,
    description: dict.aboutPage.metaDescription,
    path: localizedPath("/about", locale),
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <section className="bg-glow section-padding">
        <div className="container-wide">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-primary uppercase">
              {dict.aboutPage.eyebrow}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {dict.aboutPage.titleBefore}{" "}
              <span className="text-gradient">{dict.aboutPage.titleHighlight}</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {dict.aboutPage.description}
            </p>
          </FadeIn>
        </div>
      </section>

      <StatsSection />

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <SectionHeading
                align="left"
                eyebrow={dict.aboutPage.storyEyebrow}
                title={dict.aboutPage.storyTitle}
                description={dict.aboutPage.storyDescription}
              />
            </FadeIn>
            <FadeIn>
              <div className="space-y-4 text-muted-foreground">
                <p>{dict.aboutPage.storyP1}</p>
                <p>{dict.aboutPage.storyP2}</p>
                <p>{dict.aboutPage.storyP3}</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <FadeIn className="mb-14">
            <SectionHeading
              eyebrow={dict.aboutPage.teamEyebrow}
              title={dict.aboutPage.teamTitle}
              description={dict.aboutPage.teamDescription}
            />
          </FadeIn>
          <StaggerContainer className="mx-auto grid max-w-xl gap-6">
            {dict.teamMembers.map((member) => (
              <StaggerItem key={member.id}>
                <Card className="border-border/60 text-center">
                  <CardContent className="p-6">
                    <Avatar className="mx-auto size-20">
                      <AvatarFallback className="bg-primary/10 text-xl text-primary">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 font-semibold">{member.name}</h3>
                    <p className="text-sm text-primary">{member.role}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
