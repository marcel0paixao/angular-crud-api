import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaNotFoundExceptionFilter } from './exception-filters/prisma-not-found.exception-filters';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: 422
  }));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalFilters(new PrismaNotFoundExceptionFilter());
  app.enableShutdownHooks();
  if (process.env.APP_ENV !== 'production') {
    app.enableCors({
      allowedHeaders: '*',
      origin: '*',
      credentials: false,
    });
  } else {
    app.enableCors({
      origin: process.env.FE_URL,
      credentials: true,
    });
  }

  await app.listen(3000);
}
bootstrap();
