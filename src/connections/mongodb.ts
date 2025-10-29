import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const MongoDBConnection = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_URI'),
    dbName: configService.get<string>('MONGODB_DB'),
    connectionFactory: (connection) => {
      connection.on('connected', () =>
        console.log('✅ MongoDB connected successfully'),
      );
      connection.on('error', (err) =>
        console.error('❌ MongoDB connection error:', err),
      );
      return connection;
    },
  }),
});
