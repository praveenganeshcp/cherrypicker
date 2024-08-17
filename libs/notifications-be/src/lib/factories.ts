import { emailconfig } from '@cherrypicker/config-be';
import { Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { createTransport } from 'nodemailer';

export function createEmailTransport(
  emailConfiguration: ConfigType<typeof emailconfig>
) {
  const logger = new Logger(createEmailTransport.name);
  const transport = createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: emailConfiguration.USER,
      pass: emailConfiguration.PASS,
    },
  });
  logger.log('email transport created');
  return transport;
}