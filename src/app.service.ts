import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class AppService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getDate(): Promise<string> {
    return await this.redis.get('date');
  }
  async setDate(date: string) {
    await this.redis.set('date', date);
  }
}
