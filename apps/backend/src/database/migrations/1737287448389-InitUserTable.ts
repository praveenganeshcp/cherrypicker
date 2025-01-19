import { MigrationInterface, QueryRunner } from "typeorm";

export class InitUserTable1737287448389 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE user_entity (
            id SERIAL PRIMARY KEY,
            subject_id INT NOT NULL,
            name VARCHAR NOT NULL,
            avatar_url VARCHAR NOT NULL,
            last_logged_on TIMESTAMP NOT NULL,
            access_token VARCHAR NOT NULL,
            created_on TIMESTAMP NOT NULL,
            subject_login VARCHAR NOT NULL
          );
        `);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          DROP TABLE IF EXISTS user_entity;
        `);
      }
}
