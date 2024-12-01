import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column()
    commitedOn!: Date;

    @Column()
    requestId!: number;

    @ManyToOne(() => CherrypickRequestEntity, request => request.commits)
    request!: CherrypickRequestEntity;
}
