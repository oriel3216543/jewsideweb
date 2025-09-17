import { Container } from '@/components/container';
import { Hero } from '@/components/hero';
import { Section } from '@/components/section';
import { VideoCard } from '@/components/video-card';
import { PrayerCard } from '@/components/prayer-card';
import { CategoryPill } from '@/components/category-pill';
import { Grid } from '@/components/grid';
import { Carousel } from '@/components/carousel';
import { Button } from '@/components/ui/button';
import { getMetadata } from '@/lib/seo';

import { useTranslations } from 'next-intl';
import { Locale } from '@/lib/i18n';

import videos from '@/content/videos.json';
import prayers from '@/content/prayers.json';
import categories from '@/content/categories.json';
import weekly from '@/content/weekly.json';

interface HomePageProps {
  params: { locale: Locale };
}

export function generateMetadata({ params: { locale } }: HomePageProps) {
  return getMetadata({ locale });
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  const t = useTranslations('home');
  
  // Get featured items
  const featuredVideos = videos.filter(video => 
    weekly.featured_videos.includes(video.id)
  );
  
  const featuredPrayers = prayers.filter(prayer => 
    weekly.featured_prayers.includes(prayer.id)
  );

  // Get the latest videos
  const newVideos = [...videos]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  return (
    <div>
      <Hero 
        headline={locale === 'en' ? weekly.hero.headline_en : weekly.hero.headline_he}
        subline={locale === 'en' ? weekly.hero.subline_en : weekly.hero.subline_he}
        ctaExplore={t('hero.cta_explore')}
        ctaPrayers={t('hero.cta_prayers')}
        ctaVideos={t('hero.cta_videos')}
      />

      <Container>
        <Section 
          title={t('weekly')}
          action={{
            label: t('categories.view_all'),
            href: `/${locale}/explore`,
          }}
        >
          <Carousel>
            {featuredVideos.map(video => (
              <div key={video.id} className="px-4">
                <VideoCard video={video} locale={locale} />
              </div>
            ))}
            {featuredPrayers.map(prayer => (
              <div key={prayer.id} className="px-4">
                <PrayerCard prayer={prayer} locale={locale} />
              </div>
            ))}
          </Carousel>
        </Section>

        <Section title={t('popular')}>
          <Grid>
            {categories.slice(0, 8).map(category => (
              <CategoryPill key={category.id} category={category} />
            ))}
          </Grid>
        </Section>

        <Section 
          title={t('new_videos')}
          action={{
            label: t('categories.view_all'),
            href: `/${locale}/videos`,
          }}
        >
          <Grid>
            {newVideos.map(video => (
              <VideoCard key={video.id} video={video} locale={locale} />
            ))}
          </Grid>
        </Section>

        <Section 
          title={t('featured_prayers')}
          action={{
            label: t('categories.view_all'),
            href: `/${locale}/prayers`,
          }}
        >
          <Grid>
            {featuredPrayers.slice(0, 4).map(prayer => (
              <PrayerCard key={prayer.id} prayer={prayer} locale={locale} />
            ))}
          </Grid>
        </Section>

        {/* Newsletter */}
        <div className="my-16 py-10 px-6 rounded-2xl bg-muted">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold">{t('newsletter.title')}</h2>
            <p className="mt-2 text-muted-foreground">{t('newsletter.subtitle')}</p>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button type="button">
                {t('newsletter.button')}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
