'use client';

import { useState } from 'react';
import { LockPeriod } from '@chosim/types';
import { t, Locale } from '@/lib/translations';

interface JournalFormProps {
  onSubmit: (content: string, lockPeriod: LockPeriod, title?: string) => Promise<void>;
  locale: Locale;
}

export function JournalForm({ onSubmit, locale }: JournalFormProps) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [lockPeriod, setLockPeriod] = useState<LockPeriod>(LockPeriod.THIRTY_DAYS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (content.trim().length < 10) {
      alert('Please write at least 10 characters to capture your reflection.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(content.trim(), lockPeriod, title.trim() || undefined);
    } catch (error) {
      console.error('Error submitting entry:', error);
      alert('Failed to save your reflection. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const lockPeriodOptions = [
    { 
      value: LockPeriod.THIRTY_DAYS, 
      label: t(locale, 'journal.lockPeriodOptions.30.label'), 
      description: t(locale, 'journal.lockPeriodOptions.30.description') 
    },
    { 
      value: LockPeriod.ONE_HUNDRED_DAYS, 
      label: t(locale, 'journal.lockPeriodOptions.100.label'), 
      description: t(locale, 'journal.lockPeriodOptions.100.description') 
    },
    { 
      value: LockPeriod.ONE_YEAR, 
      label: t(locale, 'journal.lockPeriodOptions.365.label'), 
      description: t(locale, 'journal.lockPeriodOptions.365.description') 
    },
  ];

  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t(locale, 'journal.titlePlaceholder')}
            className="w-full bg-transparent border-b border-slate-700 focus:border-slate-500 outline-none py-3 text-lg placeholder-slate-500 transition-colors"
            maxLength={100}
          />
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t(locale, 'journal.contentPlaceholder')}
            className="w-full bg-transparent border border-slate-700 focus:border-slate-500 outline-none p-6 rounded-lg text-base placeholder-slate-500 transition-colors min-h-[300px] resize-y"
            maxLength={5000}
          />
          
          <div className="text-right text-sm text-slate-500">
            {t(locale, 'journal.characterCount', { current: content.length.toString(), max: '5000' })}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-300">
            {t(locale, 'journal.lockPeriodTitle')}
          </h3>
          <p className="text-sm text-slate-500">
            {t(locale, 'journal.lockPeriodDescription')}
          </p>
          
          <div className="grid gap-3">
            {lockPeriodOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  lockPeriod === option.value
                    ? 'border-slate-500 bg-slate-800/50'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <input
                  type="radio"
                  name="lockPeriod"
                  value={option.value}
                  checked={lockPeriod === option.value}
                  onChange={(e) => setLockPeriod(Number(e.target.value) as LockPeriod)}
                  className="text-slate-400"
                />
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-slate-500">{option.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting || content.trim().length < 10}
            className="px-8 py-3 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:text-slate-600 transition-colors rounded-lg font-medium"
          >
            {isSubmitting ? t(locale, 'journal.submitting') : t(locale, 'journal.submitButton')}
          </button>
        </div>
      </form>
    </div>
  );
}