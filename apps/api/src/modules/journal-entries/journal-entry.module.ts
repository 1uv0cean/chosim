import { Module } from '@nestjs/common';
import { JournalEntryController } from './controllers/journal-entry.controller';
import { CreateJournalEntryUseCase } from './use-cases/create-journal-entry.use-case';
import { GetJournalEntriesUseCase, GetJournalEntryByIdUseCase } from './use-cases/get-journal-entries.use-case';
import { JournalEntryRepositoryService } from './services/journal-entry-repository.service';
import { ICreateJournalEntryUseCase } from './interfaces/create-journal-entry-use-case.interface';
import { IGetJournalEntriesUseCase, IGetJournalEntryByIdUseCase } from './interfaces/get-journal-entries-use-case.interface';
import { IJournalEntryRepository } from './interfaces/journal-entry-repository.interface';

@Module({
  controllers: [JournalEntryController],
  providers: [
    {
      provide: ICreateJournalEntryUseCase,
      useClass: CreateJournalEntryUseCase,
    },
    {
      provide: IGetJournalEntriesUseCase,
      useClass: GetJournalEntriesUseCase,
    },
    {
      provide: IGetJournalEntryByIdUseCase,
      useClass: GetJournalEntryByIdUseCase,
    },
    {
      provide: IJournalEntryRepository,
      useClass: JournalEntryRepositoryService,
    },
  ],
})
export class JournalEntryModule {}