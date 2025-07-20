import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export default getRequestConfig(async () => {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  
  // Simple language detection
  let locale = 'en';
  if (acceptLanguage.includes('ko')) {
    locale = 'ko';
  } else if (acceptLanguage.includes('ja')) {
    locale = 'ja';
  } else if (acceptLanguage.includes('en')) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});