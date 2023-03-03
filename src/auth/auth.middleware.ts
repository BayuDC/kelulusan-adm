import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import auth from 'basic-auth';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    const credentials: {
      name: string;
      pass: string;
    } = auth(req);

    if (!credentials) {
      res.setHeader('WWW-Authenticate', 'basic');
      res.statusCode = 401;
      res.end();
      return;
    }

    if (
      credentials.name != (process.env.ADMIN_USERNAME || 'admin') &&
      credentials.pass != (process.env.ADMIN_PASSWORD || 'admin')
    ) {
      res.statusCode = 401;
      res.end();
      return;
    }
    next();
  }
}
