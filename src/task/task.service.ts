import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { getLastSunday } from 'src/utils/getLastSunday';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
    private userService: UsersService
  ) { }
  async create(createTaskDto: CreateTaskDto) {
    const user = await this.userService.findOne(createTaskDto.userId);
    const task = this.taskRepository.create(createTaskDto);
    task.user = user;
    return await this.taskRepository.save(task).catch((err) => {
      throw new InternalServerErrorException('problemas ao criar uma tarefa');
    });
  }

  async findAll() {
    return await this.taskRepository.find({
      relations: {
        executions: true
      }
    });
  }

  async findAllByUserId(userId: string) {
    const user = await this.userService.findOne(userId);
    return await this.taskRepository.find({
      relations: {
        executions: true
      },
      where: {
        user: {
          id: user.id
        }
      },
      order: {
        executions: {
          week: 'DESC'
        }
      }
    });
  }

  async findOne(id: string) {
    return await this.taskRepository.findOneOrFail({
      where: {
        id
      },
      relations: {
        executions: true
      },
      order: {
        executions: {
          week: 'DESC'
        }
      }
    }).catch(
      (err) => {
        throw new NotFoundException('tarefa não encontrada');
      }
    );
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update(id, updateTaskDto)
      .catch((err) => {
        throw new InternalServerErrorException('problemas ao atualizar uma tarefa');
      });
    return await this.findOne(id);
  }

  async remove(id: string) {
    return await this.taskRepository.delete(id);
  }
}
