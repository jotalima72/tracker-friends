import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskExecutionTable1740377398856 implements MigrationInterface {
    name = 'CreateTaskExecutionTable1740377398856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task_execution" (
            "week" date NOT NULL, 
            "completed" boolean NOT NULL DEFAULT false, 
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "taskId" uuid, 
            CONSTRAINT "PK_2861ae0a4930ab03ffbb789ba6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE 
            "task_execution" ADD CONSTRAINT "FK_b23be427e2ff820fccebdb8bc3e" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_execution" DROP CONSTRAINT "FK_b23be427e2ff820fccebdb8bc3e"`);
        await queryRunner.query(`DROP TABLE "task_execution"`);
    }

}
