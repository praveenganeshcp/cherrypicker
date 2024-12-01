import { CherrypickStatus } from "@cherrypicker/request-manager-core";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CherrypickRequestEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    createdOn!: Date;

    @Column()
    createdBy!: number;

    @Column({
        type: 'enum',
        enum: CherrypickStatus, 
    })
    status!: CherrypickStatus;

    @Column()
    targetBranch!: string;

    @Column({
        nullable: true
    })
    completedOn!: Date | null;

    @Column()
    repoId!: number;

    @Column()
    notesForApprover!: string
}