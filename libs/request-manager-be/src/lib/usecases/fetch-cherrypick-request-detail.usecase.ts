import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CherrypickRequestEntity } from "../entities/cherrypick-request.entity";
import { Repository } from "typeorm";

export interface FetchCherrypickRequestDetailUsecaseInput {
    id: number;
    createdBy: number;
}

@Injectable()
export class FetchCherrypickRequestDetailUsecase {

    private readonly logger = new Logger(FetchCherrypickRequestDetailUsecase.name);

    constructor(
        @InjectRepository(CherrypickRequestEntity)
        private readonly cherrypickRequestRepo: Repository<CherrypickRequestEntity>
    ) {}

    async execute(input: FetchCherrypickRequestDetailUsecaseInput) {
            const requestWithCommits = await this.cherrypickRequestRepo
            .createQueryBuilder('request')
            .leftJoinAndSelect('request.commits', 'commit') // Join commits related to the request
            .where('request.id = :requestId', { requestId: input.id })
            .where('request.createdBy = :createdBy', { createdBy: input.createdBy }) // Filter by requestId
            .getOne(); // Use getOne() to fetch a single result

        return requestWithCommits;
    }
}