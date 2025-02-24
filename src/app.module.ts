import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { DatabaseProvider } from './database/database';
import { ConfigService } from './config/config.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [TaskModule, UserModule],
  controllers: [AppController],
  providers: [AppService, DatabaseProvider, ConfigService],
})
export class AppModule {}
