import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>
  ) { }
  async create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task).catch((err) => {
      throw new InternalServerErrorException('problemas ao criar uma tarefa');
    });
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(id: string) {
    return await this.taskRepository.findOneByOrFail({ id }).catch(
      (err) => {
        throw new NotFoundException('tarefa não encontrada');
      }
    );
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update(id, updateTaskDto)
    .catch((err) => {
      throw new InternalServerErrorException('problemas ao atualizar uma tarefa');
    });;
    return await this.findOne(id);
  }

  async remove(id: string) {
    return await this.taskRepository.delete(id);
  }
}
