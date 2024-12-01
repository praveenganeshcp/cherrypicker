import { Module } from "@nestjs/common";
import {
  EMAIL_TRANSPORT,
  EmailNotificationService,
} from "./services/email-notifcations.service";
import { createEmailTransport } from "./factories";
import { emailconfig } from "@cherrypicker/config-be";

@Module({
  controllers: [],
  providers: [
    {
      provide: EMAIL_TRANSPORT,
      useFactory: createEmailTransport,
      inject: [emailconfig.KEY],
    },
    EmailNotificationService,
  ],
  exports: [EmailNotificationService],
})
export class NotificationsBeModule {}
