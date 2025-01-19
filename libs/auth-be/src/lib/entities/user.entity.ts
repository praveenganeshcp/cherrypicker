import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "subject_id" })
  subjectId!: number;

  @Column()
  name!: string;

  @Column({ name: "avatar_url" })
  avatarUrl!: string;

  @Column({ name: "last_logged_on" })
  lastLoggedOn!: Date;

  @Column({ name: "access_token" })
  accessToken!: string;

  @Column({ name: "created_on" })
  createdOn!: Date;

  @Column({ name: "subject_login" })
  subjectLogin!: string;
}
