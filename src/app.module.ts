import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatsController } from './controllers/cats.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [CatsController],
})
export class AppModule {}
