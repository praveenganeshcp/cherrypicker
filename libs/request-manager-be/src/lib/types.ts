import { CherrypickCommitEntity } from "./entities/cherrypick-commit.entity";
import { CherrypickRequestEntity } from "./entities/cherrypick-request.entity";

export interface CherrypickRequestWithCommits extends CherrypickRequestEntity {
  commits: CherrypickCommitEntity[];
}
