import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskTable1740373779922 implements MigrationInterface {
    name = 'CreateTaskTable1740373779922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" (
            "title" character varying NOT NULL, 
            "description" character varying NOT NULL, 
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")
            )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
