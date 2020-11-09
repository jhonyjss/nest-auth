import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { QueryFailedErrorFilter } from './common/filters/query-exception.filter';

async function bootstrap() {
  const port = process.env.PORT_SERVER || 3004
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter(), new QueryFailedErrorFilter());
  app.setGlobalPrefix('api/v1');
  await app.listen(port);
}
bootstrap();
