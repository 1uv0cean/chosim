import { JournalEntry, JournalEntryStatus } from '@chosim/types';
import { CreateJournalEntryDto, UpdateJournalEntryDto } from '@chosim/types';

export interface IJournalEntryRepository {
  create(dto: CreateJournalEntryDto): Promise<JournalEntry>;
  findById(id: string): Promise<JournalEntry | null>;
  findAll(status?: JournalEntryStatus): Promise<JournalEntry[]>;
  update(id: string, dto: UpdateJournalEntryDto): Promise<JournalEntry | null>;
  delete(id: string): Promise<boolean>;
  findUnlockedEntries(): Promise<JournalEntry[]>;
  updateStatusToUnlocked(id: string): Promise<JournalEntry | null>;
}