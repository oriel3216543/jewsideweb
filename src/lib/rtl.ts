import { Locale } from './i18n';

export const isRtl = (locale: Locale): boolean => {
  return locale === 'he';
};

export const getDirection = (locale: Locale): 'ltr' | 'rtl' => {
  return isRtl(locale) ? 'rtl' : 'ltr';
};
