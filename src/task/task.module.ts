import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { taskProvider } from './task.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService,  taskProvider],
  exports: [TaskService],
  imports: [DatabaseModule, UsersModule]
})
export class TaskModule { }
