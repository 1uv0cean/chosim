'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { Locale } from '@/lib/translations';

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { locale: currentLang, changeLanguage } = useLanguage();

  const languages = [
    { code: 'ko' as Locale, label: '한국어 (Korean)' },
    { code: 'en' as Locale, label: 'English' },
    { code: 'ja' as Locale, label: '日本語 (Japanese)' },
    { code: 'zh' as Locale, label: '中文 (Chinese)' },
    { code: 'es' as Locale, label: 'Español (Spanish)' },
    { code: 'fr' as Locale, label: 'Français (French)' },
    { code: 'de' as Locale, label: 'Deutsch (German)' }
  ];

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const langCode = event.target.value as Locale;
    changeLanguage(langCode);
    window.location.reload();
  };

  return (
    <div className={className}>
      <select
        value={currentLang}
        onChange={handleLanguageChange}
        className="bg-slate-800 border border-slate-600 text-slate-100 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 hover:bg-slate-700"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-slate-800 text-slate-100">
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}