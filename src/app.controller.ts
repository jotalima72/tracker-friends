import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { getLastSunday } from './utils/getLastSunday';
import { Public } from './auth/providers/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('week')
  @Public()
  getWeek(): Date {
    return getLastSunday(new Date());
  }
}
