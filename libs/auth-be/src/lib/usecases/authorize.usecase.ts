import { Injectable, Logger } from "@nestjs/common";
import { GithubService, GithubUser } from "@cherrypicker/github-api";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthorizeUsecase {

    private readonly logger = new Logger(AuthorizeUsecase.name);

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly githubService: GithubService
    ) {}

    async execute(exchangeCode: string): Promise<UserEntity> {
        this.logger.log(`Getting access token with exchange code`);
        const accessToken = await this.githubService.getAccessToken(exchangeCode);
        this.logger.log('Access token fetched and fetching user details');
        const githubUser = await this.githubService.getUser(accessToken);
        this.logger.log(`User: ${githubUser.name} found for access token`)
        const existingUser = await this.userRepository.findOneBy({subjectId: githubUser.id});
        if(existingUser === null) {
            this.logger.log(`Creating new account for id: ${githubUser.name}`)
            const newUser = await this.createNewUserAccount(githubUser, accessToken);
            return newUser;
        }
        this.logger.log(`Updating user details`);
        await this.updateUserDetails(githubUser, accessToken);
        const updatedUser = await this.userRepository.findOneBy({subjectId: githubUser.id}) as UserEntity;
        return updatedUser;
    }

    private async createNewUserAccount(githubUser: GithubUser, accessToken: string) {
        const user = new UserEntity();
        user.name = githubUser.name;
        user.lastLoggedOn = new Date();
        user.subjectId = githubUser.id;
        user.accessToken = accessToken;
        user.avatarUrl = githubUser.avatar_url;
        user.createdOn = new Date();
        user.subjectLogin = githubUser.login;
        return this.userRepository.save(user);
    }

    private updateUserDetails(githubUser: GithubUser, accessToken: string) {
        return this.userRepository.update({subjectId: githubUser.id}, {
            name: githubUser.name,
            accessToken,
            avatarUrl: githubUser.avatar_url,
            lastLoggedOn: new Date(),
            subjectLogin: githubUser.login
        });
    }
}