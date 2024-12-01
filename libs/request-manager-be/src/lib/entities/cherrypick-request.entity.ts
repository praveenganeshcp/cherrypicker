import { CherrypickStatus } from "@cherrypicker/request-manager-core";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CherrypickCommitEntity } from "./cherrypick-commit.entity";
import { VCSRepositoryEntity } from "./vcs-repository.entity";

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

    @ManyToOne(() => VCSRepositoryEntity, repo => repo.cherrypickRequests)  // Define the relation to VCSRepositoryEntity
    @JoinColumn({ name: 'repoId' })  // Specify the column name that holds the repo ID
    repository!: VCSRepositoryEntity;  // Use the VCSRepositoryEntity type here

    @Column()
    notesForApprover!: string

    @OneToMany(() => CherrypickCommitEntity, commit => commit.request)
    commits!: CherrypickCommitEntity[];
}