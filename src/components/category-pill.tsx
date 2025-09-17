"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Locale } from "@/lib/i18n";

interface CategoryPillProps {
  category: {
    id: number;
    slug: string;
    name_en: string;
    name_he: string;
    icon: string;
  };
  className?: string;
}

export function CategoryPill({ category, className }: CategoryPillProps) {
  const locale = useLocale() as Locale;
  const name = locale === "en" ? category.name_en : category.name_he;
  
  // Dynamically get the icon from Lucide
  const iconName = category.icon.charAt(0).toUpperCase() + category.icon.slice(1);
  // Using type assertion to avoid TypeScript issues with dynamic imports
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Tag;

  return (
    <Link href={`/${locale}/categories/${category.slug}`}>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "group flex items-center justify-between p-3 rounded-2xl border bg-card hover:bg-primary/10 transition-colors",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <IconComponent className="h-5 w-5" />
          </div>
          <span className="font-medium">{name}</span>
        </div>
      </motion.div>
    </Link>
  );
}
