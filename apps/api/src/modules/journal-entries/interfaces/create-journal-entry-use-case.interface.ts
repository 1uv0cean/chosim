import { JournalEntry, CreateJournalEntryDto } from '@chosim/types';

export interface ICreateJournalEntryUseCase {
  execute(dto: CreateJournalEntryDto): Promise<JournalEntry>;
}