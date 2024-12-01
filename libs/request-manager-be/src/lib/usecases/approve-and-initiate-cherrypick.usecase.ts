import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { CherrypickStatus } from "@cherrypicker/request-manager-core";
import { GithubService } from "@cherrypicker/github-api";
import { InjectRepository } from "@nestjs/typeorm";
import { CherrypickCommitEntity } from "../entities/cherrypick-commit.entity";
import { Repository } from "typeorm";
import { CherrypickRequestEntity } from "../entities/cherrypick-request.entity";

export interface ApproveAndInitiateCherrypickInput {
  createdBy: number;
  requestId: number;
  accessToken: string;
}

@Injectable()
export class ApproveAndInitiateCherrypickUsecase {
  private readonly logger = new Logger(
    ApproveAndInitiateCherrypickUsecase.name
  );

  constructor(
    @InjectRepository(CherrypickRequestEntity)
    private readonly cherrypickRequestRepo: Repository<CherrypickRequestEntity>,

    @InjectRepository(CherrypickCommitEntity)
    private readonly cherrypickCommitRepo: Repository<CherrypickCommitEntity>,
    private readonly githubService: GithubService
  ) {}

  async execute(input: ApproveAndInitiateCherrypickInput) {
    this.logger.log(
      `Approving cherrypick request ${input.requestId.toString()}`
    );
    const updateResult = await this.cherrypickRequestRepo.update(
      {
        id: input.requestId,
        createdBy: input.createdBy,
      },
      {
        status: CherrypickStatus.InProgress,
      }
    );
    this.logger.log(
      `cherrypick request ${input.requestId.toString()} approved`
    );
    this.logger.log(`Finding commits in request ${input.requestId.toString()}`);
    const commits = await this.cherrypickCommitRepo.findBy({
      requestId: input.requestId,
    });
    this.logger.log(`Found ${commits.length} commits in the request`);
    const cherrypickRequest = await this.cherrypickRequestRepo.findOneBy({
      createdBy: input.createdBy,
      id: input.requestId,
    });
    if (cherrypickRequest == null || commits.length === 0) {
      throw new HttpException(
        "Cherrypick request not found",
        HttpStatus.NOT_FOUND
      );
    }
    this.logger.log(`Initiating cherrypick workflow`);
    return this.githubService.triggerWorkflow(
      input.accessToken,
      commits.map((commit) => commit.sha),
      input.requestId.toString(),
      cherrypickRequest.targetBranch
    );
  }
}
