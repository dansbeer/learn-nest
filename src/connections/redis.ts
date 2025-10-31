import { CacheModuleOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { AppConfig } from '../config/config';

export async function redisConfig(): Promise<CacheModuleOptions> {
  const { host, port, password, username } = AppConfig.redis;
  const safePassword = password ? encodeURIComponent(password) : undefined;

  const redisUrl = safePassword
    ? `redis://${username}:${safePassword}@${host}:${port}`
    : `redis://${host}:${port}`;

  const store = await redisStore({
    url: redisUrl, 
    host: host,
    port: port,
    password: password,
    username: username,
  });

  const client: any = (store as any)?.client;
  if (client) {
    client.on('connect', () =>
      console.log(`🔌 Connected to Redis ${host}:${port}`),
    );
    client.on('ready', () => console.log('✅ Redis client ready'));
    client.on('error', (err: any) =>
      console.error('❌ Redis error:', err.message),
    );
  }

  return { store };
}
