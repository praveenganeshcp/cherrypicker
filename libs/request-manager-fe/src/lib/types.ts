import { CherrypickStatus } from "@cherrypicker/request-manager-core";

export interface CherrypickCommit {
    id: number;
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
    id: number;
    title: string;
    createdOn: Date;
    createdBy: number;
    status: CherrypickStatus;
    targetBranch: string;
    completedOn: Date | null;
    repository: VCSRepository;
    notesForApprover: string
    commits: CherrypickCommit[]
}

export interface VCSRepository {
    name: string;
    id: number;
}

export interface CreateRequestPayload {
    title: string,
    commits: Array<GitCommit>,
    targetBranch: string,
    repoId: string
}