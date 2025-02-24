import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ConfigService } from './config/config.service';
import { TaskExecutionModule } from './task-execution/task-execution.module';
import { DatabaseModule } from './database/database.module';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [TaskModule, TaskExecutionModule, DatabaseModule, ScoreModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
