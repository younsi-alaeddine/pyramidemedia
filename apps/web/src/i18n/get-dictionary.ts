import type { Locale } from "@/i18n/config";
import { en as uiEn } from "@/i18n/dictionaries/en";
import { fr as uiFr } from "@/i18n/dictionaries/fr";
import * as contentEn from "@/data/content/en";
import * as contentFr from "@/data/content/fr";

export type Dictionary = typeof uiEn & typeof contentEn;

const ui = { en: uiEn, fr: uiFr } as const;
const content = { en: contentEn, fr: contentFr } as const;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return {
    ...ui[locale],
    ...content[locale],
  } as Dictionary;
}
