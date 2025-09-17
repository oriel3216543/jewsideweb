"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Locale } from "@/lib/i18n";

interface VideoCardProps {
  video: {
    id: number;
    title_en: string;
    title_he: string;
    description_en: string;
    description_he: string;
    thumbnail: string;
    url: string;
    category_id: number;
    duration: string;
  };
  locale: Locale;
  className?: string;
}

export function VideoCard({ video, locale, className }: VideoCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("videos");
  
  const title = locale === "en" ? video.title_en : video.title_he;
  const description = locale === "en" ? video.description_en : video.description_he;

  return (
    <>
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <Card className={cn("overflow-hidden", className)}>
          <div className="relative aspect-video group cursor-pointer" onClick={() => setIsOpen(true)}>
            <Image
              src={video.thumbnail || "/samples/video-placeholder.jpg"}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button size="icon" variant="ghost" className="rounded-full bg-white/20 backdrop-blur-sm">
                <Play className="h-6 w-6 fill-white text-white" />
              </Button>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium line-clamp-1">{title}</h3>
            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{description}</p>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl">
          <div className="aspect-video relative">
            {/* This would be replaced with actual video player in production */}
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">{t("watch_now")} - {title}</p>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
