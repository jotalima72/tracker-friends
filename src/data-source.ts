import { DataSource } from 'typeorm';
import { ConfigService } from './config/config.service';


export const postgresDataSource = new DataSource({
  type: 'postgres',
  url: new ConfigService().get("postgresURL"),
  migrations: ['./dist/migrations/*.{ts,js}'],
  entities: ['./dist/**/entities/*.{ts,js}'],
  logging: true,
});