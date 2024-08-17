import { Injectable } from "@nestjs/common";
import { Repository } from "@cherrypicker/repository";
import { VCSRepository } from "../entities/vcs-repository";

@Injectable()
export class VscRepositoryDataStore extends Repository<VCSRepository> {
    constructor() {
        super('vcs_repositories')
    }
}