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

  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    if (!this.appService.getConfig().date) {
      throw new ServiceUnavailableException();
    }

    next();
  }
}
