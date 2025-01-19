import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CherrypickRequestEntity } from "./cherrypick-request.entity";

@Entity()
export class CherrypickCommitEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sha!: string;

  @Column()
  url!: string;

  @Column()
  message!: string;

  @Column({ name: "commited_on" })
  commitedOn!: Date;

  @ManyToOne(() => CherrypickRequestEntity, (request) => request.commits)
  @JoinColumn({ name: "request_id" })
  request!: CherrypickRequestEntity;
}
