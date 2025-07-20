import { Injectable, Inject } from '@nestjs/common';
import { JournalEntry, JournalEntryStatus } from '@chosim/types';
import { IGetJournalEntriesUseCase, IGetJournalEntryByIdUseCase } from '../interfaces/get-journal-entries-use-case.interface';
import { IJournalEntryRepository } from '../interfaces/journal-entry-repository.interface';

@Injectable()
export class GetJournalEntriesUseCase implements IGetJournalEntriesUseCase {
  constructor(
    @Inject('IJournalEntryRepository')
    private readonly journalEntryRepository: IJournalEntryRepository
  ) {}

  async execute(status?: JournalEntryStatus): Promise<JournalEntry[]> {
    return this.journalEntryRepository.findAll(status);
  }
}

@Injectable()
export class GetJournalEntryByIdUseCase implements IGetJournalEntryByIdUseCase {
  constructor(
    @Inject('IJournalEntryRepository')
    private readonly journalEntryRepository: IJournalEntryRepository
  ) {}

  async execute(id: string): Promise<JournalEntry | null> {
    return this.journalEntryRepository.findById(id);
  }
}