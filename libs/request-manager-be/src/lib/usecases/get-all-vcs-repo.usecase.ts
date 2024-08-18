import { Injectable } from "@nestjs/common";
import { VCSRepository } from "../entities/vcs-repository";
import { VscRepositoryDataStore } from "../repository/vsc.repository";

@Injectable()
export class GetAllVCSRepoUsecase {

    constructor(
        private readonly vcsRepoDataStore: VscRepositoryDataStore
    ) {}

    async execute(): Promise<VCSRepository[]> {
        return this.vcsRepoDataStore.findAll({});
    }
}