import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskExecution } from 'src/task-execution/entities/task-execution.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Task {
  constructor(partial: Partial<CreateTaskDto>) {
    Object.assign(this, partial);
  }

  @Column()
  title: string;
  @Column()
  description: string;

  @OneToMany(() => TaskExecution, (taskExecution) => taskExecution.task)
  executions: TaskExecution[];

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: User;

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn({ type: 'timestamptz' })
  createdDate: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedDate: Date;
}
