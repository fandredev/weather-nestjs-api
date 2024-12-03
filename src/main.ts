import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import SwaggerDocumentateRoutesBuilder from './documentation/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerBuilder = new SwaggerDocumentateRoutesBuilder();
  swaggerBuilder.build(app, 'api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.enableCors();
  }

  await app.listen(process.env.APP_PORT);
}
bootstrap();
