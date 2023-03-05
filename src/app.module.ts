import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { PrismaService } from './prisma/prisma.service';
import { AppMiddleware } from './app.middleware';
import { AdminModule } from './admin/admin.module';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    AdminModule,
    RedisModule.forRoot({
      config: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      },
    }),
  ],
  controllers: [AppController, AdminController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    consumer
      .apply(AppMiddleware)
      .forRoutes(
        { path: '/me', method: RequestMethod.GET },
        { path: '/info', method: RequestMethod.GET },
      );
  }
}
