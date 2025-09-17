import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Locale, locales } from '@/lib/i18n';
import { getDirection } from '@/lib/rtl';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { RtlProvider } from '@/components/rtl-provider';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (_) {
    notFound();
  }

  const currentLocale = await getLocale();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <RtlProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </RtlProvider>
    </NextIntlClientProvider>
  );
}
