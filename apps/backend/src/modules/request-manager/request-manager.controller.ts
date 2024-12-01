import { AuthUser, UserEntity } from "@cherrypicker/auth-be";
import { AddVCSRepoUsecase, ApproveAndInitiateCherrypickUsecase, CreateCherrypickRequestUsecase, FetchCherrypickRequestDetailUsecase, FetchCommitsInRepoUsecase, FetchUserAllCherrpickRequestUsecase, GetAllVCSRepoUsecase, UpdateCherrypickRequestStatusUsecase } from "@cherrypicker/request-manager-be";
import { Body, Controller, Get, Logger, Param, Patch, Post } from "@nestjs/common";
import { AddVCSRepoDTO, CreateCherrypickRequestDTO } from "./request-manager-dto";

@Controller('requests-manager')
export class RequestManagerController {

    private readonly logger = new Logger(RequestManagerController.name);

    constructor(
        private readonly fetchCommitsInRepoUsecase: FetchCommitsInRepoUsecase,
        private readonly createCherrypickRequestUsecase: CreateCherrypickRequestUsecase,
        private readonly addVCSRepoUsecase: AddVCSRepoUsecase,
        private readonly fetchCherrypickRequestDetailsUsecase: FetchCherrypickRequestDetailUsecase,
        private readonly fetchUserAllCherrypickRequestUsecase: FetchUserAllCherrpickRequestUsecase,
        private readonly approveAndInitiateCherrypickUsecase: ApproveAndInitiateCherrypickUsecase,
        private readonly updateCherrypickStatusUsecase: UpdateCherrypickRequestStatusUsecase,
        private readonly getAllVcsRepoUsecase: GetAllVCSRepoUsecase
    ) {}

    @Get('repo/:repoName/commits')
    fetchRepoCommits(@Param('repoName') repoName: string, @AuthUser() user: UserEntity) {
        this.logger.log(`Fetching commits in ${user.subjectLogin}/${repoName} repo`);
        return this.fetchCommitsInRepoUsecase.execute({
            ghLogin: user.subjectLogin,
            accessToken: user.accessToken,
            repoName
        })
    }

    @Post('vcs-repo')
    addVcsRepo(@Body() addRepoDTO: AddVCSRepoDTO) {
        return this.addVCSRepoUsecase.execute({
            id: addRepoDTO.id,
            name: addRepoDTO.name
        })
    }

    @Post('requests')
    createCherrypickRequest(@Body() createCherrypickRequestDTO: CreateCherrypickRequestDTO, @AuthUser() user: UserEntity) {
        return this.createCherrypickRequestUsecase.execute({
            title: createCherrypickRequestDTO.title,
            targetBranch: createCherrypickRequestDTO.targetBranch,
            repoId: createCherrypickRequestDTO.repoId,
            commits: createCherrypickRequestDTO.commits,
            notesForApprover: createCherrypickRequestDTO.notesForApprover,
            createdBy: user
        })
    }

    @Get('requests')
    fetchUserAllCherrypickRequests(@AuthUser() user: UserEntity) {
        return this.fetchUserAllCherrypickRequestUsecase.execute(user.subjectId);
    }

    @Get('vcs-repo')
    fetchAllVcsRepo() {
        return this.getAllVcsRepoUsecase.execute();
    }

    @Patch('requests/:requestId/approve')
    approveAndInitiateCherrypick(@AuthUser() user: UserEntity, @Param('requestId') requestId: string) {
        return this.approveAndInitiateCherrypickUsecase.execute({
            requestId: parseInt(requestId, 10),
            createdBy: user.subjectId,
            accessToken: user.accessToken
        })
    }

    @Get('requests/:id')
    fetchRequestDetails(@Param('id') requestId: string, @AuthUser() user: UserEntity) {
        return this.fetchCherrypickRequestDetailsUsecase.execute({
            id: parseInt(requestId, 10),
            createdBy: user.subjectId
        })
    }

    @Patch('requests/:requestId/status')
    updateStatus(@Body('isSuccess') isSuccess: boolean, @Param('requestId') requestId: string) {
        return this.updateCherrypickStatusUsecase.execute({
            requestId: parseInt(requestId, 10),
            isSuccess
        })
    }
}