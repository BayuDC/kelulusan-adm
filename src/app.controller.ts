import { Controller, Get, GoneException, Render } from '@nestjs/common';
import { AppService } from './app.service';
import moment from 'moment';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index.hbs')
  index() {
    return { message: 'Hello world!' };
  }

  @Get('/info')
  info() {
    const now = moment(new Date());
    const end = moment(this.appService.getConfig().date);
    const diff = moment.duration(end.diff(now));

    if (diff.seconds() < 0) {
      throw new GoneException();
    }

    return {
      time: {
        day: diff.days(),
        hour: diff.hours(),
        minute: diff.minutes(),
        second: diff.seconds(),
      },
    };
  }
}
