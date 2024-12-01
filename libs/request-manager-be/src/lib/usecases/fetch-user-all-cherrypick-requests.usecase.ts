import { Injectable, Logger } from "@nestjs/common";
import { CherrypickRequestWithCommits } from "../types";
import { InjectRepository } from "@nestjs/typeorm";
import { CherrypickRequestEntity } from "../entities/cherrypick-request.entity";
import { Repository } from "typeorm";


@Injectable()
export class FetchUserAllCherrpickRequestUsecase {

    private readonly logger = new Logger(FetchUserAllCherrpickRequestUsecase.name);

    constructor(
        @InjectRepository(CherrypickRequestEntity)
        private readonly cherrypickRequestRepo: Repository<CherrypickRequestEntity>
    ) {}

    async execute(createdBy: number): Promise<CherrypickRequestWithCommits[]> {
        return []
        // this.logger.log(`fetching user ${createdBy} all cherrypick requests`);
        // return this.cherrypickRequestRepo.aggregate([
        //     { $match: { createdBy } },
        //     {
        //         $lookup: {
        //             from: "cherrypick_commits",
        //             localField: "_id",
        //             foreignField: "requestId",
        //             as: "commits"
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "vcs_repositories",
        //             localField: "repoId",
        //             foreignField: "_id",
        //             as: "repo"
        //         }
        //     },
        //     { $sort: { "createdOn": -1 } }
        // ])
    }
}