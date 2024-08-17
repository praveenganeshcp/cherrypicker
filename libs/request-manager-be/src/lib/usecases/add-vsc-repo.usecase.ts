import { Injectable, Logger } from "@nestjs/common";
import { VCSRepository } from "../entities/vcs-repository";
import { VscRepositoryDataStore } from "../repository/vsc.repository";

export interface AddVSCRepoUsecaseInput {
    id: number;
    name: string;
}

@Injectable()
export class AddVCSRepoUsecase {

    private readonly logger = new Logger(AddVCSRepoUsecase.name);

    constructor(
        private readonly vcsRepoDataStore: VscRepositoryDataStore
    ) {}

    async execute(input: AddVSCRepoUsecaseInput): Promise<VCSRepository> {
        this.logger.log(`Adding new repo named ${input.name}`);
        return this.vcsRepoDataStore.save({
            name: input.name,
            id: input.id
        })
    }
}