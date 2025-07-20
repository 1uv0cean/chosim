import { Injectable } from '@nestjs/common';
import { JournalEntry, JournalEntryStatus } from '@chosim/types';
import { CreateJournalEntryDto } from '@chosim/types';
import { ICreateJournalEntryUseCase } from '../interfaces/create-journal-entry-use-case.interface';
import { IJournalEntryRepository } from '../interfaces/journal-entry-repository.interface';

@Injectable()
export class CreateJournalEntryUseCase implements ICreateJournalEntryUseCase {
  constructor(private readonly journalEntryRepository: IJournalEntryRepository) {}

  async execute(dto: CreateJournalEntryDto): Promise<JournalEntry> {
    return this.journalEntryRepository.create(dto);
  }
}