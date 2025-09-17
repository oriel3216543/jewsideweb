import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { CategoryPill } from '@/components/category-pill';
import { Grid } from '@/components/grid';
import { useTranslations } from 'next-intl';

import categories from '@/content/categories.json';
import { Locale } from '@/lib/i18n';
import { getMetadata } from '@/lib/seo';

interface CategoriesPageProps {
  params: { locale: Locale };
}

export function generateMetadata({ params: { locale } }: CategoriesPageProps) {
  return getMetadata({ 
    title: locale === 'en' ? 'Categories' : 'קטגוריות',
    locale 
  });
}

export default function CategoriesPage({ params: { locale } }: CategoriesPageProps) {
  const t = useTranslations('categories');

  return (
    <Container className="py-12">
      <Section title={t('title')} description={t('all_categories')}>
        <Grid columns={{ default: 1, sm: 2, md: 3, lg: 4 }}>
          {categories.map(category => (
            <CategoryPill key={category.id} category={category} />
          ))}
        </Grid>
      </Section>
    </Container>
  );
}
