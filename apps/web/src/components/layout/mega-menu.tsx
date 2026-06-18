"use client";

import { ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { serviceIconMap, serviceSlugIconMap } from "@/config/navigation";
import { useDictionary } from "@/components/providers/dictionary-provider";
import { LocaleLink } from "@/components/shared/locale-link";
import { cn } from "@/lib/utils";

export function MegaMenu({ href }: { href: string }) {
  const { dict } = useDictionary();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-muted-foreground hover:text-foreground data-[state=open]:text-foreground">
            {dict.nav.services}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] gap-1 p-4 lg:w-[700px] lg:grid-cols-2">
              {Object.entries(dict.navServices).map(([slug, service]) => {
                const iconKey = serviceSlugIconMap[slug] ?? "globe";
                const Icon = serviceIconMap[iconKey] ?? serviceIconMap.globe;

                return (
                  <NavigationMenuLink key={slug} asChild>
                    <LocaleLink
                      href={`/services/${slug}`}
                      className={cn(
                        "group flex gap-3 rounded-lg p-3 transition-colors",
                        "hover:bg-accent"
                      )}
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{service.title}</p>
                        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </LocaleLink>
                  </NavigationMenuLink>
                );
              })}
            </div>
            <div className="border-t border-border p-3">
              <LocaleLink
                href={href}
                className="flex items-center justify-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {dict.nav.viewAllServices}
                <ChevronDown className="size-4 -rotate-90" />
              </LocaleLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
