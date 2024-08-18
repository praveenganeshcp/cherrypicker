/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './modules/commons/exception-filter';
import { ConfigType } from '@nestjs/config';
import { appConfig } from '@cherrypicker/config-be';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const globalPrefix = 'api';

  const applicationConfig: ConfigType<typeof appConfig> = app.get(
    appConfig.KEY
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: [applicationConfig.FE_HOST_ADDRESS],
    credentials: true,
  })
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
