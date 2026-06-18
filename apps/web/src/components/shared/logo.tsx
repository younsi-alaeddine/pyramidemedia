"use client";

import Image from "next/image";
import { useOptionalDictionary } from "@/components/providers/dictionary-provider";
import { defaultLocale, localizedPath } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "full" | "compact" | "icon";
  size?: "sm" | "md" | "lg" | "xl";
  appearance?: "auto" | "dark" | "light";
}

const sizeClasses = {
  sm: {
    full: "h-10 w-auto sm:h-11",
    compact: "h-9 w-auto sm:h-10",
    icon: "size-9 sm:size-10",
  },
  md: {
    full: "h-12 w-auto sm:h-14",
    compact: "h-10 w-auto sm:h-12",
    icon: "size-10 sm:size-11",
  },
  lg: {
    full: "h-14 w-auto sm:h-[4.5rem]",
    compact: "h-11 w-auto sm:h-14",
    icon: "size-11 sm:size-14",
  },
  xl: {
    full: "h-16 w-auto sm:h-20",
    compact: "h-12 w-auto sm:h-16",
    icon: "size-12 sm:size-16",
  },
};

const maxWidth = {
  full: "max-w-[260px] sm:max-w-[300px] lg:max-w-[340px]",
  compact: "max-w-[220px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[340px]",
  icon: "",
};

const dimensions = {
  full: { width: 677, height: 369 },
  compact: { width: 677, height: 287 },
  icon: { width: 512, height: 512 },
};

function logoSources(variant: LogoProps["variant"]) {
  if (variant === "icon") {
    return { light: "/images/logo-icon.png", dark: "/images/logo-icon.png" };
  }
  if (variant === "compact") {
    return {
      light: "/images/logo-header-light.png",
      dark: "/images/logo-header-dark.png",
    };
  }
  return { light: "/images/logo-light.png", dark: "/images/logo-dark.png" };
}

export function Logo({
  className,
  variant = "full",
  size = "md",
  appearance = "auto",
}: LogoProps) {
  const context = useOptionalDictionary();
  const locale = context?.locale ?? defaultLocale;
  const dim = dimensions[variant];
  const sizeClass = sizeClasses[size][variant];
  const sources = logoSources(variant);
  const href = localizedPath("/", locale);

  const showLight = appearance === "light" || appearance === "auto";
  const showDark = appearance === "dark" || appearance === "auto";

  return (
    <a
      href={href}
      className={cn("group inline-flex shrink-0 items-center", className)}
      aria-label="Pyramide Media — Home"
    >
      {showLight && (
        <Image
          src={sources.light}
          alt="Pyramide Media"
          width={dim.width}
          height={dim.height}
          className={cn(
            sizeClass,
            "object-contain object-left transition-opacity duration-200 group-hover:opacity-90",
            variant !== "icon" && maxWidth[variant],
            appearance === "auto" && "dark:hidden"
          )}
          priority
        />
      )}
      {showDark && (
        <Image
          src={sources.dark}
          alt="Pyramide Media"
          width={dim.width}
          height={dim.height}
          className={cn(
            sizeClass,
            "object-contain object-left transition-opacity duration-200 group-hover:opacity-90",
            variant !== "icon" && maxWidth[variant],
            appearance === "auto" ? "hidden dark:block" : "block"
          )}
          priority
        />
      )}
    </a>
  );
}
