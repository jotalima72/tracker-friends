import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const usersProvider = {
  provide: 'USER_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
  inject: ['DATABASE_PROVIDER'],
};