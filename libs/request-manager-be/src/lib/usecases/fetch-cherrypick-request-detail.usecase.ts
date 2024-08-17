import { ObjectId } from "mongodb"
import { CherrypickRequestRepository } from "../repository/cherrypick-request.repository";
import { Injectable, Logger } from "@nestjs/common";

export interface FetchCherrypickRequestDetailUsecaseInput {
    id: ObjectId;
    createdBy: number;
}

@Injectable()
export class FetchCherrypickRequestDetailUsecase {

    private readonly logger = new Logger(FetchCherrypickRequestDetailUsecase.name);

    constructor(
        private readonly cherrypickRequestRepo: CherrypickRequestRepository
    ) {}

    async execute(input: FetchCherrypickRequestDetailUsecaseInput) {
        this.logger.log(`Fetching request details for ${input.id.toString()}`);
        return this.cherrypickRequestRepo.aggregate([
            { $match: { _id: input.id, createdBy: input.createdBy } },
            {
                $lookup: {
                    from: "cherrypick_commits",
                    localField: "_id",
                    foreignField: "requestId",
                    as: "commits"
                }
            }
        ])
    }
}