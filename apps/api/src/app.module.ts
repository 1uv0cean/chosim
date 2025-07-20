import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JournalEntryModule } from './modules/journal-entries/journal-entry.module';

@Module({
  imports: [JournalEntryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
