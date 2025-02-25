import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUniqueScoreKey1740487408262 implements MigrationInterface {
    name = 'CreateUniqueScoreKey1740487408262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "UQ_73958cf720b777db6869608262c" UNIQUE ("week", "userId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "UQ_73958cf720b777db6869608262c"`);
    }

}
