import { ApiProperty } from '@nestjs/swagger';
import { CreateJournalEntryDto as BaseCreateDto, UpdateJournalEntryDto as BaseUpdateDto, LockPeriod } from '@chosim/types';

export class CreateJournalEntryDto extends BaseCreateDto {
  @ApiProperty({
    description: 'The user\'s reflection on their original intention',
    example: 'When I started this job, I wanted to make a meaningful impact on people\'s lives...',
    minLength: 10,
    maxLength: 5000,
  })
  declare content: string;

  @ApiProperty({
    description: 'How long the entry should remain locked (in days)',
    enum: LockPeriod,
    example: LockPeriod.THIRTY_DAYS,
  })
  declare lockPeriodDays: LockPeriod;

  @ApiProperty({
    description: 'Optional title for the entry',
    example: 'My original intention at work',
    required: false,
    maxLength: 100,
  })
  declare title?: string;
}

export class UpdateJournalEntryDto extends BaseUpdateDto {
  @ApiProperty({
    description: 'Updated content for the journal entry',
    example: 'Updated reflection on my original intention...',
    required: false,
    minLength: 10,
    maxLength: 5000,
  })
  declare content?: string;

  @ApiProperty({
    description: 'Updated title for the entry',
    example: 'Updated title',
    required: false,
    maxLength: 100,
  })
  declare title?: string;
}