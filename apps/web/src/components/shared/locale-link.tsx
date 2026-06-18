"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDictionary } from "@/components/providers/dictionary-provider";
import { localizedPath } from "@/i18n/config";
import type { ComponentProps } from "react";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { locale } = useDictionary();
  return <Link href={localizedPath(href, locale)} {...props} />;
}

export function useLocalePath() {
  const { locale } = useDictionary();
  return (href: string) => localizedPath(href, locale);
}

export function useSwitchLocalePath() {
  const pathname = usePathname();
  return pathname;
}
