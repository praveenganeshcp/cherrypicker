import { ObjectId } from "mongodb";

export interface VCSRepository {
    _id: ObjectId;
    name: string;
    id: number;
}