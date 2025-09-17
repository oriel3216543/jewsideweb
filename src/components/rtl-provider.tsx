"use client";

import React from "react";
import { useLocale } from "next-intl";
import { getDirection } from "@/lib/rtl";
import { Locale } from "@/lib/i18n";

interface RtlProviderProps {
  children: React.ReactNode;
}

export function RtlProvider({ children }: RtlProviderProps) {
  const locale = useLocale() as Locale;
  const dir = getDirection(locale);

  return (
    <div dir={dir} lang={locale} className="h-full">
      {children}
    </div>
  );
}
