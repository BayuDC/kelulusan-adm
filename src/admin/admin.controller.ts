import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileInterceptor,
  UploadedFile,
  MemoryStorageFile,
} from '@blazity/nest-file-fastify';
import { parse } from 'papaparse';
import { AppService } from '../app.service';
import { UpdateTimeDto } from './dto/update-time.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('admin')
export class AdminController {
  constructor(
    private appService: AppService,
    private prismaService: PrismaService,
  ) {}

  @Get()
  @Render('admin.hbs')
  index() {
    return {
      date: this.appService.getConfig().date,
    };
  }

  @Post('/when')
  @Redirect('/admin')
  updateDate(@Body() body: UpdateTimeDto) {
    this.appService.setConfig({ date: body.date });
  }

  @Post('/who')
  @UseInterceptors(FileInterceptor('file'))
  updateStudents(@UploadedFile() file: MemoryStorageFile) {
    const { data: students } = parse(file.buffer.toString('utf-8'));

    return { nice: 'Nice' };
  }
}
