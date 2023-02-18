import {
  Controller,
  Get,
  GoneException,
  ImATeapotException,
  NotFoundException,
  Query,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import moment from 'moment';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get('/')
  @Render('index.hbs')
  index() {
    return { message: 'Hello world!' };
  }

  @Get('/info')
  info() {
    const now = moment(new Date());
    const end = moment(this.appService.getConfig().date);
    const diff = moment.duration(end.diff(now));

    if (diff.milliseconds() < 0) {
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

  @Get('/me')
  async me(@Query() query: Record<string, string>) {
    const now = moment(new Date());
    const end = moment(this.appService.getConfig().date);
    const diff = moment.duration(end.diff(now));
    if (diff.milliseconds() > 0) {
      throw new ImATeapotException();
    }

    const nis: string = query.nis;
    if (!nis) {
      throw new NotFoundException();
    }

    const student = await this.prismaService.student.findFirst({
      where: { nis },
    });
    if (!student) {
      throw new NotFoundException();
    }

    return { student };
  }
}
