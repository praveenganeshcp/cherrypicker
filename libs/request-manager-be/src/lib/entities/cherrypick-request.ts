import { ObjectId } from "mongodb";
import { CherrypickStatus } from "@cherrypicker/request-manager-core";

export interface CherrypickRequest {
    _id: ObjectId;
    title: string;
    createdOn: Date;
    createdBy: number;
    status: CherrypickStatus;
    targetBranch: string;
    completedOn: Date | null;
    repoId: ObjectId;
    notesForApprover: string
}