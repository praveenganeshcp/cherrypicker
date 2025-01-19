import { CherrypickStatus } from "@cherrypicker/request-manager-core";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CherrypickCommitEntity } from "./cherrypick-commit.entity";
import { VCSRepositoryEntity } from "./vcs-repository.entity";

@Entity()
export class CherrypickRequestEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ name: "created_on" })
  createdOn!: Date;

  @Column({ name: "created_by" })
  createdBy!: number;

  @Column({
    type: "enum",
    enum: CherrypickStatus,
    enumName: "cherrypick_status_enum"
  })
  status!: CherrypickStatus;

  @Column({ name: "target_branch" })
  targetBranch!: string;

  @Column({
    nullable: true,
    name: "completed_on"
  })
  completedOn!: Date | null;

  @ManyToOne(() => VCSRepositoryEntity, (repo) => repo.cherrypickRequests) // Define the relation to VCSRepositoryEntity
  @JoinColumn({ name: "repo_id" }) // Specify the column name that holds the repo ID
  repository!: VCSRepositoryEntity; // Use the VCSRepositoryEntity type here

  @Column({ name: "notes_for_approver" })
  notesForApprover!: string;

  @OneToMany(() => CherrypickCommitEntity, (commit) => commit.request)
  commits!: CherrypickCommitEntity[];
}
