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
import bcrypt from 'bcryptjs';

@Controller('admin')
export class AdminController {
  constructor(
    private appService: AppService,
    private prismaService: PrismaService,
  ) {}

  @Get()
  @Render('admin.hbs')
  async index() {
    return {
      date: await this.appService.getDate(),
      students: await this.prismaService.student.findMany(),
    };
  }

  @Post('/when')
  @Redirect('/admin')
  async updateDate(@Body() body: UpdateTimeDto) {
    await this.appService.setDate(body.date);
  }

  @Post('/who')
  @UseInterceptors(FileInterceptor('file'))
  @Redirect('/admin')
  async updateStudents(@UploadedFile() file: MemoryStorageFile) {
    const { data: students } = parse(file.buffer.toString('utf-8'), {});
    const transactions: any[] = [
      this.prismaService.student.deleteMany({ where: {} }),
    ];

    for (const student of students) {
      if ((student as any[]).length != 4) continue;
      transactions.push(
        this.prismaService.student.create({
          data: {
            nis: student[0],
            name: student[1],
            passwd: await bcrypt.hash(student[2], await bcrypt.genSalt()),
            graduate: student[3] == '1',
          },
        }),
      );
    }

    await this.prismaService.$transaction(transactions);
  }
}
