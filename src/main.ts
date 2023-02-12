import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import fastyfyMultipart from '@fastify/multipart';
import Handlebars from 'handlebars';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const hbs = Handlebars.create();
  hbs.registerHelper('inc', (value) => {
    return value + 1;
  });

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/',
  });
  app.setViewEngine({
    engine: {
      handlebars: hbs,
    },
    templates: join(__dirname, '..', 'views'),
  });
  app.useGlobalPipes(new ValidationPipe());
  app.register(fastyfyMultipart);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
