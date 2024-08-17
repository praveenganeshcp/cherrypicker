import { Injectable } from "@nestjs/common";
import { Repository } from "@cherrypicker/repository";
import { CherrypickRequest } from "../entities/cherrypick-request";

@Injectable()
export class CherrypickRequestRepository extends Repository<CherrypickRequest> {
    constructor() {
        super('cherrypick_requests')
    }
}