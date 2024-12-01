import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VCSRepositoryEntity } from "../entities/vcs-repository.entity";
import { Repository } from "typeorm";

@Injectable()
export class GetAllVCSRepoUsecase {

    constructor(
        @InjectRepository(VCSRepositoryEntity)
        private readonly vcsRepoDataStore: Repository<VCSRepositoryEntity>
    ) {}

    async execute(): Promise<VCSRepositoryEntity[]> {
        return this.vcsRepoDataStore.find();
    }
}