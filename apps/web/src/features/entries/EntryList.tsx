'use client';

import { JournalEntry, JournalEntryStatus } from '@chosim/types';
import { formatDate } from '@chosim/utils';
import { t } from '@/lib/translations';
import { useLanguage } from '@/hooks/useLanguage';

interface EntryListProps {
  entries: JournalEntry[];
}

export function EntryList({ entries }: EntryListProps) {
  const { locale } = useLanguage();
  const unlockedEntries = entries.filter(entry => entry.status === JournalEntryStatus.UNLOCKED);
  const lockedEntries = entries.filter(entry => entry.status === JournalEntryStatus.LOCKED);

  return (
    <div className="space-y-8">
      {unlockedEntries.length > 0 && (
        <section>
          <h2 className="text-xl font-medium text-slate-300 mb-4">
            {t(locale, 'entries.availableReflections')}
          </h2>
          <div className="space-y-4">
            {unlockedEntries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </section>
      )}

      {lockedEntries.length > 0 && (
        <section>
          <h2 className="text-xl font-medium text-slate-300 mb-4">
            {t(locale, 'entries.lockedReflections')}
          </h2>
          <div className="space-y-4">
            {lockedEntries.map((entry) => (
              <LockedEntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function EntryCard({ entry }: { entry: JournalEntry }) {
  const { locale } = useLanguage();
  
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
      {entry.title && (
        <h3 className="text-lg font-medium text-slate-200">{entry.title}</h3>
      )}
      
      <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
        {entry.content}
      </div>
      
      <div className="flex justify-between items-center text-sm text-slate-500 pt-4 border-t border-slate-700">
        <span>{t(locale, 'entries.writtenOn', { date: formatDate(new Date(entry.createdAt), 'long', locale) })}</span>
        <span>{t(locale, 'entries.unlockedAfter', { days: entry.lockPeriodDays.toString() })}</span>
      </div>
    </div>
  );
}

function LockedEntryCard({ entry }: { entry: JournalEntry }) {
  const { locale } = useLanguage();
  const daysUntilUnlock = Math.ceil(
    (new Date(entry.unlocksAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-500/50" />
        <span className="text-amber-400 font-medium">{t(locale, 'entries.reflectionLocked')}</span>
      </div>
      
      {entry.title && (
        <h3 className="text-lg font-medium text-slate-400">{entry.title}</h3>
      )}
      
      <div className="text-slate-500">
        <p>{t(locale, 'entries.lockedDescription')}</p>
        <p className="mt-2">
          {t(locale, 'entries.unlocksIn', { days: daysUntilUnlock.toString() })} {t(locale, 'entries.unlocksOn', { date: formatDate(new Date(entry.unlocksAt), 'long', locale) })}
        </p>
      </div>
      
      <div className="text-sm text-slate-600 pt-4 border-t border-slate-800">
        {t(locale, 'entries.writtenOn', { date: formatDate(new Date(entry.createdAt), 'long', locale) })}
      </div>
    </div>
  );
}