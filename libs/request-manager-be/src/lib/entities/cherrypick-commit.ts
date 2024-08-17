import { ObjectId } from "mongodb";

export interface CherrypickCommit {
    _id: ObjectId;
    sha: string;
    url: string;
    message: string;
    commitedOn: Date;
    requestId: ObjectId;
}
