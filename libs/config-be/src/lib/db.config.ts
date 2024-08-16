import { registerAs } from '@nestjs/config';
import { ENV_VARIABLES } from './env.validator';

export const dbConfig = registerAs('database', () => ({
  DB_URL: ENV_VARIABLES.DB_URL,
  DB_NAME: ENV_VARIABLES.DB_NAME
}));