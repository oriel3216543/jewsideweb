"use client";

import { useState } from 'react';
import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { SearchBar } from '@/components/search-bar';
import { FilterBar } from '@/components/filter-bar';
import { VideoCard } from '@/components/video-card';
import { PrayerCard } from '@/components/prayer-card';
import { Grid } from '@/components/grid';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { EmptyState } from '@/components/empty-state';
import { useTranslations } from 'next-intl';

import videos from '@/content/videos.json';
import prayers from '@/content/prayers.json';
import categories from '@/content/categories.json';
import { Locale } from '@/lib/i18n';

interface ExplorePageProps {
  params: { locale: Locale };
}

export default function ExplorePage({ params: { locale } }: ExplorePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{ type?: string; category?: number }>({});
  const [activeTab, setActiveTab] = useState('all');
  const t = useTranslations('explore');

  // Filter videos based on search and filters
  const filteredVideos = videos.filter(video => {
    const matchesSearch = searchQuery === '' || 
      video.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.title_he.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description_he.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = !filters.category || video.category_id === filters.category;
    
    return matchesSearch && matchesCategory;
  });

  // Filter prayers based on search and filters
  const filteredPrayers = prayers.filter(prayer => {
    const matchesSearch = searchQuery === '' || 
      prayer.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prayer.title_he.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prayer.excerpt_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prayer.excerpt_he.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = !filters.category || 
      prayer.category_ids.includes(filters.category);
    
    return matchesSearch && matchesCategory;
  });

  // Combine results based on active tab
  const results = activeTab === 'all' 
    ? [...filteredVideos.map(v => ({ type: 'video', item: v })), ...filteredPrayers.map(p => ({ type: 'prayer', item: p }))]
    : activeTab === 'videos'
      ? filteredVideos.map(v => ({ type: 'video', item: v }))
      : filteredPrayers.map(p => ({ type: 'prayer', item: p }));

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: { type?: string; category?: number }) => {
    setFilters(newFilters);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

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
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">{t('all')}</TabsTrigger>
                <TabsTrigger value="videos">{t('videos')}</TabsTrigger>
                <TabsTrigger value="prayers">{t('prayers')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                {results.length > 0 ? (
                  <>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {t('results_count', { count: results.length })}
                    </p>
                    <Grid columns={{ default: 1, sm: 2, lg: 2 }}>
                      {results.map(({ type, item }) => {
                        if (type === 'video') {
                          // Type assertion to match VideoCard props
                          const videoItem = item as typeof videos[0];
                          return <VideoCard key={`video-${item.id}`} video={videoItem} locale={locale} />;
                        } else {
                          // Type assertion to match PrayerCard props
                          const prayerItem = item as typeof prayers[0];
                          return <PrayerCard key={`prayer-${item.id}`} prayer={prayerItem} locale={locale} />;
                        }
                      })}
                    </Grid>
                  </>
                ) : (
                  <EmptyState
                    title={t('no_results')}
                    description={locale === 'en' 
                      ? "Try adjusting your search or filters to find what you're looking for."
                      : "נסה להתאים את החיפוש או המסננים כדי למצוא את מה שאתה מחפש."}
                    icon="search"
                    action={{
                      label: locale === 'en' ? "Clear filters" : "נקה מסננים",
                      onClick: () => {
                        setSearchQuery('');
                        setFilters({});
                      }
                    }}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="videos" className="mt-0">
                {filteredVideos.length > 0 ? (
                  <>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {t('results_count', { count: filteredVideos.length })}
                    </p>
                    <Grid columns={{ default: 1, sm: 2, lg: 2 }}>
                      {filteredVideos.map(video => (
                        <VideoCard key={video.id} video={video} locale={locale} />
                      ))}
                    </Grid>
                  </>
                ) : (
                  <EmptyState
                    title={t('no_videos')}
                    description={locale === 'en' 
                      ? "No videos match your search criteria."
                      : "אין סרטונים התואמים את קריטריוני החיפוש שלך."}
                    icon="video"
                  />
                )}
              </TabsContent>
              
              <TabsContent value="prayers" className="mt-0">
                {filteredPrayers.length > 0 ? (
                  <>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {t('results_count', { count: filteredPrayers.length })}
                    </p>
                    <Grid columns={{ default: 1, sm: 2, lg: 2 }}>
                      {filteredPrayers.map(prayer => (
                        <PrayerCard key={prayer.id} prayer={prayer} locale={locale} />
                      ))}
                    </Grid>
                  </>
                ) : (
                  <EmptyState
                    title={t('no_prayers')}
                    description={locale === 'en' 
                      ? "No prayers match your search criteria."
                      : "אין תפילות התואמות את קריטריוני החיפוש שלך."}
                    icon="book-open"
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Section>
    </Container>
  );
}
