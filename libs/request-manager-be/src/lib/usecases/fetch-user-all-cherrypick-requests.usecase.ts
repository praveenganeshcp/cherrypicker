import { Injectable, Logger } from "@nestjs/common";
import { CherrypickRequestRepository } from "../repository/cherrypick-request.repository";
import { CherrypickRequestWithCommits } from "../types";


@Injectable()
export class FetchUserAllCherrpickRequestUsecase {

    private readonly logger = new Logger(FetchUserAllCherrpickRequestUsecase.name);

    constructor(
        private readonly cherrypickRequestRepo: CherrypickRequestRepository
    ) {}

    async execute(createdBy: number): Promise<CherrypickRequestWithCommits[]> {
        this.logger.log(`fetching user ${createdBy} all cherrypick requests`);
        return this.cherrypickRequestRepo.aggregate([
            { $match: { createdBy } },
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