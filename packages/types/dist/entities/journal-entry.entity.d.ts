export declare enum JournalEntryStatus {
    LOCKED = "locked",
    UNLOCKED = "unlocked"
}
export interface JournalEntry {
    id: string;
    content: string;
    title?: string;
    status: JournalEntryStatus;
    lockPeriodDays: number;
    createdAt: Date;
    updatedAt: Date;
    unlocksAt: Date;
    userId?: string;
}
