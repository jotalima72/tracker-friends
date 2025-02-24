import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { taskProvider } from './task.provider';
import { DatabaseProvider } from 'src/database/database';

@Module({
  controllers: [TaskController],
  providers: [TaskService, DatabaseProvider, taskProvider],
})
export class TaskModule { }
