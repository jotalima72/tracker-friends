import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateScoreTable1740380031251 implements MigrationInterface {
    name = 'CreateScoreTable1740380031251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."score_scorepoints_enum" AS ENUM('3', '1', '0')`);
        await queryRunner.query(`CREATE TABLE "score" (
            "week" date NOT NULL, 
            "scorePoints" "public"."score_scorepoints_enum" NOT NULL DEFAULT '0', 
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            CONSTRAINT "PK_1770f42c61451103f5514134078" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "score"`);
        await queryRunner.query(`DROP TYPE "public"."score_scorepoints_enum"`);
    }

}
