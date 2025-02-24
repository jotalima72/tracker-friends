import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';

@Entity()
export class Task {
  constructor(partial: Partial<CreateTaskDto>) {
    Object.assign(this, partial);
  }
  
  @Column()
  title: string;
  @Column()
  description: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn({ type: 'timestamptz' })
  createdDate: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedDate: Date;
}
