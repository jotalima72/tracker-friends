import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTaskExecutionDto } from './dto/create-task-execution.dto';
import { UpdateTaskExecutionDto } from './dto/update-task-execution.dto';
import { Repository } from 'typeorm';
import { TaskExecution } from './entities/task-execution.entity';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class TaskExecutionService {
  constructor(
    @Inject('EXECUTION_REPOSITORY')
    private taskExecutionRepository: Repository<TaskExecution>,
    private taskService: TaskService
  ) { }
  async create(createTaskExecutionDto: CreateTaskExecutionDto) {
    const task = await this.taskService.findOne(createTaskExecutionDto.taskId);
    const hasExecution = await this.taskExecutionRepository.countBy({ task: { id: task.id }, week: this.getLastSunday(createTaskExecutionDto.week) });
    if (hasExecution > 0) {
      throw new InternalServerErrorException('Execução nesta semana já existe');
    }

    const taskExecution = this.taskExecutionRepository.create({
      week: this.getLastSunday(createTaskExecutionDto.week),
      completed: createTaskExecutionDto.completed ?? false,
      task
    })
    return await this.taskExecutionRepository.save(taskExecution).catch((err) => {
      throw new InternalServerErrorException('Problemas ao definir uma execução')
    });
  }

  async findAll() {
    return await this.taskExecutionRepository.find({
      relations: {
        task: true
      }
    });
  }

  async findOne(id: string) {
    return await this.taskExecutionRepository.findOneByOrFail({ id });
  }

  async update(id: string, updateTaskExecutionDto: UpdateTaskExecutionDto) {
    await this.taskExecutionRepository.update(id, updateTaskExecutionDto)
      .catch((err) => {
        throw new InternalServerErrorException('problemas ao atualizar uma execução');
      });;
    return await this.findOne(id);
  }

  async remove(id: string) {
    return await this.taskExecutionRepository.delete(id);
  }

  private getLastSunday(day?: Date): Date {
    const today = day ? new Date(day) : new Date();
    const dayOfWeek = today.getDay(); // 0 (domingo) a 6 (sábado)
    const lastSunday = new Date(today);

    lastSunday.setDate(today.getDate() - dayOfWeek);
    lastSunday.setHours(0, 0, 0, 0); // Resetando para meia-noite

    return lastSunday;
  }
}
