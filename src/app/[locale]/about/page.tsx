"use client";

import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

import { Locale } from '@/lib/i18n';
import { getMetadata } from '@/lib/seo';

interface AboutPageProps {
  params: { locale: Locale };
}

export function generateMetadata({ params: { locale } }: AboutPageProps) {
  return getMetadata({ 
    title: locale === 'en' ? 'About Us' : 'אודות',
    locale 
  });
}

export default function AboutPage({ params: { locale } }: AboutPageProps) {
  const t = useTranslations('about');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const teamMembers = [
    {
      name: 'Sarah Cohen',
      role: locale === 'en' ? 'Founder & CEO' : 'מייסדת ומנכ"לית',
      bio: locale === 'en' 
        ? 'Sarah is a Jewish educator with over 15 years of experience in teaching Jewish traditions and prayers.'
        : 'שרה היא מחנכת יהודית עם ניסיון של למעלה מ-15 שנים בהוראת מסורות ותפילות יהודיות.',
    },
    {
      name: 'David Levi',
      role: locale === 'en' ? 'Chief Content Officer' : 'מנהל תוכן ראשי',
      bio: locale === 'en'
        ? 'David is a rabbi with expertise in Jewish liturgy and has authored several books on prayer.'
        : 'דוד הוא רב עם התמחות בליטורגיה יהודית וכתב מספר ספרים על תפילה.',
    },
    {
      name: 'Rachel Goldberg',
      role: locale === 'en' ? 'Director of Education' : 'מנהלת חינוך',
      bio: locale === 'en'
        ? 'Rachel develops educational programs and resources for synagogues and schools.'
        : 'רחל מפתחת תוכניות חינוכיות ומשאבים לבתי כנסת ובתי ספר.',
    },
  ];

  return (
    <Container className="py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Section title={t('title')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">{t('mission')}</h2>
                <p className="text-muted-foreground">
                  {t('mission_text')}
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">{t('vision')}</h2>
                <p className="text-muted-foreground">
                  {t('vision_text')}
                </p>
              </div>
            </div>
          </Section>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Section title={t('team')} className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="h-40 bg-muted flex items-center justify-center">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <span className="text-2xl font-bold">{member.name.charAt(0)}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                    <p>{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Section 
            title={t('contact_us')} 
            className="mt-12 text-center"
          >
            <Button asChild>
              <Link href={`/${locale}/contact`}>
                {t('contact_us')}
              </Link>
            </Button>
          </Section>
        </motion.div>
      </motion.div>
    </Container>
  );
}
