import { Expose } from "class-transformer";
import { Score } from "src/score/entities/score.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({
    select: false
  })
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => Score, (score) => score.user)
  scores: Score[];

  @Expose()
  get totalScore(): number {
    if (!this.scores || this.scores.length === 0) {
      return 0;
    }
    return this.scores.reduce((total, score) => total + score.score, 0);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn({ type: 'timestamptz' })
  createdDate: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedDate: Date;
}
