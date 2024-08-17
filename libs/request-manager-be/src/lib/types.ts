import { CherrypickCommit } from "./entities/cherrypick-commit";
import { CherrypickRequest } from "./entities/cherrypick-request";

export interface CherrypickRequestWithCommits extends CherrypickRequest {
    commits: CherrypickCommit[]
}