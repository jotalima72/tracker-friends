import { postgresDataSource } from "src/data-source";

export const DatabaseProvider = {
  provide: 'DATABASE_PROVIDER',
  useFactory: async () => {
    const dataSource = postgresDataSource;
    await dataSource.initialize();
    console.log('Database connected successfully');
    return dataSource;
  },
};