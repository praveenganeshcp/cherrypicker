import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CherrypickRequestEntity } from "./cherrypick-request.entity";

@Entity()
export class VCSRepositoryEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => CherrypickRequestEntity, request => request.repository)  // Define the relation to CherrypickRequestEntity
    cherrypickRequests!: CherrypickRequestEntity[];  // Use CherrypickRequestEntity type here
}