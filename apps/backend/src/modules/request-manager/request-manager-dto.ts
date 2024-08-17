import { GitCommit } from "@cherrypicker/github-api";

export class CreateCherrypickRequestDTO {
    title: string;
    commits: GitCommit[]
    targetBranch: string;
    repoId: string;
    notesForApprover: string;
}

export class AddVCSRepoDTO {
    id: number;
    name: string;
}