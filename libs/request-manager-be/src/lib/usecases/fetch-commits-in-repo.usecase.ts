import { GitCommit, GithubService } from "@cherrypicker/github-api";
import { Injectable, Logger } from "@nestjs/common";

export interface FetchCommitsInRepoUsecaseInput {
    ghLogin: string;
    repoName: string;
    accessToken: string;
}

@Injectable()
export class FetchCommitsInRepoUsecase {

    private readonly logger = new Logger(FetchCommitsInRepoUsecase.name);

    constructor(
        private readonly githubService: GithubService
    ) {}

    async execute(input: FetchCommitsInRepoUsecaseInput): Promise<GitCommit[]> {
        this.logger.log(`Fetching commits in ${input.ghLogin}/${input.repoName} repo`);
        return this.githubService.getCommits(input.repoName, input.ghLogin, input.accessToken);
    }
}