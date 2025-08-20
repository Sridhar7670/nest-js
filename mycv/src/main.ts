import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
      whitelist:true //not allwong extra props from client to server 
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
