import { CherrypickStatus } from "@cherrypicker/request-manager-core";

export interface CherrypickCommit {
    _id: string;
    sha: string;
    url: string;
    message: string;
    commitedOn: Date;
    requestId: string;
}

export interface GitCommit {
    sha: string;
    message: string;
    htmlUrl: string;
    timestamp: Date;
}

export interface CherrypickRequest {
    _id: string;
    title: string;
    createdOn: Date;
    createdBy: number;
    status: CherrypickStatus;
    targetBranch: string;
    completedOn: Date | null;
    repo: [{
        name: string;
    }];
    notesForApprover: string
    commits: CherrypickCommit[]
}

export interface VCSRepository {
    _id: string;
    name: string;
    id: number;
}

export interface CreateRequestPayload {
    title: string,
    commits: Array<GitCommit>,
    targetBranch: string,
    repoId: string
}