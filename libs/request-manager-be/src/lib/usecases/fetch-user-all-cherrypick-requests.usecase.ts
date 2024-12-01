import { Injectable, Logger } from "@nestjs/common";
import { CherrypickRequestWithCommits } from "../types";
import { InjectRepository } from "@nestjs/typeorm";
import { CherrypickRequestEntity } from "../entities/cherrypick-request.entity";
import { Repository } from "typeorm";


@Injectable()
export class FetchUserAllCherrpickRequestUsecase {

    private readonly logger = new Logger(FetchUserAllCherrpickRequestUsecase.name);

    constructor(
        @InjectRepository(CherrypickRequestEntity)
        private readonly cherrypickRequestRepo: Repository<CherrypickRequestEntity>
    ) {}

    async execute(createdBy: number): Promise<CherrypickRequestWithCommits[]> {
        const requestsWithCommits = await this.cherrypickRequestRepo
        .createQueryBuilder('request')
        .where('request.createdBy = :createdBy', {createdBy})
        .leftJoinAndSelect('request.commits', 'commit') // Join commits related to the request
        .leftJoinAndSelect('request.repository', 'repo') // Join commits related to the request
        .getMany();
        return requestsWithCommits;
    }
}