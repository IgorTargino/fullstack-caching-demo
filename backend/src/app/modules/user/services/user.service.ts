import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { UserServiceInterface } from './user.service.interface';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/request/create-user.dto';
import { UpdateUserDto } from '../dtos/request/update-user.dto';
import { UserResponseDto } from '../dtos/response/user-res.dto';
import { CreateUserRepositoryDto } from '../dtos/request/create-user-repository.dto';
import { UpdateUserRepositoryDto } from '../dtos/request/update-user-repository.dto';
import { UserRepositoryInterface } from '../repositories/user.repository.interface';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject('UserRepositoryInterface') private userRepository: UserRepositoryInterface,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const createUserRepositoryDto: CreateUserRepositoryDto = {
      email: createUserDto.email,
      name: createUserDto.name,
      passwordHash: hashedPassword, 
    };

    const createdUser = await this.userRepository.create(createUserRepositoryDto);
    return createdUser.toResponse();
  }

  async findAll(): Promise<UserResponseDto[] | []> {
    const users = await this.userRepository.findAll();
    return users.map((user) => user.toResponse());
  }

  async findOne(id: string): Promise<UserResponseDto> {
    if (!id) {
      throw new BadRequestException('User ID must be provided');
    }

    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user.toResponse();
  }

  async findByEmail(email: string): Promise<UserResponseDto> {
    if (!email) {
      throw new BadRequestException('Email must be provided');
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user.toResponse();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    if (!id) {
      throw new BadRequestException('User ID must be provided');
    }

    const existingUser = await this.userRepository.findOne(id);

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updateUserRepositoryDto: UpdateUserRepositoryDto = {
      email: updateUserDto.email || existingUser.email, 
      name: updateUserDto.name || existingUser.name,
      passwordHash: existingUser.passwordHash, 
    };


    if (updateUserDto.password) {
      const isSamePassword = await bcrypt.compare(updateUserDto.password, existingUser.passwordHash);

      if (isSamePassword) {
        throw new BadRequestException('The new password must be different from the current password');
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);

      updateUserRepositoryDto.passwordHash = hashedPassword;
    }

    const updatedUser = await this.userRepository.update(id, updateUserRepositoryDto);
    return updatedUser.toResponse();
  }

  async delete(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('User ID must be provided');
    }

    const existingUser = await this.userRepository.findOne(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.delete(id);
  }
}