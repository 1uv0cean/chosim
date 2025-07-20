import { Module } from '@nestjs/common';
import { JournalEntryController } from './controllers/journal-entry.controller';
import { CreateJournalEntryUseCase } from './use-cases/create-journal-entry.use-case';
import { GetJournalEntriesUseCase, GetJournalEntryByIdUseCase } from './use-cases/get-journal-entries.use-case';
import { JournalEntryRepositoryService } from './services/journal-entry-repository.service';

const CREATE_JOURNAL_ENTRY_USE_CASE = 'ICreateJournalEntryUseCase';
const GET_JOURNAL_ENTRIES_USE_CASE = 'IGetJournalEntriesUseCase';
const GET_JOURNAL_ENTRY_BY_ID_USE_CASE = 'IGetJournalEntryByIdUseCase';
const JOURNAL_ENTRY_REPOSITORY = 'IJournalEntryRepository';

@Module({
  controllers: [JournalEntryController],
  providers: [
    {
      provide: CREATE_JOURNAL_ENTRY_USE_CASE,
      useClass: CreateJournalEntryUseCase,
    },
    {
      provide: GET_JOURNAL_ENTRIES_USE_CASE,
      useClass: GetJournalEntriesUseCase,
    },
    {
      provide: GET_JOURNAL_ENTRY_BY_ID_USE_CASE,
      useClass: GetJournalEntryByIdUseCase,
    },
    {
      provide: JOURNAL_ENTRY_REPOSITORY,
      useClass: JournalEntryRepositoryService,
    },
  ],
})
export class JournalEntryModule {}