require('dotenv').config();
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.postgresURL = process.env.POSTGRES_CONNECTION_URL;
    this.envConfig.bcrypt_salt = process.env.BCRYPT_SALT;
    this.envConfig.jwt_secret = process.env.JWT_SECRET;
    this.envConfig.email_regex = process.env.EMAIL_REGEX; 
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
