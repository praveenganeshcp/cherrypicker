import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { CherrypickRequestRepository } from "../repository/cherrypick-request.repository";
import { ObjectId } from "mongodb";
import { CherrypickStatus } from "@cherrypicker/request-manager-core";
import { GithubService } from "@cherrypicker/github-api";
import { CherrypickCommitRepository } from "../repository/cherrypick-commit.repository";

export interface ApproveAndInitiateCherrypickInput {
    createdBy: number;
    requestId: ObjectId;
    accessToken: string;
}

@Injectable()
export class ApproveAndInitiateCherrypickUsecase {

    private readonly logger = new Logger(ApproveAndInitiateCherrypickUsecase.name);

    constructor(
        private readonly cherrypickRequestRepo: CherrypickRequestRepository,
        private readonly cherrypickCommitRepo: CherrypickCommitRepository,
        private readonly githubService: GithubService
    ) {}

    async execute(input: ApproveAndInitiateCherrypickInput) {
        this.logger.log(`Approving cherrypick request ${input.requestId.toString()}`)
        const updateResult = await this.cherrypickRequestRepo.updateOne({
            _id: input.requestId,
            createdBy: input.createdBy
        }, {
            $set: {
                status: CherrypickStatus.InProgress
            }
        })
        this.logger.log(`cherrypick request ${input.requestId.toString()} approved`)
        this.logger.log(`Finding commits in request ${input.requestId.toString()}`)
        const commits = await this.cherrypickCommitRepo.findAll({
            requestId: input.requestId
        })
        this.logger.log(`Found ${commits.length} commits in the request`);
        const cherrypickRequest = await this.cherrypickRequestRepo.findOne({
            createdBy: input.createdBy,
            _id: input.requestId
        })
        if(cherrypickRequest == null || commits.length === 0) {
            throw new HttpException('Cherrypick request not found', HttpStatus.NOT_FOUND);
        }
        this.logger.log(`Initiating cherrypick workflow`)
        return this.githubService.triggerWorkflow(input.accessToken, commits.map(commit => commit.sha), input.requestId.toString(), cherrypickRequest.targetBranch);
    }
}