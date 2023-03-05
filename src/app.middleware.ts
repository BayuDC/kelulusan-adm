import {
  Injectable,
  NestMiddleware,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { AppService } from './app.service';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  constructor(private readonly appService: AppService) {}

  async use(
    req: FastifyRequest['raw'],
    res: FastifyReply['raw'],
    next: () => void,
  ) {
    if (!(await this.appService.getDate())) {
      throw new ServiceUnavailableException();
    }

    next();
  }
}
