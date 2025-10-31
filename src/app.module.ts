import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatsController } from './controllers/cats.controller';
import { MongoDBConnection } from './connections/mongodb';
import { CatsService } from './services/cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './models/cats.model';
import { RedisService } from './connections/redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongoDBConnection,
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  ],
  controllers: [CatsController],
  providers: [CatsService, RedisService],
})
export class AppModule {
  constructor() {
    console.log('🚀 AppModule initialized');
  }
}
