import { CherrypickStatus } from "@cherrypicker/request-manager-core";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CherrypickCommitEntity } from "./cherrypick-commit.entity";

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

    @OneToMany(() => CherrypickCommitEntity, commit => commit.request)
    commits!: CherrypickCommitEntity[];
}