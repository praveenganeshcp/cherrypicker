import { Module } from "@nestjs/common";
import { FetchCommitsInRepoUsecase } from "./usecases/fetch-commits-in-repo.usecase";
import { GithubApiModule } from "@cherrypicker/github-api";
import { CreateCherrypickRequestUsecase } from "./usecases/create-cherrypick-request.usecase";
import { AddVCSRepoUsecase } from "./usecases/add-vsc-repo.usecase";
import { FetchCherrypickRequestDetailUsecase } from "./usecases/fetch-cherrypick-request-detail.usecase";
import { FetchUserAllCherrpickRequestUsecase } from "./usecases/fetch-user-all-cherrypick-requests.usecase";
import { ApproveAndInitiateCherrypickUsecase } from "./usecases/approve-and-initiate-cherrypick.usecase";
import { UpdateCherrypickRequestStatusUsecase } from "./usecases/update-cherrypick-request-status.usecase";
import { NotificationsBeModule } from "@cherrypick/notifications-be";
import { GetAllVCSRepoUsecase } from "./usecases/get-all-vcs-repo.usecase";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CherrypickCommitEntity } from "./entities/cherrypick-commit.entity";
import { CherrypickRequestEntity } from "./entities/cherrypick-request.entity";
import { VCSRepositoryEntity } from "./entities/vcs-repository.entity";
@Module({
  imports: [
    GithubApiModule,
    NotificationsBeModule,
    TypeOrmModule.forFeature([
      CherrypickCommitEntity,
      CherrypickRequestEntity,
      VCSRepositoryEntity,
    ]),
  ],
  providers: [
    FetchCommitsInRepoUsecase,
    CreateCherrypickRequestUsecase,
    AddVCSRepoUsecase,
    FetchCherrypickRequestDetailUsecase,
    FetchUserAllCherrpickRequestUsecase,
    ApproveAndInitiateCherrypickUsecase,
    UpdateCherrypickRequestStatusUsecase,
    GetAllVCSRepoUsecase,
  ],
  exports: [
    FetchCommitsInRepoUsecase,
    CreateCherrypickRequestUsecase,
    AddVCSRepoUsecase,
    FetchCherrypickRequestDetailUsecase,
    FetchUserAllCherrpickRequestUsecase,
    ApproveAndInitiateCherrypickUsecase,
    UpdateCherrypickRequestStatusUsecase,
    GetAllVCSRepoUsecase,
    TypeOrmModule,
  ],
})
export class RequestManagerBeModule {}
