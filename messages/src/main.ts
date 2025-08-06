import { NestFactory } from '@nestjs/core';
import { MessageModule } from './messages/message-module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(MessageModule);
  //Enable global validation pipe TEll NESTJS to validate incoming requests
  //and throw an error if the validation fails
  app.useGlobalPipes(
    new ValidationPipe()
  )
  await app.listen(process.env.PORT ?? 3000);
  console.log('NestJS Server started on port', process.env.PORT ?? 3000); 
}
bootstrap();
 