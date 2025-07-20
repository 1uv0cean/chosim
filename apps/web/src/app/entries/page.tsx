'use client';

import { useState, useEffect } from 'react';
import { JournalEntry } from '@chosim/types';
import { apiClient } from '@/lib/api';
import { EntryList } from '@/features/entries/EntryList';
import Link from 'next/link';

export default function EntriesPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const data = await apiClient.getJournalEntries();
        setEntries(data);
      } catch (err) {
        setError('Failed to load entries');
        console.error('Error loading entries:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="text-xl font-light">Loading your reflections...</div>
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
            Return Home
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
            <h1 className="text-3xl font-light tracking-wide">Your Reflections</h1>
            <p className="text-slate-400">
              {entries.length === 0 
                ? "You haven't written any reflections yet." 
                : `${entries.length} reflection${entries.length !== 1 ? 's' : ''} recorded`
              }
            </p>
          </div>

          {entries.length === 0 ? (
            <div className="text-center space-y-6 py-12">
              <p className="text-slate-500">Start your journey of self-reflection.</p>
              <Link
                href="/journal"
                className="inline-block px-8 py-3 bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg"
              >
                Write Your First Reflection
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
              ← Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}