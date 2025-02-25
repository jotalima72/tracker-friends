import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, IsDate, IsEmpty } from "class-validator";

export class CreateTaskExecutionDto {
  @ApiProperty({
    type: String,
    description: 'ID da tarefa',
    example: 'task_id',
  })
  @IsString()
  @IsNotEmpty()
  taskId: string;
  @ApiProperty({
    type: Date,
    description: 'Data da semana da execução',
    example: '2025-02-19',
    required: false
  })
  @Transform(({ value }) => value ? new Date(value) : null)
  @IsDate()
  week?: Date;

  @ApiProperty({
    type: Boolean,
    description: 'Indica se a tarefa foi concluída',
    example: true,
    required: false
  })
  completed?: boolean;
}
