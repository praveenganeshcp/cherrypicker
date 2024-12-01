import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
