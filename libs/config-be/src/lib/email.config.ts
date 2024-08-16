import { registerAs } from '@nestjs/config';
import { ENV_VARIABLES } from './env.validator';

export const emailconfig = registerAs('email', () => ({
  USER: ENV_VARIABLES.EMAIL_AUTH_USER,
  PASS: ENV_VARIABLES.EMAIL_AUTH_PASS,
}));