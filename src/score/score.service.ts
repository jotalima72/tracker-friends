import { Inject, Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { Repository } from 'typeorm';
import { Score } from './entities/score.entity';
import { TaskService } from 'src/task/task.service';
import { ScoreQnt } from './dto/score.enum';
import { getLastSunday } from 'src/utils/getLastSunday';

@Injectable()
export class ScoreService {
  constructor(
    @Inject('SCORE_REPOSITORY') private scoreRepository: Repository<Score>,
    private readonly taskService: TaskService
  ) { }

  async create(createScoreDto: CreateScoreDto) {
    const tasks = await this.taskService.findAll();
    const week = getLastSunday(createScoreDto.week)
    let executionsNumber = 0;
    tasks.filter(task => {
      let execution = task.executions.find(
        execution => {
          execution.week = new Date(execution.week)
          if (
              execution.week.getUTCFullYear() === week.getFullYear() &&
              execution.week.getUTCMonth() === week.getMonth() &&
              execution.week.getUTCDate() === week.getDate()
            ) {
            return execution;
          }
        }
      );
      if (execution && execution.completed) {
        executionsNumber++
      }
    });
    const score = this.scoreRepository.create({
      week: getLastSunday(createScoreDto.week),
      score: ScoreQnt.ZERO
    });

    if (executionsNumber == tasks.length) {
      score.score = ScoreQnt.COMPLETED;
    } else if (executionsNumber > 0) {
      score.score = ScoreQnt.PARTIAL;
    }
    return await this.scoreRepository.save(score);
  }

  async getUserScore(userId: string) {
    const scores = await this.scoreRepository.find();
    const score = scores.reduce((acc, curr) => acc + curr.score, 0);
    return {
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
    return await this.scoreRepository.findBy({ week: getLastSunday(week) });
  }

  async deleteUserScore(userId: string, week: Date) {
    const score = await this.scoreRepository.findOneBy({ week: getLastSunday(week) });
    return await this.scoreRepository.delete(score.id)
  }

  async getLeaderboard(competitionId: string) {
    throw new Error('Method not implemented.');
  }
}
