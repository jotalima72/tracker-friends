require('dotenv').config();
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.postgresURL = process.env.POSTGRES_CONNECTION_URL
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
