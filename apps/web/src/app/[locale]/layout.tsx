import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale, type Locale } from "@/i18n/config";
import { DictionaryProvider } from "@/components/providers/dictionary-provider";
import { HtmlLang } from "@/components/shared/html-lang";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export const revalidate = 60;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <DictionaryProvider locale={locale as Locale} dict={dict}>
      <HtmlLang locale={locale as Locale} />
      {children}
    </DictionaryProvider>
  );
}
