import { MigrationInterface, QueryRunner } from "typeorm";

export class InitRequestTable1737289703139 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {


      await queryRunner.query(`
        CREATE TYPE "cherrypick_status_enum" AS ENUM ('Waiting for Approval', 'InProgress', 'Completed', 'Conflict');
      `)

        await queryRunner.query(`
          CREATE TABLE "cherrypick_request_entity" (
          "id" SERIAL PRIMARY KEY,
          "title" VARCHAR NOT NULL,
          "created_on" TIMESTAMP NOT NULL,
          "created_by" INT NOT NULL,
          "status" "cherrypick_status_enum" NOT NULL,
          "target_branch" VARCHAR NOT NULL,
          "completed_on" TIMESTAMP,
          "repo_id" INT NOT NULL,
          "notes_for_approver" VARCHAR NOT NULL
          );
        `);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the CherrypickRequestEntity table
        await queryRunner.query(`
          DROP TABLE IF EXISTS "cherrypick_request_entity"
        `);

        await queryRunner.query(`
          DROP TYPE IF EXISTS "cherrypick_status_enum";
      `);
      }

   

}
