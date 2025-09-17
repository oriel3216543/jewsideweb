"use client";

import { useState } from 'react';
import { Container } from '@/components/container';
import { VideoCard } from '@/components/video-card';
import { PrayerCard } from '@/components/prayer-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { EmptyState } from '@/components/empty-state';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import * as LucideIcons from "lucide-react";

import videos from '@/content/videos.json';
import prayers from '@/content/prayers.json';
import categories from '@/content/categories.json';
import { Locale } from '@/lib/i18n';
import { getMetadata } from '@/lib/seo';
import { Grid } from '@/components/grid';

interface CategoryPageProps {
  params: { locale: Locale; slug: string };
}

export function generateMetadata({ params: { locale, slug } }: CategoryPageProps) {
  const category = categories.find(cat => cat.slug === slug);
  if (!category) return {};
  
  const title = locale === 'en' ? category.name_en : category.name_he;
  
  return getMetadata({ 
    title,
    locale 
  });
}

export default function CategoryPage({ params: { locale, slug } }: CategoryPageProps) {
  const [activeTab, setActiveTab] = useState('all');
  const t = useTranslations('categories');
  
  // Find the category
  const category = categories.find(cat => cat.slug === slug);
  if (!category) return notFound();
  
  // Get the category name based on locale
  const categoryName = locale === 'en' ? category.name_en : category.name_he;
  
  // Get items for this category
  const categoryVideos = videos.filter(video => video.category_id === category.id);
  const categoryPrayers = prayers.filter(prayer => prayer.category_ids.includes(category.id));
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Get the icon from Lucide
  const iconName = category.icon.charAt(0).toUpperCase() + category.icon.slice(1);
  // Using type assertion to avoid TypeScript issues with dynamic imports
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Tag;

  return (
    <Container className="py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          <IconComponent className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold">{categoryName}</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">{t('all')}</TabsTrigger>
          <TabsTrigger value="videos">{t('videos')}</TabsTrigger>
          <TabsTrigger value="prayers">{t('prayers')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {categoryVideos.length > 0 || categoryPrayers.length > 0 ? (
            <Grid columns={{ default: 1, sm: 2, lg: 3 }}>
              {categoryVideos.map(video => (
                <VideoCard key={`video-${video.id}`} video={video} locale={locale} />
              ))}
              {categoryPrayers.map(prayer => (
                <PrayerCard key={`prayer-${prayer.id}`} prayer={prayer} locale={locale} />
              ))}
            </Grid>
          ) : (
            <EmptyState
              title={t('empty')}
              description={locale === 'en' 
                ? "This category doesn't have any content yet."
                : "קטגוריה זו אינה מכילה תוכן עדיין."}
              icon={category.icon}
            />
          )}
        </TabsContent>
        
        <TabsContent value="videos" className="mt-0">
          {categoryVideos.length > 0 ? (
            <Grid columns={{ default: 1, sm: 2, lg: 3 }}>
              {categoryVideos.map(video => (
                <VideoCard key={video.id} video={video} locale={locale} />
              ))}
            </Grid>
          ) : (
            <EmptyState
              title={t('empty')}
              description={locale === 'en' 
                ? "This category doesn't have any videos yet."
                : "קטגוריה זו אינה מכילה סרטונים עדיין."}
              icon="video"
            />
          )}
        </TabsContent>
        
        <TabsContent value="prayers" className="mt-0">
          {categoryPrayers.length > 0 ? (
            <Grid columns={{ default: 1, sm: 2 }}>
              {categoryPrayers.map(prayer => (
                <PrayerCard key={prayer.id} prayer={prayer} locale={locale} />
              ))}
            </Grid>
          ) : (
            <EmptyState
              title={t('empty')}
              description={locale === 'en' 
                ? "This category doesn't have any prayers yet."
                : "קטגוריה זו אינה מכילה תפילות עדיין."}
              icon="book-open"
            />
          )}
        </TabsContent>
      </Tabs>
    </Container>
  );
}
