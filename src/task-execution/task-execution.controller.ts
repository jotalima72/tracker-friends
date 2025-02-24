import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskExecutionService } from './task-execution.service';
import { CreateTaskExecutionDto } from './dto/create-task-execution.dto';
import { UpdateTaskExecutionDto } from './dto/update-task-execution.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('task-execution')
export class TaskExecutionController {
  constructor(private readonly taskExecutionService: TaskExecutionService) {}
  @ApiOperation({ summary: 'Criação de uma nova execução de tarefa' })
  @Post()
  create(@Body() createTaskExecutionDto: CreateTaskExecutionDto) {
    return this.taskExecutionService.create(createTaskExecutionDto);
  }
  @ApiOperation({ summary: 'Lista todas as execuções de tarefas' })
  @Get()
  findAll() {
    return this.taskExecutionService.findAll();
  }
  @ApiOperation({ summary: 'Busca uma execução de tarefa pelo id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskExecutionService.findOne(id);
  }
  @ApiOperation({ summary: 'marca uma execução de tarefa como completa pelo id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskExecutionDto: UpdateTaskExecutionDto) {
    return this.taskExecutionService.update(id, updateTaskExecutionDto);
  }
  @ApiOperation({ summary: 'Deleta uma execução de tarefa' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskExecutionService.remove(id);
  }
}
