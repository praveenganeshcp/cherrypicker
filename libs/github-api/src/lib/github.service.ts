import { githubConfig } from "@cherrypicker/config-be";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import axios from "axios";
import { BEGithubCommit, GithubCommit, GithubUser } from "./types";

@Injectable()
export class GithubService {

    private readonly GITHUB_AUTH_HOST = "https://github.com";

    private readonly GITHUB_API_HOST = "https://api.github.com"

    private readonly logger = new Logger(GithubService.name);

    constructor(
        @Inject(githubConfig.KEY)
        private ghConfig: ConfigType<typeof githubConfig>,
    ) {}

    async getAccessToken(exchangeCode: string): Promise<string> {
        this.logger.log('Fetching access token...');
        const response = await axios.post<{access_token: string}>(`${this.GITHUB_AUTH_HOST}/login/oauth/access_token`, {
            client_id: this.ghConfig.CLIENT_ID,
            client_secret: this.ghConfig.CLIENT_SECRET,
            code: exchangeCode,
            redirect_uri: this.ghConfig.REDIRECT_URL
        }, {
            headers: {
                'Accept': 'application/json'
            }
        })
        this.logger.log('Access token fetched');
        return response.data.access_token;
    }

    async getUser(accessToken: string): Promise<GithubUser> {
        this.logger.log('Fetching authenticated user...')
        const response = await axios.get<GithubUser>(`${this.GITHUB_API_HOST}/user`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        })
        this.logger.log('Authenticated user details fetched');
        const githubUser = response.data;
        return {
            login: githubUser.login,
            avatar_url: githubUser.avatar_url,
            id: githubUser.id,
            name: githubUser.name
        };
    }

    async getCommits(repoName: string, loginName: string, accessToken: string): Promise<GithubCommit[]> {
        this.logger.log(`Fetching commits in ${loginName}/${repoName}`);
        const response = await axios.get<BEGithubCommit[]>(`${this.GITHUB_API_HOST}/repos/${loginName}/${repoName}/commits`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        const commits: GithubCommit[] = response.data.map(commit => {
            const githubCommit: GithubCommit = {
                sha: commit.sha,
                message: commit.commit.message,
                htmlUrl: commit.html_url
            }
            return githubCommit
        })
        this.logger.log(`Found ${commits.length} commits`)
        return commits;
    }
}