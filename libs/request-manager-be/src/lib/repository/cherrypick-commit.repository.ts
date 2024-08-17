import { Injectable } from "@nestjs/common";
import { Repository } from "@cherrypicker/repository";
import { CherrypickCommit } from "../entities/cherrypick-commit";

@Injectable()
export class CherrypickCommitRepository extends Repository<CherrypickCommit> {
    constructor() {
        super('cherrypick_commits')
    }
}