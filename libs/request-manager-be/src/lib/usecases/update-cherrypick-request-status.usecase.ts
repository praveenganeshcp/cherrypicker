import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { CherrypickStatus } from "@cherrypicker/request-manager-core";
import { EmailNotificationService } from "@cherrypick/notifications-be";
import { InjectRepository } from "@nestjs/typeorm";
import { CherrypickRequestEntity } from "../entities/cherrypick-request.entity";
import { Repository } from "typeorm";

export interface UpdateCherrypickRequestStatusUsecaseInput {
  requestId: number;
  isSuccess: boolean;
}

@Injectable()
export class UpdateCherrypickRequestStatusUsecase {
  private readonly logger = new Logger(
    UpdateCherrypickRequestStatusUsecase.name
  );

  constructor(
    @InjectRepository(CherrypickRequestEntity)
    private readonly cherrypickRequestRepo: Repository<CherrypickRequestEntity>,
    private readonly emailNotificationService: EmailNotificationService
  ) {}

  async execute(input: UpdateCherrypickRequestStatusUsecaseInput) {
    const cherrypickRequest = await this.cherrypickRequestRepo.findOneBy({
      id: input.requestId,
    });
    if (cherrypickRequest === null) {
      throw new HttpException(
        "Cherrypick request not found",
        HttpStatus.NOT_FOUND
      );
    }
    const status = input.isSuccess
      ? CherrypickStatus.Completed
      : CherrypickStatus.Conflict;
    this.logger.log(
      `updating cherrypick request ${input.requestId.toString()} with ${status} status`
    );
    await this.cherrypickRequestRepo.update(
      {
        id: input.requestId,
      },
      {
        status,
        completedOn: input.isSuccess ? new Date() : null,
      }
    );
    this.logger.log(`Request status updated`);
    this.logger.log("Sending email about status update");
    this.emailNotificationService.notify({
      title: `Status update: ${cherrypickRequest.title}`,
      subject: `[TESTING] Cherrypickr - Workflow run ${
        input.isSuccess ? "completed" : "failed"
      }`,
      text: input.isSuccess
        ? `Your cherrypick request is successfully processed`
        : `Your cherrypick request failed because of conflicts`,
      username: "user",
      toEmailId: "praveenganesh7@gmail.com",
    });
  }
}
