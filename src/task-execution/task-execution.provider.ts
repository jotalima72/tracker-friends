import { DataSource } from 'typeorm';
import { TaskExecution } from './entities/task-execution.entity';

export const taskExecutionProvider = {
  provide: 'EXECUTION_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(TaskExecution),
  inject: ['DATABASE_PROVIDER'],
};