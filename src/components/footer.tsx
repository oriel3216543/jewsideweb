"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/container";
import { Locale } from "@/lib/i18n";

export function Footer() {
  const t = useTranslations("navigation");
  const locale = useLocale() as Locale;
  const currentYear = new Date().getFullYear();
  
  const navItems = [
    { href: `/${locale}/explore`, label: t("explore") },
    { href: `/${locale}/videos`, label: t("videos") },
    { href: `/${locale}/prayers`, label: t("prayers") },
    { href: `/${locale}/categories`, label: t("categories") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <footer className="bg-muted py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link 
              href={`/${locale}`}
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <span className="font-bold text-xl text-primary">JewSide</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              {locale === "en" 
                ? "Exploring Jewish traditions and prayers through an accessible digital platform." 
                : "חקירת מסורות ותפילות יהודיות באמצעות פלטפורמה דיגיטלית נגישה."}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">
              {locale === "en" ? "Quick Links" : "קישורים מהירים"}
            </h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">
              {locale === "en" ? "Legal" : "משפטי"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {locale === "en" ? "Privacy Policy" : "מדיניות פרטיות"}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {locale === "en" ? "Terms of Service" : "תנאי שימוש"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            &copy; {currentYear} JewSide. {locale === "en" ? "All rights reserved." : "כל הזכויות שמורות."}
          </div>
        </div>
      </Container>
    </footer>
  );
}
