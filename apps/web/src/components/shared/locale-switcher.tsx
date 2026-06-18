"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, switchLocalePath, type Locale } from "@/i18n/config";
import { useDictionary } from "@/components/providers/dictionary-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

export function LocaleSwitcher() {
  const { locale } = useDictionary();
  const pathname = usePathname();
  const router = useRouter();

  function setLocale(nextLocale: Locale) {
    document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=31536000`;
    router.push(switchLocalePath(pathname, nextLocale));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 px-2 font-medium uppercase"
          aria-label="Change language"
        >
          <Languages className="size-4" />
          {locale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((item) => (
          <DropdownMenuItem
            key={item}
            onClick={() => setLocale(item)}
            className={item === locale ? "bg-accent" : undefined}
          >
            {localeNames[item]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
