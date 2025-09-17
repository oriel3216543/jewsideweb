"use client";

import { useLocale } from "next-intl";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Locale } from "@/lib/i18n";

interface HeroProps {
  headline: string;
  subline: string;
  ctaExplore: string;
  ctaPrayers: string;
  ctaVideos: string;
}

export function Hero({ headline, subline, ctaExplore, ctaPrayers, ctaVideos }: HeroProps) {
  const locale = useLocale() as Locale;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="relative overflow-hidden bg-background py-24 sm:py-32">
      {/* Background geometric pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg 
          className="h-full w-full" 
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern 
              id="pattern" 
              patternUnits="userSpaceOnUse" 
              width="40" 
              height="40" 
              viewBox="0 0 40 40"
            >
              <path 
                d="M0 20 L20 0 L40 20 L20 40 Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <Container>
        <motion.div
          className="mx-auto max-w-3xl text-center z-10 relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="display mb-6"
            variants={itemVariants}
          >
            {headline}
          </motion.h1>
          <motion.p
            className="mb-10 text-xl text-muted-foreground"
            variants={itemVariants}
          >
            {subline}
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={itemVariants}
          >
            <Button asChild size="xl">
              <Link href={`/${locale}/explore`}>{ctaExplore}</Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link href={`/${locale}/prayers`}>{ctaPrayers}</Link>
            </Button>
            <Button asChild variant="ghost" size="xl">
              <Link href={`/${locale}/videos`}>{ctaVideos}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
