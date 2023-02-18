import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { PrismaService } from './prisma/prisma.service';
import { AppMiddleware } from './app.middleware';

@Module({
  imports: [],
  controllers: [AppController, AdminController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppMiddleware)
      .forRoutes(
        { path: '/me', method: RequestMethod.GET },
        { path: '/info', method: RequestMethod.GET },
      );
  }
}
