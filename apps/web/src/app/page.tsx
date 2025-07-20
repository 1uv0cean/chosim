'use client';

import Link from "next/link";
import { t } from '@/lib/translations';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/hooks/useLanguage';

export default function Home() {
  const { locale } = useLanguage();
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-8">
      <div className="absolute top-6 right-6">
        <LanguageToggle />
      </div>
      
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-light tracking-wide">
            {t(locale, 'common.title')}
          </h1>
          <p className="text-lg text-slate-400 font-light">
            {t(locale, 'common.subtitle')}
          </p>
        </div>

        <div className="space-y-6">
          <Link
            href="/journal"
            className="inline-block px-8 py-3 bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg text-slate-100 font-medium"
          >
            {t(locale, 'home.beginReflection')}
          </Link>
          
          <div className="text-slate-500">
            <Link 
              href="/entries"
              className="hover:text-slate-300 transition-colors"
            >
              {t(locale, 'home.viewPastReflections')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
