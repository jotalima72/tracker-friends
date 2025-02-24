import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  calculateScore(@Body() createScoreDto: CreateScoreDto) {
    return this.scoreService.create(createScoreDto);
  }

  @Get('/user/:userId')
  getUserScore(@Param('userId') userId: string) {
    return this.scoreService.getUserScore(userId);
  }

  @Get('/user/:userId/week/:week')
  getUserScoreByWeek(@Param('userId') userId: string, @Param('week') week: string) {
    return this.scoreService.getUserScoreByWeek(userId, new Date(week));
  }

  @Get('/leaderboard/:competitionId')
  getLeaderboard(@Param('competitionId') competitionId: string) {
    return this.scoreService.getLeaderboard(competitionId);
  }

  @Delete('/user/:userId/week/:week')
  deleteUserScore(@Param('userId') userId: string, @Param('week') week: string) {
    return this.scoreService.deleteUserScore(userId, new Date(week));
  }
}
