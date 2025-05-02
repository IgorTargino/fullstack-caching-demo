import { Module, Logger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cacheable } from 'cacheable';
import { createKeyv } from '@keyv/redis';
import { RedisService } from './redis.service';

@Injectable()
class CacheInstanceFactory {
  private readonly logger = new Logger('RedisModule');

  constructor(private readonly configService: ConfigService) {}

  async create() {
    const redisUrl = this.configService.get<string>('REDIS_URL');

    if (!redisUrl) {
      throw new Error('REDIS_URL is not configured');
    }

    const secondary = createKeyv(redisUrl);

    secondary.on('error', (err: Error) => this.logger.error(`Redis error: ${err.message}`));
    secondary.on('connect', () => this.logger.log('Redis connected'));
    secondary.on('ready', () => this.logger.log('Redis ready'));
    secondary.on('close', () => this.logger.log('Redis connection closed'));
    
    return new Cacheable({
      secondary,
      ttl: '4h',
    });
  }
}

@Module({
  providers: [
    {
      provide: 'CACHE_INSTANCE',
      useFactory: async (factory: CacheInstanceFactory) => await factory.create(),
      inject: [CacheInstanceFactory],
    },
    CacheInstanceFactory,
    RedisService,
  ],
  exports: ['CACHE_INSTANCE', RedisService],
})
export class RedisModule {}