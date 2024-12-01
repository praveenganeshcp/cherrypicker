import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CherrypickRequestEntity } from "../entities/cherrypick-request.entity";
import { Repository } from "typeorm";

export interface FetchCherrypickRequestDetailUsecaseInput {
    id: number;
    createdBy: number;
}

@Injectable()
export class FetchCherrypickRequestDetailUsecase {

    private readonly logger = new Logger(FetchCherrypickRequestDetailUsecase.name);

    constructor(
        @InjectRepository(CherrypickRequestEntity)
        private readonly cherrypickRequestRepo: Repository<CherrypickRequestEntity>
    ) {}

    async execute(input: FetchCherrypickRequestDetailUsecaseInput) {
        // this.logger.log(`Fetching request details for ${input.id.toString()}`);
        // return this.cherrypickRequestRepo.aggregate([
        //     { $match: { _id: input.id, createdBy: input.createdBy } },
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
        //     }
        // ])
    }
}