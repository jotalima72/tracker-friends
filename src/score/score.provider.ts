import { DataSource } from 'typeorm';
import { Score } from './entities/score.entity';

export const scoreProvider = {
  provide: 'SCORE_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Score),
  inject: ['DATABASE_PROVIDER'],
};