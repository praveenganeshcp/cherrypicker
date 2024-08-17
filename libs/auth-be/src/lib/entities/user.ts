import { ObjectId } from "mongodb";

export interface User {
    _id: ObjectId | null;
    subjectId: number;
    name: string;
    avatarUrl: string;
    lastLoggedOn: Date;
    accessToken: string;
    createdOn: Date
    subjectLogin: string;
}