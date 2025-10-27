import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Global prefix 
  app.setGlobalPrefix('api');

  // Global pipes, filters and interceptors
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Enable CORS
  app.enableCors();

  // Swagger setup
  if (configService.get<string>('NODE_ENV') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Learn NestJS API')
      .setDescription('Learn NestJS API Documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  const port = process.env.PORT || 3000

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api/docs`)

}
bootstrap();
