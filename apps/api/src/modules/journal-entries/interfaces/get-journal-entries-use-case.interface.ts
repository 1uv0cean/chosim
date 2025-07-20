import { JournalEntry, JournalEntryStatus } from '@chosim/types';

export interface IGetJournalEntriesUseCase {
  execute(status?: JournalEntryStatus): Promise<JournalEntry[]>;
}

export interface IGetJournalEntryByIdUseCase {
  execute(id: string): Promise<JournalEntry | null>;
}