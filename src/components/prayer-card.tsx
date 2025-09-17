"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Volume2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Locale } from "@/lib/i18n";

interface PrayerCardProps {
  prayer: {
    id: number;
    title_en: string;
    title_he: string;
    excerpt_en: string;
    excerpt_he: string;
    content_en: string;
    content_he: string;
    category_ids: number[];
    featured: boolean;
    audio_url?: string;
  };
  locale: Locale;
  className?: string;
}

export function PrayerCard({ prayer, locale, className }: PrayerCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("prayers");
  
  const title = locale === "en" ? prayer.title_en : prayer.title_he;
  const excerpt = locale === "en" ? prayer.excerpt_en : prayer.excerpt_he;
  const content = locale === "en" ? prayer.content_en : prayer.content_he;
  const isRtl = locale === "he";

  return (
    <>
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <Card className={cn("h-full flex flex-col", className)}>
          <CardContent className="flex-grow p-5">
            {prayer.featured && (
              <div className="mb-3">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {t("featured")}
                </span>
              </div>
            )}
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="mt-2 text-muted-foreground line-clamp-3">{excerpt}</p>
          </CardContent>
          <CardFooter className="p-5 pt-0 flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(true)}
            >
              <BookOpen className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
              {t("read_more")}
            </Button>
            {prayer.audio_url && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Volume2 className="h-4 w-4" />
                <span className="sr-only">{t("listen")}</span>
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className={isRtl ? "text-right" : "text-left"}>
              {title}
            </DialogTitle>
          </DialogHeader>
          <div className={cn("mt-4", isRtl ? "text-right" : "text-left")}>
            <p className="whitespace-pre-line">{content}</p>
          </div>
          {prayer.audio_url && (
            <div className="mt-6">
              <Button variant="outline" className="w-full">
                <Volume2 className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                {t("listen")}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
