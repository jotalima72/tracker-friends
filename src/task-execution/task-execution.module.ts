import { Module } from '@nestjs/common';
import { TaskExecutionService } from './task-execution.service';
import { TaskExecutionController } from './task-execution.controller';
import { DatabaseProvider } from 'src/database/database.provider';
import { taskExecutionProvider } from './task-execution.provider';
import { TaskModule } from 'src/task/task.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [TaskExecutionController],
  providers: [TaskExecutionService, taskExecutionProvider],
  imports: [TaskModule, DatabaseModule],
})
export class TaskExecutionModule { }
