export declare enum LockPeriod {
    THIRTY_DAYS = 30,
    ONE_HUNDRED_DAYS = 100,
    ONE_YEAR = 365
}
export declare class CreateJournalEntryDto {
    content: string;
    lockPeriodDays: LockPeriod;
    title?: string;
}
export declare class UpdateJournalEntryDto {
    content?: string;
    title?: string;
}
