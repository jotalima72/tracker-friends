import { Inject, Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { Repository } from 'typeorm';
import { Score } from './entities/score.entity';
import { TaskService } from 'src/task/task.service';
import { ScoreQnt } from './dto/score.enum';
import { getLastSunday } from 'src/utils/getLastSunday';
import { Task } from 'src/task/entities/task.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ScoreService {
  constructor(
    @Inject('SCORE_REPOSITORY') private scoreRepository: Repository<Score>,
    private readonly taskService: TaskService,
    private readonly userService: UsersService
  ) { }

  async create(createScoreDto: CreateScoreDto) {
    const week = getLastSunday(createScoreDto.week)
    const [tasks, user] = await Promise.all([this.taskService.findAllByUserId(createScoreDto.userId), await this.userService.findOne(createScoreDto.userId)]);
    const scoreExists = await this.scoreRepository.findOneBy({ user: { id: user.id }, week });
    if (scoreExists) {
      await this.deleteUserScore(user.id, week);
    }
    const score = this.scoreRepository.create({
      week: getLastSunday(createScoreDto.week),
      score: ScoreQnt.ZERO
    });
    let executionsNumber = this.calculateExecutionsInAWeek(tasks, week);
    score.score = this.checkExecutions(executionsNumber, tasks.length);
    score.user = user;
    return await this.scoreRepository.save(score);
  }

  private checkExecutions(executionsNumber: number, tasksQuantity: number) {

    let score: ScoreQnt;
    if (executionsNumber == tasksQuantity) {
      score = ScoreQnt.COMPLETED;
    } else if (executionsNumber > 0) {
      score = ScoreQnt.PARTIAL;
    }
    return score;
  }

  private calculateExecutionsInAWeek(tasks: Task[], week: Date) {
    let executionsNumber = 0;
    tasks.filter(task => {
      let execution = task.executions.find(
        execution => {
          execution.week = new Date(execution.week);
          if (execution.week.getUTCFullYear() === week.getFullYear() &&
            execution.week.getUTCMonth() === week.getMonth() &&
            execution.week.getUTCDate() === week.getDate()) {
            return execution;
          }
        }
      );
      if (execution && execution.completed) {
        executionsNumber++;
      }
    });
    return executionsNumber;
  }

  async getUserScore(userId: string) {
    const user = await this.userService.findOne(userId);
    const scores = await this.scoreRepository.find({
      where: {
        user: {
          id: user.id
        }
      }
    });
    const score = scores.reduce((acc, curr) => acc + curr.score, 0);
    return {
      user: {
        id: user.id,
        name: user.name
      },
      score: score,
      log: scores.map(score => {
        return {
          week: score.week,
          score: score.score
        }
      })
    };
  }

  async getUserScoreByWeek(userId: string, week: Date) {
    const user = await this.userService.findOne(userId);
    return await this.scoreRepository.findBy({ user: { id: user.id }, week: getLastSunday(week) });
  }

  async deleteUserScore(userId: string, week: Date) {
    const score = await this.scoreRepository.findOneBy({ user: { id: userId }, week: getLastSunday(week) });
    return await this.scoreRepository.delete(score.id)
  }

  async getLeaderboard(competitionId: string) {
    throw new Error('Method not implemented.');
  }
}
