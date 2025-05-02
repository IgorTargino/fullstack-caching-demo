import { Injectable, Inject, Logger } from '@nestjs/common';
import { Cacheable } from 'cacheable';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name); 

  constructor(
    @Inject('CACHE_INSTANCE') private readonly cache: Cacheable,
  ) {}

  async get<T>(key: string): Promise<T | undefined> {
    try {
      const value = await this.cache.get<T>(key);

      if (value) {
        this.logger.debug(`Cache hit for key: ${key}`);
      } else {
        this.logger.debug(`Cache miss for key: ${key}`);
      }
      return value;
    } catch (error) {
      this.logger.error(`Failed to get cache for key: ${key}`, error.stack);
      return undefined;
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      await this.cache.set(key, value, ttl);
      this.logger.debug(`Cache set for key: ${key} with TTL: ${ttl || 'default'}`);
    } catch (error) {
      this.logger.error(`Failed to set cache for key: ${key}`, error.stack);
      return undefined;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.cache.delete(key);
      this.logger.debug(`Cache deleted for key: ${key}`);
    } catch (error) {
      this.logger.error(`Failed to delete cache for key: ${key}`, error.stack);
      return undefined;
    }
  }

  async reset(): Promise<void> {
    try {
      await this.cache.clear();
      this.logger.debug(`All cache cleared`);
    } catch (error) {
      this.logger.error(`Failed to clear cache`, error.stack);
      return undefined;
    }
  }
}