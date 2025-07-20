'use client';

import { useState, useEffect } from 'react';
import { JournalEntry } from '@chosim/types';
import { apiClient } from '@/lib/api';
import { EntryList } from '@/features/entries/EntryList';
import Link from 'next/link';
import { t } from '@/lib/translations';
import { useLanguage } from '@/hooks/useLanguage';

export default function EntriesPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { locale } = useLanguage();

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const data = await apiClient.getJournalEntries();
        setEntries(data);
      } catch (err) {
        setError(t(locale, 'entries.failedToLoad'));
        console.error('Error loading entries:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, [locale]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="text-xl font-light">{t(locale, 'common.loading')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-xl text-red-400">{error}</div>
          <Link 
            href="/"
            className="inline-block px-6 py-2 bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg"
          >
            {t(locale, 'common.returnHome')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-light tracking-wide">{t(locale, 'entries.title')}</h1>
            <p className="text-slate-400">
              {entries.length === 0 
                ? t(locale, 'entries.noEntries')
                : t(locale, 'entries.entryCount', { count: entries.length.toString() })
              }
            </p>
          </div>

          {entries.length === 0 ? (
            <div className="text-center space-y-6 py-12">
              <p className="text-slate-500">{t(locale, 'entries.startJourney')}</p>
              <Link
                href="/journal"
                className="inline-block px-8 py-3 bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg"
              >
                {t(locale, 'entries.firstReflection')}
              </Link>
            </div>
          ) : (
            <EntryList entries={entries} />
          )}

          <div className="text-center">
            <Link
              href="/"
              className="text-slate-500 hover:text-slate-300 transition-colors"
            >
              ← {t(locale, 'common.returnHome')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}