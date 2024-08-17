import { Injectable, Logger } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { User } from "../entities/user";
import { GithubService, GithubUser } from "@cherrypicker/github-api";

@Injectable()
export class AuthorizeUsecase {

    private readonly logger = new Logger(AuthorizeUsecase.name);

    constructor(
        private readonly userRepository: UserRepository,
        private readonly githubService: GithubService
    ) {}

    async execute(exchangeCode: string): Promise<User> {
        this.logger.log(`Getting access token with exchange code`);
        const accessToken = await this.githubService.getAccessToken(exchangeCode);
        this.logger.log('Access token fetched and fetching user details');
        const githubUser = await this.githubService.getUser(accessToken);
        this.logger.log(`User: ${githubUser.name} found for access token`)
        const existingUser = await this.userRepository.findOne({subjectId: githubUser.id});
        if(existingUser === null) {
            this.logger.log(`Creating new account for id: ${githubUser.name}`)
            const newUser = await this.createNewUserAccount(githubUser, accessToken);
            return newUser;
        }
        this.logger.log(`Updating user details`);
        await this.updateUserDetails(githubUser, accessToken);
        const updatedUser = await this.userRepository.findOne({subjectId: githubUser.id}) as User;
        return updatedUser;
    }

    private async createNewUserAccount(githubUser: GithubUser, accessToken: string) {
        const newUser: User = await this.userRepository.save({
            name: githubUser.name,
            lastLoggedOn: new Date(),
            subjectId: githubUser.id,
            accessToken,
            avatarUrl: githubUser.avatar_url,
            createdOn: new Date(),
            subjectLogin: githubUser.login
        })
        return newUser;
    }

    private updateUserDetails(githubUser: GithubUser, accessToken: string) {
        return this.userRepository.updateOne({subjectId: githubUser.id}, {
            $set: {
                name: githubUser.name,
                accessToken,
                avatarUrl: githubUser.avatar_url,
                lastLoggedOn: new Date(),
                subjectLogin: githubUser.login
            }
        })
    }
}