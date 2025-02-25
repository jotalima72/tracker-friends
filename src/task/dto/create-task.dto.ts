import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
  @ApiProperty({
    type: String,
    description: 'Titulo da tarefa',
    example: 'titulo',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    description: 'Descrição da tarefa',
    example: 'descrição',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: String,
    description: 'ID do usuario',
    example: 'User_id',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
