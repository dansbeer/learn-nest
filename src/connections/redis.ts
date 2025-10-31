import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { RedisOptions } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redis: Redis;
  private readonly logger = new Logger(RedisService.name);

  constructor(private readonly configService: ConfigService) {
    const redisHost = this.configService.get<string>('REDIS_HOST', 'localhost');
    const redisPort = this.configService.get<number>('REDIS_PORT', 6379);
    const redisPassword = this.configService.get<string>('REDIS_PASSWORD', '');
    const redisDb = this.configService.get<number>('REDIS_DB', 3); // default db 3

    const redisOptions: RedisOptions = {
      host: redisHost,
      port: redisPort,
      db: redisDb,
      retryStrategy: (times) => Math.min(times * 50, 2000),
    };

    if (redisPassword) {
      redisOptions.password = redisPassword;
    }

    this.redis = new Redis(redisOptions);

    this.redis.on('connect', () =>
      this.logger.log(`✅ Connected to Redis db ${redisDb}`),
    );
    this.redis.on('ready', () => this.logger.log('Redis client ready'));
    this.redis.on('error', (err) =>
      this.logger.error(`❌ Redis error: ${err.message}`),
    );
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.redis.get(key);
    } catch (err) {
      this.logger.error(`Redis get error for key ${key}: ${err.message}`);
      return null;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      const data = typeof value === 'string' ? value : JSON.stringify(value);
      if (ttl) {
        await this.redis.set(key, data, 'EX', ttl);
      } else {
        await this.redis.set(key, data);
      }
    } catch (err) {
      this.logger.error(`Redis set error for key ${key}: ${err.message}`);
    }
  }
}
