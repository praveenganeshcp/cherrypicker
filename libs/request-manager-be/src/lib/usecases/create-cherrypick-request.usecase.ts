import { ObjectId } from "mongodb";
import { GitCommit } from "@cherrypicker/github-api";
import { CherrypickRequestRepository } from "../repository/cherrypick-request.repository";
import { CherrypickCommitRepository } from "../repository/cherrypick-commit.repository";
import { CherrypickRequest } from "../entities/cherrypick-request";
import { CherrypickStatus } from "@cherrypicker/request-manager-core";
import { CherrypickCommit } from "../entities/cherrypick-commit";
import { Injectable, Logger } from "@nestjs/common";

export interface CreateCherrypickRequestUsecaseInput {
    title: string;
    targetBranch: string;
    repoId: ObjectId;
    notesForApprover: string
    commits: GitCommit[];
    createdBy: number
}

@Injectable()
export class CreateCherrypickRequestUsecase {

    private readonly logger = new Logger(CreateCherrypickRequestUsecase.name);

    constructor(
        private readonly cherrypickRequestRepo: CherrypickRequestRepository,
        private readonly cherrypickCommitRepo: CherrypickCommitRepository,
    ) {}

    async execute(input: CreateCherrypickRequestUsecaseInput): Promise<void> {
        this.logger.log(`Creating new cherrypick request titled ${input.title} in repo ${input.repoId} with ${input.commits.length} commits`)
        const createdRequest: CherrypickRequest = await this.createRequest(input);
        this.logger.log(`New cherrypick request created ${createdRequest._id.toString()}`);
        this.logger.log('Saving commits related to requests')
        await this.saveRequestCommits(createdRequest, input.commits);
        this.logger.log('Commits saved successfully');
    }   

    private async createRequest(input: CreateCherrypickRequestUsecaseInput): Promise<CherrypickRequest> {
        const newCherrypickRequest: Omit<CherrypickRequest, "_id"> = {
            title: input.title,
            targetBranch: input.targetBranch,
            repoId: input.repoId,
            createdOn: new Date(),
            status: CherrypickStatus.WaitingForApproval,
            completedOn: null,
            createdBy: input.createdBy,
            notesForApprover: input.notesForApprover
        }
        return this.cherrypickRequestRepo.save(newCherrypickRequest);
    }

    private async saveRequestCommits(cherrypickRequest: CherrypickRequest, commits: CreateCherrypickRequestUsecaseInput['commits']) {
        const requestCommits: Omit<CherrypickCommit, "_id">[] = commits.map(commit => {
            const requestCommit: Omit<CherrypickCommit, "_id"> = {
                sha: commit.sha,
                message: commit.message,
                url: commit.htmlUrl,
                commitedOn: commit.timestamp,
                requestId: cherrypickRequest._id
            }
            return requestCommit;
        })
        return this.cherrypickCommitRepo.saveMany(requestCommits)
    }
}