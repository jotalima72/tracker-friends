import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";
import { ScoreQnt } from "./score.enum";

export class CreateScoreDto {
  // @ApiProperty({
  //   type: String,
  //   description: 'Id do usuário',
  //   example: 'User_id',
  // })
  // userId: string;

  @ApiProperty({
    type: Date,
    description: 'Data da semana da execução',
    example: '2025-02-19',
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  week: Date;
}
