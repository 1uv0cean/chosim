'use client';

import { JournalEntry, JournalEntryStatus } from '@chosim/types';
import { formatDate } from '@chosim/utils';

interface EntryListProps {
  entries: JournalEntry[];
}

export function EntryList({ entries }: EntryListProps) {
  const unlockedEntries = entries.filter(entry => entry.status === JournalEntryStatus.UNLOCKED);
  const lockedEntries = entries.filter(entry => entry.status === JournalEntryStatus.LOCKED);

  return (
    <div className="space-y-8">
      {unlockedEntries.length > 0 && (
        <section>
          <h2 className="text-xl font-medium text-slate-300 mb-4">
            Available Reflections
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
            Locked Reflections
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
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
      {entry.title && (
        <h3 className="text-lg font-medium text-slate-200">{entry.title}</h3>
      )}
      
      <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
        {entry.content}
      </div>
      
      <div className="flex justify-between items-center text-sm text-slate-500 pt-4 border-t border-slate-700">
        <span>Written on {formatDate(new Date(entry.createdAt), 'long')}</span>
        <span>Unlocked after {entry.lockPeriodDays} days</span>
      </div>
    </div>
  );
}

function LockedEntryCard({ entry }: { entry: JournalEntry }) {
  const daysUntilUnlock = Math.ceil(
    (new Date(entry.unlocksAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-500/50" />
        <span className="text-amber-400 font-medium">Reflection Locked</span>
      </div>
      
      {entry.title && (
        <h3 className="text-lg font-medium text-slate-400">{entry.title}</h3>
      )}
      
      <div className="text-slate-500">
        <p>This reflection is currently locked away.</p>
        <p className="mt-2">
          It will unlock in <span className="font-medium text-slate-400">{daysUntilUnlock} day{daysUntilUnlock !== 1 ? 's' : ''}</span> 
          {' '}on {formatDate(new Date(entry.unlocksAt), 'long')}.
        </p>
      </div>
      
      <div className="text-sm text-slate-600 pt-4 border-t border-slate-800">
        Written on {formatDate(new Date(entry.createdAt), 'long')}
      </div>
    </div>
  );
}