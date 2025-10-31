import * as dotenv from 'dotenv';
dotenv.config(); // hanya dipanggil 1x saat aplikasi start

export const AppConfig = {
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test',
  mongoDb: process.env.MONGODB_DBNAME || 'test',

  // Redis
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME || 'default',
    db: process.env.REDIS_DB ? Number(process.env.REDIS_DB) : 0,
  },

  // Port API
  appPort: Number(process.env.PORT) || 3000,
};
