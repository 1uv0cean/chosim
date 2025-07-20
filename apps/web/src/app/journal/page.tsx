'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockPeriod } from '@chosim/types';
import { TypingAnimation } from '@/components/TypingAnimation';
import { JournalForm } from '@/features/journal/JournalForm';
import { apiClient } from '@/lib/api';

const QUESTION = "What was your original intention?";

export default function JournalPage() {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const handleAnimationComplete = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (content: string, lockPeriod: LockPeriod, title?: string) => {
    try {
      await apiClient.createJournalEntry({
        content,
        lockPeriodDays: lockPeriod,
        title,
      });
      router.push('/entries');
    } catch (error) {
      console.error('Failed to create entry:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center p-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="space-y-12">
          <div className="text-center">
            <TypingAnimation 
              text={QUESTION}
              className="text-2xl md:text-3xl font-light tracking-wide"
              onComplete={handleAnimationComplete}
            />
          </div>

          {showForm && (
            <JournalForm onSubmit={handleFormSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}