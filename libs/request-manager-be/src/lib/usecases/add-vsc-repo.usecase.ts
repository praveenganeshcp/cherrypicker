import { Injectable, Logger } from "@nestjs/common";
import { VCSRepositoryEntity } from "../entities/vcs-repository.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export interface AddVSCRepoUsecaseInput {
    id: number;
    name: string;
}

@Injectable()
export class AddVCSRepoUsecase {

    private readonly logger = new Logger(AddVCSRepoUsecase.name);

    constructor(
        @InjectRepository(VCSRepositoryEntity)
        private readonly vcsRepoDataStore: Repository<VCSRepositoryEntity>
    ) {}

    async execute(input: AddVSCRepoUsecaseInput): Promise<VCSRepositoryEntity> {
        this.logger.log(`Adding new repo named ${input.name}`);
        const repo: VCSRepositoryEntity = new VCSRepositoryEntity();
        repo.name = input.name;
        repo.repoId = input.id
        return this.vcsRepoDataStore.save(repo)
    }
}