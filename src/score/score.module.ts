import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { DatabaseModule } from 'src/database/database.module';
import { scoreProvider } from './score.provider';
import { TaskModule } from 'src/task/task.module';

@Module({
  controllers: [ScoreController],
  providers: [ScoreService, scoreProvider],
  imports: [DatabaseModule, TaskModule],
})
export class ScoreModule {}
