import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpStatus, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JournalEntry, JournalEntryStatus } from '@chosim/types';
import { CreateJournalEntryDto, UpdateJournalEntryDto } from '@chosim/types';
import { ICreateJournalEntryUseCase } from '../interfaces/create-journal-entry-use-case.interface';
import { IGetJournalEntriesUseCase, IGetJournalEntryByIdUseCase } from '../interfaces/get-journal-entries-use-case.interface';

@ApiTags('journal-entries')
@Controller('journal-entries')
export class JournalEntryController {
  constructor(
    private readonly createJournalEntryUseCase: ICreateJournalEntryUseCase,
    private readonly getJournalEntriesUseCase: IGetJournalEntriesUseCase,
    private readonly getJournalEntryByIdUseCase: IGetJournalEntryByIdUseCase,
  ) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new journal entry',
    description: 'Creates a new journal entry that will be locked for the specified period. The entry represents the user\'s reflection on their original intention.'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Journal entry created successfully',
    type: 'JournalEntry',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async create(@Body() dto: CreateJournalEntryDto): Promise<JournalEntry> {
    return this.createJournalEntryUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all journal entries',
    description: 'Retrieves all journal entries, optionally filtered by status (locked/unlocked)'
  })
  @ApiQuery({
    name: 'status',
    enum: JournalEntryStatus,
    required: false,
    description: 'Filter entries by status'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of journal entries',
    type: '[JournalEntry]',
  })
  async findAll(@Query('status') status?: JournalEntryStatus): Promise<JournalEntry[]> {
    return this.getJournalEntriesUseCase.execute(status);
  }

  @Get('unlocked')
  @ApiOperation({
    summary: 'Get unlocked journal entries',
    description: 'Retrieves only the journal entries that have passed their lock period and are now viewable'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of unlocked journal entries',
    type: '[JournalEntry]',
  })
  async findUnlocked(): Promise<JournalEntry[]> {
    return this.getJournalEntriesUseCase.execute(JournalEntryStatus.UNLOCKED);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a journal entry by ID',
    description: 'Retrieves a specific journal entry. If the entry is locked and the lock period has passed, it will be automatically unlocked.'
  })
  @ApiParam({
    name: 'id',
    description: 'Journal entry ID',
    type: 'string'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Journal entry found',
    type: 'JournalEntry',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Journal entry not found',
  })
  async findOne(@Param('id') id: string): Promise<JournalEntry> {
    const entry = await this.getJournalEntryByIdUseCase.execute(id);
    if (!entry) {
      throw new NotFoundException(`Journal entry with ID ${id} not found`);
    }
    return entry;
  }
}