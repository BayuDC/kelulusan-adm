import {
  Get,
  Post,
  Body,
  Render,
  Controller,
  GoneException,
  ImATeapotException,
  NotFoundException,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { AppService } from './app.service';
import moment from 'moment';
import bcrypt from 'bcryptjs';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get('/info')
  info() {
    const now = moment(new Date());
    const end = moment(this.appService.getConfig().date);
    const diff = moment.duration(end.diff(now));

    if (diff.asMilliseconds() < 0) {
      throw new GoneException();
    }

    return {
      time: {
        day: Math.floor(diff.asDays()),
        hour: diff.hours(),
        minute: diff.minutes(),
        second: diff.seconds(),
      },
    };
  }

  @Post('/me')
  @HttpCode(200)
  async me(@Body() body: Record<string, string>) {
    const now = moment(new Date());
    const end = moment(this.appService.getConfig().date);
    const diff = moment.duration(end.diff(now));
    if (diff.asMilliseconds() > 0) {
      throw new ImATeapotException();
    }

    const nis: string = body.nis;
    const passwd: string = body.passwd || '';
    if (!nis) {
      throw new NotFoundException();
    }

    const student = await this.prismaService.student.findFirst({
      where: { nis },
    });
    if (!student) {
      throw new NotFoundException();
    }

    const verified = await bcrypt.compare(passwd, student.passwd);
    if (!verified) {
      throw new UnauthorizedException();
    }

    delete student.passwd;
    return { student };
  }
}
