import { GitCommit } from "@cherrypicker/github-api";

export class CreateCherrypickRequestDTO {
    title: string;
    commits: GitCommit[]
    targetBranch: string;
    repoId: number;
    notesForApprover: string;
}

export class AddVCSRepoDTO {
    id: number;
    name: string;
}