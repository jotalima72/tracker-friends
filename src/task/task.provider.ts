import { DataSource } from 'typeorm';
import { Task } from './entities/task.entity';

export const taskProvider = {
  provide: 'TASK_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
  inject: ['DATABASE_PROVIDER'],
};