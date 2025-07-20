'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/lib/translations';

export function useLanguage() {
  const [locale, setLocale] = useState<Locale>('ko');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Get from localStorage or detect from browser
    const supportedLanguages: Locale[] = ['ko', 'en', 'ja', 'zh', 'es', 'fr', 'de'];
    
    try {
      const saved = localStorage.getItem('chosim-locale') as Locale;
      
      if (saved && supportedLanguages.includes(saved)) {
        setLocale(saved);
      } else {
        // Browser language detection
        const browserLang = navigator.language || 'ko';
        
        let detectedLang: Locale = 'ko';
        
        if (browserLang.startsWith('ko')) {
          detectedLang = 'ko';
        } else if (browserLang.startsWith('ja')) {
          detectedLang = 'ja';
        } else if (browserLang.startsWith('zh')) {
          detectedLang = 'zh';
        } else if (browserLang.startsWith('es')) {
          detectedLang = 'es';
        } else if (browserLang.startsWith('fr')) {
          detectedLang = 'fr';
        } else if (browserLang.startsWith('de')) {
          detectedLang = 'de';
        } else if (browserLang.startsWith('en')) {
          detectedLang = 'en';
        }
        
        setLocale(detectedLang);
        localStorage.setItem('chosim-locale', detectedLang);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      setLocale('ko'); // fallback
    }
    
    setIsInitialized(true);
  }, []);

  const changeLanguage = (newLocale: Locale) => {
    try {
      localStorage.setItem('chosim-locale', newLocale);
      setLocale(newLocale);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      setLocale(newLocale); // still change the locale even if localStorage fails
    }
  };

  return { locale, changeLanguage, isInitialized };
}