import { Injectable, Logger } from "@nestjs/common";
import { CherrypickRequestRepository } from "../repository/cherrypick-request.repository";
import { ObjectId } from "mongodb";
import { CherrypickStatus } from "@cherrypicker/request-manager-core";

export interface UpdateCherrypickRequestStatusUsecaseInput {
    requestId: ObjectId
    isSuccess: boolean;
}

@Injectable()
export class UpdateCherrypickRequestStatusUsecase {

    private readonly logger = new Logger(UpdateCherrypickRequestStatusUsecase.name)

    constructor(
        private readonly cherrypickRequestRepo: CherrypickRequestRepository
    ) {}

    async execute(input: UpdateCherrypickRequestStatusUsecaseInput) {
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
    }
}