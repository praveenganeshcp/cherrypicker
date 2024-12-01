import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VCSRepositoryEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    repoId!: number;
}