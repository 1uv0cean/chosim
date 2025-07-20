import { IsNotEmpty, IsString, IsEnum, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum LockPeriod {
  THIRTY_DAYS = 30,
  ONE_HUNDRED_DAYS = 100,
  ONE_YEAR = 365,
}

export class CreateJournalEntryDto {
  @ApiProperty({
    description: 'The user\'s reflection on their original intention',
    example: 'When I started this job, I wanted to make a meaningful impact on people\'s lives...',
    minLength: 10,
    maxLength: 5000,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Entry must be at least 10 characters long' })
  @MaxLength(5000, { message: 'Entry cannot exceed 5000 characters' })
  content: string;

  @ApiProperty({
    description: 'How long the entry should remain locked (in days)',
    enum: LockPeriod,
    example: LockPeriod.THIRTY_DAYS,
  })
  @IsEnum(LockPeriod)
  lockPeriodDays: LockPeriod;

  @ApiProperty({
    description: 'Optional title for the entry',
    example: 'My original intention at work',
    required: false,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
  title?: string;
}

export class UpdateJournalEntryDto {
  @ApiProperty({
    description: 'Updated content for the journal entry',
    example: 'Updated reflection on my original intention...',
    required: false,
    minLength: 10,
    maxLength: 5000,
  })
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Entry must be at least 10 characters long' })
  @MaxLength(5000, { message: 'Entry cannot exceed 5000 characters' })
  content?: string;

  @ApiProperty({
    description: 'Updated title for the entry',
    example: 'Updated title',
    required: false,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
  title?: string;
}