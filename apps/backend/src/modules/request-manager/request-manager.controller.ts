import { AuthUser, User } from "@cherrypicker/auth-be";
import { AddVCSRepoUsecase, ApproveAndInitiateCherrypickUsecase, CreateCherrypickRequestUsecase, FetchCherrypickRequestDetailUsecase, FetchCommitsInRepoUsecase, FetchUserAllCherrpickRequestUsecase, UpdateCherrypickRequestStatusUsecase } from "@cherrypicker/request-manager-be";
import { Body, Controller, Get, Logger, Param, Patch, Post } from "@nestjs/common";
import { AddVCSRepoDTO, CreateCherrypickRequestDTO } from "./request-manager-dto";
import { ObjectId } from "mongodb";

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
        private readonly updateCherrypickStatusUsecase: UpdateCherrypickRequestStatusUsecase
    ) {}

    @Get('repo/:repoName/commits')
    fetchRepoCommits(@Param('repoName') repoName: string, @AuthUser() user: User) {
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
    createCherrypickRequest(@Body() createCherrypickRequestDTO: CreateCherrypickRequestDTO, @AuthUser() user: User) {
        return this.createCherrypickRequestUsecase.execute({
            title: createCherrypickRequestDTO.title,
            targetBranch: createCherrypickRequestDTO.targetBranch,
            repoId: new ObjectId(createCherrypickRequestDTO.repoId),
            commits: createCherrypickRequestDTO.commits,
            notesForApprover: createCherrypickRequestDTO.notesForApprover,
            createdBy: user.subjectId
        })
    }

    @Get('requests')
    fetchUserAllCherrypickRequests(@AuthUser() user: User) {
        return this.fetchUserAllCherrypickRequestUsecase.execute(user.subjectId);
    }

    @Patch('requests/:requestId/approve')
    approveAndInitiateCherrypick(@AuthUser() user: User, @Param('requestId') requestId: string) {
        return this.approveAndInitiateCherrypickUsecase.execute({
            requestId: new ObjectId(requestId),
            createdBy: user.subjectId,
            accessToken: user.accessToken
        })
    }

    @Get('requests/:id')
    fetchRequestDetails(@Param('id') requestId: string, @AuthUser() user: User) {
        return this.fetchCherrypickRequestDetailsUsecase.execute({
            id: new ObjectId(requestId),
            createdBy: user.subjectId
        })
    }

    @Patch('requests/:requestId/status')
    updateStatus(@Body('isSuccess') isSuccess: boolean, @Param('requestId') requestId: string) {
        return this.updateCherrypickStatusUsecase.execute({
            requestId: new ObjectId(requestId),
            isSuccess
        })
    }
}