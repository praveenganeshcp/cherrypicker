import { Inject, Injectable, Logger } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import SMTPTransport = require('nodemailer/lib/smtp-transport');

export const EMAIL_TRANSPORT = 'EMAIL_TRANSPORT';

interface SendEmailPayload {
  toEmailId: string;
  subject: string;
  username: string;
  cta?: {
    label: string;
    link: string;
    copy: string
  };
  text: string;
  title: string;
}

@Injectable()
export class EmailNotificationService {
  @Inject(EMAIL_TRANSPORT)
  private emailTransport!: Transporter<SMTPTransport.SentMessageInfo>;

  private logger = new Logger(EmailNotificationService.name);

  private draftEmailMessage(
    message: Omit<SendEmailPayload, 'toEmailId' | 'subject'>
  ): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cherrypickr</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="margin: 20px auto; background-color: #fff; border-radius: 8px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
      <tr>
        <td align="center" bgcolor="#f9f9f9" style="padding: 10px 0 10px 0;">
          <h1>Cherrypickr</h1>
        </td>
      </tr>
        <tr>
          <td style="padding: 40px;">
            <h2 style="color: #333;">${message.title}</h2>
            <p style="color: #555;">Dear ${message.username},</p>
            <p style="color: #555;">${message.text}</p>
            ${this.getCTAMessage(message.cta)}
          </td>
        </tr>
      </table>
    </body>
    </html>
    
      
  `;
  }

  private getCTAMessage(cta: SendEmailPayload['cta']): string {
    if(!cta) {
      return ''
    }
    return `
    <p style="color: #555;">${cta.copy}</p>
    <table border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="border-radius: 4px; background-color: #007bff;">
          <a href="${cta.link}" target="_blank" style="display: inline-block; padding: 12px 24px; color: #fff; text-decoration: none; border-radius: 4px;">
            ${cta.label}
          </a>
        </td>
      </tr>
    </table>
    `
  }

  public async notify(
    payload: SendEmailPayload
  ): Promise<SMTPTransport.SentMessageInfo> {
    this.logger.log(
      `Sending email to ${payload.toEmailId} with subject: ${payload.subject}`
    );
    const sendEmailResponse = await this.emailTransport.sendMail({
      to: payload.toEmailId,
      subject: payload.subject,
      html: this.draftEmailMessage({
        text: payload.text,
        username: payload.username,
        cta: payload.cta,
        title: payload.title
      }),
    });
    this.logger.log(`Email sent with code ${sendEmailResponse.response}`);
    return sendEmailResponse;
  }
}