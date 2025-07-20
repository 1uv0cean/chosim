import { Injectable } from '@nestjs/common';
import { JournalEntry, JournalEntryStatus, CreateJournalEntryDto, UpdateJournalEntryDto } from '@chosim/types';
import { IJournalEntryRepository } from '../interfaces/journal-entry-repository.interface';

@Injectable()
export class JournalEntryRepositoryService implements IJournalEntryRepository {
  private entries: JournalEntry[] = [];
  private currentId = 1;

  async create(dto: CreateJournalEntryDto): Promise<JournalEntry> {
    const now = new Date();
    const unlocksAt = new Date(now.getTime() + dto.lockPeriodDays * 24 * 60 * 60 * 1000);
    
    const entry: JournalEntry = {
      id: (this.currentId++).toString(),
      content: dto.content,
      title: dto.title,
      status: JournalEntryStatus.LOCKED,
      lockPeriodDays: dto.lockPeriodDays,
      createdAt: now,
      updatedAt: now,
      unlocksAt,
    };

    this.entries.push(entry);
    return entry;
  }

  async findById(id: string): Promise<JournalEntry | null> {
    const entry = this.entries.find(e => e.id === id);
    if (!entry) return null;

    if (entry.status === JournalEntryStatus.LOCKED && new Date() >= entry.unlocksAt) {
      entry.status = JournalEntryStatus.UNLOCKED;
      entry.updatedAt = new Date();
    }

    return entry;
  }

  async findAll(status?: JournalEntryStatus): Promise<JournalEntry[]> {
    this.updateUnlockedEntries();
    
    if (status) {
      return this.entries.filter(e => e.status === status);
    }
    
    return [...this.entries];
  }

  async update(id: string, dto: UpdateJournalEntryDto): Promise<JournalEntry | null> {
    const entry = await this.findById(id);
    if (!entry) return null;

    if (dto.content !== undefined) {
      entry.content = dto.content;
    }
    if (dto.title !== undefined) {
      entry.title = dto.title;
    }
    
    entry.updatedAt = new Date();
    return entry;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.entries.findIndex(e => e.id === id);
    if (index === -1) return false;
    
    this.entries.splice(index, 1);
    return true;
  }

  async findUnlockedEntries(): Promise<JournalEntry[]> {
    this.updateUnlockedEntries();
    return this.entries.filter(e => e.status === JournalEntryStatus.UNLOCKED);
  }

  async updateStatusToUnlocked(id: string): Promise<JournalEntry | null> {
    const entry = this.entries.find(e => e.id === id);
    if (!entry) return null;

    entry.status = JournalEntryStatus.UNLOCKED;
    entry.updatedAt = new Date();
    return entry;
  }

  private updateUnlockedEntries(): void {
    const now = new Date();
    this.entries.forEach(entry => {
      if (entry.status === JournalEntryStatus.LOCKED && now >= entry.unlocksAt) {
        entry.status = JournalEntryStatus.UNLOCKED;
        entry.updatedAt = now;
      }
    });
  }
}