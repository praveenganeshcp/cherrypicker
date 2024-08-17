import { Injectable } from "@nestjs/common";
import { Repository } from "@cherrypicker/repository";
import { User } from "../entities/user";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor() {
        super('users');
    }
}