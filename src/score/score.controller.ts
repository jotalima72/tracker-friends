import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Score')
@ApiBearerAuth()
@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) { }

  @ApiOperation({ summary: 'Criação de um novo score' })
  @Post()
  calculateScore(@Body() createScoreDto: CreateScoreDto) {
    return this.scoreService.create(createScoreDto);
  }

  @ApiOperation({ summary: 'Lista todos os scores de um usuário' })
  @Get('/user/:userId')
  getUserScore(@Param('userId') userId: string) {
    return this.scoreService.getUserScore(userId);
  }

  @ApiOperation({ summary: 'retorna o score de um usuário na semana' })
  @Get('/user/:userId/week/:week')
  getUserScoreByWeek(@Param('userId') userId: string, @Param('week') week: string) {
    return this.scoreService.getUserScoreByWeek(userId, new Date(week));
  }

  @ApiOperation({ summary: 'retorna o leaderboard de uma competição - inoperante' })
  @Get('/leaderboard/:competitionId')
  getLeaderboard() {
    return this.scoreService.getLeaderboard();
  }

  @ApiOperation({ summary: 'Deleta um score de um usuário' })
  @Delete('/user/:userId/week/:week')
  deleteUserScore(@Param('userId') userId: string, @Param('week') week: string) {
    return this.scoreService.deleteUserScore(userId, new Date(week));
  }
}
