import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnvVariables } from './env.validator';
import { appConfig } from './app.config';
import { dbConfig } from './db.config';
import { emailconfig } from './email.config';
import { githubConfig } from './github.config';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvVariables,
      cache: false,
      load: [appConfig, dbConfig, emailconfig, githubConfig],
    })
  ]
})
export class ConfigBeModule {}