import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AppController, AdminController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
