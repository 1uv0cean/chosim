'use client';

import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useLanguage } from '@/hooks/useLanguage';
import { Locale } from '@/lib/translations';

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { locale: currentLang, changeLanguage } = useLanguage();

  const languages = [
    { code: 'ko' as Locale, label: '한국어' },
    { code: 'en' as Locale, label: 'English' },
    { code: 'ja' as Locale, label: '日本語' },
    { code: 'zh' as Locale, label: '中文' },
    { code: 'es' as Locale, label: 'Español' },
    { code: 'fr' as Locale, label: 'Français' },
    { code: 'de' as Locale, label: 'Deutsch' }
  ];

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const langCode = event.target.value as Locale;
    changeLanguage(langCode);
    window.location.reload();
  };

  return (
    <FormControl size="small" className={className}>
      <Select
        value={currentLang}
        onChange={handleLanguageChange}
        sx={{
          minWidth: { xs: 80, sm: 100 },
          '& .MuiSelect-select': {
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            fontWeight: 300,
            padding: { xs: '6px 8px', sm: '8px 12px' },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            {lang.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}