"use client";

import { useState } from 'react';
import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

import { Locale } from '@/lib/i18n';
import { getMetadata } from '@/lib/seo';

interface ContactPageProps {
  params: { locale: Locale };
}

export function generateMetadata({ params: { locale } }: ContactPageProps) {
  return getMetadata({ 
    title: locale === 'en' ? 'Contact Us' : 'צור קשר',
    locale 
  });
}

export default function ContactPage({ params: { locale } }: ContactPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const t = useTranslations('contact');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };
  
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: locale === 'en' ? 'Email' : 'אימייל',
      content: 'info@jewside.com'
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: locale === 'en' ? 'Phone' : 'טלפון',
      content: '+1 (555) 123-4567'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: locale === 'en' ? 'Address' : 'כתובת',
      content: locale === 'en' 
        ? '123 Jewish Heritage Ave, New York, NY 10001' 
        : '123 שדרות המורשת היהודית, ניו יורק, 10001'
    }
  ];

  return (
    <Container className="py-12">
      <Section title={t('title')}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {locale === 'en' ? 'Get in Touch' : 'צור קשר'}
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 text-primary rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-muted-foreground">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {locale === 'en' ? 'Send us a Message' : 'שלח לנו הודעה'}
              </h2>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="mb-4 p-4 rounded-full bg-green-100 text-green-600 inline-flex">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium">{t('success')}</h3>
                  <p className="text-muted-foreground mt-2">
                    {locale === 'en' 
                      ? 'We will get back to you as soon as possible.' 
                      : 'נחזור אליך בהקדם האפשרי.'}
                  </p>
                  <Button 
                    className="mt-4" 
                    onClick={() => setIsSubmitted(false)}
                  >
                    {locale === 'en' ? 'Send Another Message' : 'שלח הודעה נוספת'}
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        {t('name')}
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        {t('email')}
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        {t('message')}
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting 
                        ? locale === 'en' ? 'Sending...' : 'שולח...' 
                        : t('send')}
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </Section>
    </Container>
  );
}
