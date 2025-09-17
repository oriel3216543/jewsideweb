"use client";

import { useState } from 'react';
import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { VideoCard } from '@/components/video-card';
import { SearchBar } from '@/components/search-bar';
import { FilterBar } from '@/components/filter-bar';
import { Grid } from '@/components/grid';
import { EmptyState } from '@/components/empty-state';
import { useTranslations } from 'next-intl';

import videos from '@/content/videos.json';
import categories from '@/content/categories.json';
import { Locale } from '@/lib/i18n';
import { getMetadata } from '@/lib/seo';

interface VideosPageProps {
  params: { locale: Locale };
}

export function generateMetadata({ params: { locale } }: VideosPageProps) {
  return getMetadata({ 
    title: locale === 'en' ? 'Videos' : 'סרטונים',
    locale 
  });
}

export default function VideosPage({ params: { locale } }: VideosPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const t = useTranslations('videos');

  // Filter videos based on search and category
  const filteredVideos = videos.filter(video => {
    const matchesSearch = searchQuery === '' || 
      video.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.title_he.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description_he.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = !activeCategory || video.category_id === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: { category?: number }) => {
    setActiveCategory(filter.category || null);
  };

  // Keep track of featured videos for future use
  videos.filter(video => video.featured);

  return (
    <Container className="py-12">
      <Section title={t('title')}>
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterBar 
              categories={categories} 
              onFilterChange={handleFilterChange}
              locale={locale}
            />
          </div>
          
          <div className="lg:col-span-3">
            {filteredVideos.length > 0 ? (
              <Grid columns={{ default: 1, sm: 2, md: 2, lg: 3 }}>
                {filteredVideos.map(video => (
                  <VideoCard key={video.id} video={video} locale={locale} />
                ))}
              </Grid>
            ) : (
              <EmptyState
                title={t('no_videos')}
                description={locale === 'en' 
                  ? "No videos match your search criteria."
                  : "אין סרטונים התואמים את קריטריוני החיפוש שלך."}
                icon="video"
                action={{
                  label: locale === 'en' ? "Clear filters" : "נקה מסננים",
                  onClick: () => {
                    setSearchQuery('');
                    setActiveCategory(null);
                  }
                }}
              />
            )}
          </div>
        </div>
      </Section>
    </Container>
  );
}
