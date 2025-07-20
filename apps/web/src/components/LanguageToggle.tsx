'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { Locale } from '@/lib/translations';

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { locale: currentLang, changeLanguage } = useLanguage();

  const languages = [
    { code: 'ko' as Locale, label: '한', title: '한국어' },
    { code: 'en' as Locale, label: 'En', title: 'English' },
    { code: 'ja' as Locale, label: '日', title: '日本語' }
  ];

  const handleLanguageChange = (langCode: Locale) => {
    changeLanguage(langCode);
  };

  return (
    <div className={`flex space-x-2 ${className}`}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          title={lang.title}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            currentLang === lang.code
              ? 'bg-slate-700 text-slate-100'
              : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}