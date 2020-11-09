import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1599400775460 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "users",
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: "name",
          type: "varchar",
          length: "100",
        },
        {
          name: "password",
          type: "varchar",
        },
        {
          name: "email",
          type: "varchar",
          length: "200",
          isUnique: true
        },
        {
          name: "cpf",
          type: "varchar",
          length: "20",
          isUnique: true
        },
        {
          name: "google_token",
          type: "varchar",
          length: "75",
          isNullable: true
        },
        {
          name: "facebook_token",
          type: "varchar",
          length: "75",
          isNullable: true
        },
        {
          name: "github_token",
          type: "varchar",
          length: "75",
          isNullable: true
        },
        {
          name: "email_verified",
          type: "boolean",
          isNullable: true
        },
        {
          name: "active",
          type: "boolean",
          isNullable: true
        },
        {
          name: "updated_at",
          type: "timestamp",
          isNullable: true
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "CURRENT_TIMESTAMP",
        },
        {
          name: "deleted_at",
          type: "timestamp",
          isNullable: true
        }


      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
