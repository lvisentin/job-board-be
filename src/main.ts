import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { PrismaNotFoundExceptionFilter } from './exception-filters/prisma-not-found.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((err) => ({
            field: err.property,
            error: Object.values(err.constraints).join(', '),
          })),
        );
      },
    }),
  );
  app.useGlobalFilters(new PrismaNotFoundExceptionFilter());
  await app.listen(3000);
}
bootstrap();
