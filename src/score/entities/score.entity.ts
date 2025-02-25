import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, Unique, UpdateDateColumn } from "typeorm";
import { ScoreQnt } from "../dto/score.enum";
import { User } from "src/users/entities/user.entity";

@Entity()
// @Unique(['week', 'user'])
export class Score {
  constructor(partial: Partial<Score>) {
    Object.assign(this, partial);
  }
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'date' })
  week: Date; // Representa a semana da pontuação

  @Column({
    type: 'enum',
    name: 'scorePoints',
    enum: ScoreQnt,
    default: ScoreQnt.ZERO
  })
  score: ScoreQnt;

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn({ type: 'timestamptz' })
  createdDate: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedDate: Date;
}
