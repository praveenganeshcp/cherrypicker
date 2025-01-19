import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitVCSRepositoryTable1737289326860 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create `vcs_repository_entity` table
        await queryRunner.createTable(
          new Table({
            name: "vcs_repository_entity",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "name",
                type: "varchar",
                isNullable: false,
              },
            ],
          }),
          true
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop `vcs_repository_entity` table
        await queryRunner.dropTable("vcs_repository_entity");
      }
}
