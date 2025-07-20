import { JournalEntry } from '@chosim/types';
import { CreateJournalEntryDto } from '@chosim/types';

export interface ICreateJournalEntryUseCase {
  execute(dto: CreateJournalEntryDto): Promise<JournalEntry>;
}