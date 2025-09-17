"use client";

import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { locales, Locale } from "@/lib/i18n";

export function LanguageToggle() {
  const t = useTranslations("languages");
  const a11y = useTranslations("accessibility");
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  
  const switchLocale = (locale: Locale) => {
    // Replace the current locale segment in the URL
    // e.g., /en/about -> /he/about
    const newPathname = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPathname);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={a11y("language_selector")}>
          <Globe className="h-5 w-5" />
          <span className="sr-only">{a11y("language_selector")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem 
            key={locale}
            onClick={() => switchLocale(locale)}
            className={currentLocale === locale ? "font-bold bg-muted" : ""}
          >
            {t(locale)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
