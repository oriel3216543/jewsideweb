"use client";

import { useState } from 'react';
import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { PrayerCard } from '@/components/prayer-card';
import { SearchBar } from '@/components/search-bar';
import { FilterBar } from '@/components/filter-bar';
import { Grid } from '@/components/grid';
import { EmptyState } from '@/components/empty-state';
import { useTranslations } from 'next-intl';

import prayers from '@/content/prayers.json';
import categories from '@/content/categories.json';
import { Locale } from '@/lib/i18n';
import { getMetadata } from '@/lib/seo';

interface PrayersPageProps {
  params: { locale: Locale };
}

export function generateMetadata({ params: { locale } }: PrayersPageProps) {
  return getMetadata({ 
    title: locale === 'en' ? 'Prayers' : 'תפילות',
    locale 
  });
}

export default function PrayersPage({ params: { locale } }: PrayersPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const t = useTranslations('prayers');

  // Filter prayers based on search and category
  const filteredPrayers = prayers.filter(prayer => {
    const matchesSearch = searchQuery === '' || 
      prayer.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prayer.title_he.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prayer.excerpt_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prayer.excerpt_he.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prayer.content_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prayer.content_he.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = !activeCategory || prayer.category_ids.includes(activeCategory);
    
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: { category?: number }) => {
    setActiveCategory(filter.category || null);
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
            {filteredPrayers.length > 0 ? (
              <Grid columns={{ default: 1, sm: 2 }}>
                {filteredPrayers.map(prayer => (
                  <PrayerCard key={prayer.id} prayer={prayer} locale={locale} />
                ))}
              </Grid>
            ) : (
              <EmptyState
                title={t('no_prayers')}
                description={locale === 'en' 
                  ? "No prayers match your search criteria."
                  : "אין תפילות התואמות את קריטריוני החיפוש שלך."}
                icon="book-open"
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
