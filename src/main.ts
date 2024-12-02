import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import SwaggerDocumentateRoutesBuilder from './documentation/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerBuilder = new SwaggerDocumentateRoutesBuilder();
  swaggerBuilder.build(app, 'api');

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT);
}
bootstrap();
