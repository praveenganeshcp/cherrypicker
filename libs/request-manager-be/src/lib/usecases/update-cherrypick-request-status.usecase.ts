import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { CherrypickRequestRepository } from "../repository/cherrypick-request.repository";
import { ObjectId } from "mongodb";
import { CherrypickStatus } from "@cherrypicker/request-manager-core";
import { EmailNotificationService } from "@cherrypick/notifications-be";

export interface UpdateCherrypickRequestStatusUsecaseInput {
    requestId: ObjectId
    isSuccess: boolean;
}

@Injectable()
export class UpdateCherrypickRequestStatusUsecase {

    private readonly logger = new Logger(UpdateCherrypickRequestStatusUsecase.name)

    constructor(
        private readonly cherrypickRequestRepo: CherrypickRequestRepository,
        private readonly emailNotificationService: EmailNotificationService
    ) {}

    async execute(input: UpdateCherrypickRequestStatusUsecaseInput) {
        const cherrypickRequest = await this.cherrypickRequestRepo.findOne({_id: input.requestId})
        if(cherrypickRequest === null) {
            throw new HttpException('Cherrypick request not found', HttpStatus.NOT_FOUND);
        }
        const status = input.isSuccess ? CherrypickStatus.Completed : CherrypickStatus.Conflict
        this.logger.log(`updating cherrypick request ${input.requestId.toString()} with ${status} status`);
        this.cherrypickRequestRepo.updateOne({
            _id: input.requestId
        }, {
            $set: {
                status,
                completedOn: input.isSuccess ? new Date() : null
            }
        })
        this.logger.log(`Request status updated`);
        this.logger.log('Sending email about status update')
        this.emailNotificationService.notify({
            title: `Status update: ${cherrypickRequest.title}`,
            subject: `[TESTING] Cherrypickr - Workflow run ${input.isSuccess ? 'completed' : 'failed'}`,
            text: input.isSuccess ? `Your cherrypick request is successfully processed` : `Your cherrypick request failed because of conflicts`,
            username: 'user',
            toEmailId: 'praveenganesh7@gmail.com'
        })
    }
}