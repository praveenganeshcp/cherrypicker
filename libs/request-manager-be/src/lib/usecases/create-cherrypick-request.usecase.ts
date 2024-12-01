import { GitCommit } from "@cherrypicker/github-api";
import { CherrypickRequestEntity } from "../entities/cherrypick-request.entity";
import { CherrypickStatus } from "@cherrypicker/request-manager-core";
import { CherrypickCommitEntity } from "../entities/cherrypick-commit.entity";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { EmailNotificationService } from "@cherrypick/notifications-be";
import { UserEntity } from "@cherrypicker/auth-be";
import { appConfig } from "@cherrypicker/config-be";
import { ConfigType } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export interface CreateCherrypickRequestUsecaseInput {
  title: string;
  targetBranch: string;
  repoId: number;
  notesForApprover: string;
  commits: GitCommit[];
  createdBy: UserEntity;
}

@Injectable()
export class CreateCherrypickRequestUsecase {
  private readonly logger = new Logger(CreateCherrypickRequestUsecase.name);

  constructor(
    @InjectRepository(CherrypickRequestEntity)
    private readonly cherrypickRequestRepo: Repository<CherrypickRequestEntity>,

    @InjectRepository(CherrypickCommitEntity)
    private readonly cherrypickCommitRepo: Repository<CherrypickCommitEntity>,
    private readonly emailNotificationService: EmailNotificationService,
    @Inject(appConfig.KEY)
    private appConfiguration: ConfigType<typeof appConfig>
  ) {}

  async execute(
    input: CreateCherrypickRequestUsecaseInput
  ): Promise<{ id: number }> {
    this.logger.log(
      `Creating new cherrypick request titled ${input.title} in repo ${input.repoId} with ${input.commits.length} commits`
    );
    const createdRequest: CherrypickRequestEntity = await this.createRequest(
      input
    );
    this.logger.log(
      `New cherrypick request created ${createdRequest.id.toString()}`
    );
    this.logger.log("Saving commits related to requests");
    await this.saveRequestCommits(createdRequest, input.commits);
    this.logger.log("Commits saved successfully");
    this.logger.log("Sending email for approval");
    this.emailNotificationService.notify({
      title: `Approval request for ${createdRequest.title}`,
      subject: "[TESTING] Cherrypickr - Approval request",
      text: `${input.createdBy.name} has requested approval to cherrypick commits`,
      cta: {
        label: "Approve",
        link: `${
          this.appConfiguration.FE_HOST_ADDRESS
        }/app/cherrypick-requests/${createdRequest.id.toString()}/approve`,
        copy: "Click the button below to approve the request",
      },
      username: "Approver",
      toEmailId: "praveenganesh7@gmail.com",
    });
    return { id: createdRequest.id };
  }

  private async createRequest(
    input: CreateCherrypickRequestUsecaseInput
  ): Promise<CherrypickRequestEntity> {
    const newCherrypickRequest = new CherrypickRequestEntity();

    newCherrypickRequest.title = input.title;
    newCherrypickRequest.targetBranch = input.targetBranch;
    newCherrypickRequest.repoId = input.repoId;
    newCherrypickRequest.createdOn = new Date();
    newCherrypickRequest.status = CherrypickStatus.WaitingForApproval;
    newCherrypickRequest.completedOn = null;
    newCherrypickRequest.createdBy = input.createdBy.subjectId;
    newCherrypickRequest.commits = [];
    newCherrypickRequest.notesForApprover = input.notesForApprover ?? "";

    return this.cherrypickRequestRepo.save(newCherrypickRequest);
  }

  private async saveRequestCommits(
    cherrypickRequest: CherrypickRequestEntity,
    commits: CreateCherrypickRequestUsecaseInput["commits"]
  ) {
    const requestCommits: Omit<CherrypickCommitEntity, "id">[] = commits.map(
      (commit) => {
        const requestCommit: Omit<CherrypickCommitEntity, "id"> = {
          sha: commit.sha,
          message: commit.message,
          url: commit.htmlUrl,
          commitedOn: commit.timestamp,
          requestId: cherrypickRequest.id,
          request: cherrypickRequest,
        };
        return requestCommit;
      }
    );
    return this.cherrypickCommitRepo.save(requestCommits);
  }
}
