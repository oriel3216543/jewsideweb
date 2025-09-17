"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilterBarProps {
  categories: {
    id: number;
    name_en: string;
    name_he: string;
    slug: string;
  }[];
  onFilterChange: (filter: { type?: string; category?: number }) => void;
  locale: string;
}

export function FilterBar({ categories, onFilterChange, locale }: FilterBarProps) {
  const [activeType, setActiveType] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const t = useTranslations("explore");

  // For future implementation
  const _handleTypeChange = (type: string) => {
    const newType = activeType === type ? null : type;
    setActiveType(newType);
    onFilterChange({ 
      type: newType || undefined, 
      category: activeCategory || undefined 
    });
  };

  const handleCategoryChange = (categoryId: number) => {
    const newCategory = activeCategory === categoryId ? null : categoryId;
    setActiveCategory(newCategory);
    onFilterChange({ 
      type: activeType || undefined, 
      category: newCategory || undefined 
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        <span className="font-medium text-sm">{t("filter_by_category")}</span>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="w-full justify-start overflow-auto">
          <TabsTrigger value="all">
            {t("all")}
          </TabsTrigger>
          <TabsTrigger value="videos">
            {t("videos")}
          </TabsTrigger>
          <TabsTrigger value="prayers">
            {t("prayers")}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange(category.id)}
          >
            {locale === "en" ? category.name_en : category.name_he}
          </Button>
        ))}
      </div>
    </div>
  );
}
