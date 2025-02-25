import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from 'src/config/config.service';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>
  ) { }
  async create(createUserDto: CreateUserDto) {
    const saltRounds = Number(new ConfigService().get('bcrypt_salt'));
    console.log(saltRounds);
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    const user = new User({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
    });
    return await this.userRepository.save(user).catch((err) => {
      throw new InternalServerErrorException('Problemas ao criar um usuário');
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.createQueryBuilder('users')
      .where('users.id = :id', { id })
      .leftJoinAndSelect('users.scores', 'scores')
      .getOneOrFail()
      .catch((err) => {
        throw new NotFoundException('Usuario não encontrado');
      });
    return instanceToPlain(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto).catch((err) => {
      throw new InternalServerErrorException('problemas ao atualizar um usuário');
    });
    return await this.findOne(id);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}
