import { IsNotEmpty, IsString, IsEnum, IsOptional, MinLength, MaxLength } from 'class-validator';

export enum LockPeriod {
  THIRTY_DAYS = 30,
  ONE_HUNDRED_DAYS = 100,
  ONE_YEAR = 365,
}

export class CreateJournalEntryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Entry must be at least 10 characters long' })
  @MaxLength(5000, { message: 'Entry cannot exceed 5000 characters' })
  content: string;

  @IsEnum(LockPeriod)
  lockPeriodDays: LockPeriod;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
  title?: string;
}

export class UpdateJournalEntryDto {
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Entry must be at least 10 characters long' })
  @MaxLength(5000, { message: 'Entry cannot exceed 5000 characters' })
  content?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
  title?: string;
}