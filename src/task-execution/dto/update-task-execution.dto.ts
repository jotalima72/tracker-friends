import { ApiProperty, } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateTaskExecutionDto {
  @ApiProperty({
    type: Boolean,
    description: 'flag de tarefa completada',
    example: true,
    required: true
  })
  @IsNotEmpty()
  @IsBoolean()
  completed: boolean;
}
