import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable global validation pipe to automatically validate incoming data against DTOs

  app.enableCors({
    origin: ['http://your-frontend-domain.com','http://localhost:3000'], // The origin of your deployed frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strips properties that do not have any decorators
    forbidNonWhitelisted: true,  // throws error on unknown props
    transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
  }));
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: http://localhost:3000`);
}
bootstrap();