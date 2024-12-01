import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  subjectId!: number;

  @Column()
  name!: string;

  @Column()
  avatarUrl!: string;

  @Column()
  lastLoggedOn!: Date;

  @Column()
  accessToken!: string;

  @Column()
  createdOn!: Date;

  @Column()
  subjectLogin!: string;
}
