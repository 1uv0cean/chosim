import { JournalEntry, CreateJournalEntryDto, JournalEntryStatus } from '@chosim/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async createJournalEntry(dto: CreateJournalEntryDto): Promise<JournalEntry> {
    return this.request<JournalEntry>('/journal-entries', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  }

  async getJournalEntries(status?: JournalEntryStatus): Promise<JournalEntry[]> {
    const queryParam = status ? `?status=${status}` : '';
    return this.request<JournalEntry[]>(`/journal-entries${queryParam}`);
  }

  async getUnlockedEntries(): Promise<JournalEntry[]> {
    return this.request<JournalEntry[]>('/journal-entries/unlocked');
  }

  async getJournalEntry(id: string): Promise<JournalEntry> {
    return this.request<JournalEntry>(`/journal-entries/${id}`);
  }
}

export const apiClient = new ApiClient();