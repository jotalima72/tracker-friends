import { Task } from "src/task/entities/task.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TaskExecution {
  constructor(partial: Partial<TaskExecution>) {
    Object.assign(this, partial);
  }

  @ManyToOne(() => Task, { onDelete: 'CASCADE' })
  task: Task;

  @Column({ type: 'date' })
  week: Date; // Representa o início da semana

  @Column({ default: false })
  completed: boolean;

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn({ type: 'timestamptz' })
  createdDate: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedDate: Date;
}
