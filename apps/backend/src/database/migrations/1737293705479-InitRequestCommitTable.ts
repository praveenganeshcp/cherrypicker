import { MigrationInterface, QueryRunner } from "typeorm";

export class InitRequestCommitTable1737293705479 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE cherrypick_commit_entity (
            id SERIAL PRIMARY KEY,
            sha VARCHAR NOT NULL,
            url VARCHAR NOT NULL,
            message VARCHAR NOT NULL,
            commited_on TIMESTAMP NOT NULL,
            request_id INT NOT NULL,
            CONSTRAINT FK_request FOREIGN KEY (request_id) REFERENCES cherrypick_request_entity(id) ON DELETE CASCADE
          );
        `);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          DROP TABLE IF EXISTS cherrypick_commit_entity;
        `);
      }
}
