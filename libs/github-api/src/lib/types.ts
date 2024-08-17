export interface GithubUser {
    id: number;
    login: string;
    avatar_url: string;
    name: string;
}

export interface BEGithubCommit {
    sha: string;
    commit: {
        message: string;
    }
    html_url: string;
}

/**
 * Commit domain model
 */
export interface GithubCommit {
    sha: string;
    message: string;
    htmlUrl: string;
}