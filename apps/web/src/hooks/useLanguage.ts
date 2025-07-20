'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/lib/translations';

export function useLanguage() {
  const [locale, setLocale] = useState<Locale>('ko');

  useEffect(() => {
    // Get from localStorage or detect from browser
    const saved = localStorage.getItem('chosim-locale') as Locale;
    if (saved && ['ko', 'en', 'ja'].includes(saved)) {
      setLocale(saved);
    } else {
      // Browser language detection
      const browserLang = navigator.language || 'ko';
      if (browserLang.startsWith('ja')) {
        setLocale('ja');
      } else if (browserLang.startsWith('en')) {
        setLocale('en');
      } else {
        setLocale('ko');
      }
    }
  }, []);

  const changeLanguage = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('chosim-locale', newLocale);
  };

  return { locale, changeLanguage };
}