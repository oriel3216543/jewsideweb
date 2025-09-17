import { Metadata } from 'next';
import { Locale } from './i18n';

interface SeoProps {
  title?: string;
  description?: string;
  locale: Locale;
}

export const getMetadata = ({ title, description, locale }: SeoProps): Metadata => {
  const baseTitle = locale === 'en' ? 'JewSide' : 'ג\'וסייד';
  const baseDescription =
    locale === 'en'
      ? 'Explore Jewish Traditions & Prayers'
      : 'גלה מסורות ותפילות יהודיות';

  return {
    title: title ? `${title} | ${baseTitle}` : baseTitle,
    description: description || baseDescription,
    openGraph: {
      title: title ? `${title} | ${baseTitle}` : baseTitle,
      description: description || baseDescription,
      siteName: baseTitle,
      locale: locale,
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: baseTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | ${baseTitle}` : baseTitle,
      description: description || baseDescription,
      images: ['/og-image.png'],
    },
  };
};
