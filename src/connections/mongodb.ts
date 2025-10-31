import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig } from '../config/config';

export const MongoDBConnection = MongooseModule.forRootAsync({
  useFactory: async () => ({
    uri: AppConfig.mongoUri,
    dbName: AppConfig.mongoDb || undefined,
    connectionFactory: (connection) => {
      connection.on('connected', () => {
        console.log('✅ MongoDB connected successfully');
      });

      connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err);
      });

      connection.on('disconnected', () => {
        console.warn('⚠️ MongoDB disconnected');
      });

      return connection;
    },
  }),
});
