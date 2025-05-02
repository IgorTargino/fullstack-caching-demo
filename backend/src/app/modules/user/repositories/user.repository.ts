import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infra/modules/database/prisma.service';
import { UserRepositoryInterface } from './user.repository.interface';
import { UserEntity } from '../entities/user.entity';
import { CreateUserRepositoryDto } from '../dtos/request/create-user-repository.dto';
import { UpdateUserRepositoryDto } from '../dtos/request/update-user-repository.dto';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserRepositoryDto: CreateUserRepositoryDto): Promise<UserEntity> {
    const createdUser = await this.prisma.user.create({
      data: {
        ...createUserRepositoryDto,
      },
    });
    return UserEntity.fromPrisma(createdUser);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map(UserEntity.fromPrisma);
  }

  async findOne(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? UserEntity.fromPrisma(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? UserEntity.fromPrisma(user) : null;
  }

  async update(id: string, updateUserRepositoryDto: UpdateUserRepositoryDto): Promise<UserEntity> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserRepositoryDto,
    });
    return UserEntity.fromPrisma(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}