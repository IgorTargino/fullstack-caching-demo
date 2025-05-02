import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from './../dtos/request/create-user.dto';
import { UpdateUserDto } from '../dtos/request/update-user.dto';
import { UserResponseDto } from '../dtos/response/user-res.dto';
import { Swagger } from 'src/app/shared/decorators/swagger.decorator';
import { UserControllerInterface } from './user.controller.interface';

@Controller('users')
export class UserController implements UserControllerInterface {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Post()
  @Swagger({
    summary: 'Create a new user',
    status: HttpStatus.CREATED,
    description: 'Creates a new user and returns the created user data',
    type: UserResponseDto,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Swagger({
    summary: 'Get all users',
    status: HttpStatus.OK,
    description: 'Returns a list of all users',
    type: [UserResponseDto],
  })
  async findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Swagger({
    summary: 'Get a user by ID',
    status: HttpStatus.OK,
    description: 'Returns the user data for the given ID',
    type: UserResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @Swagger({
    summary: 'Update a user by ID',
    status: HttpStatus.OK,
    description: 'Updates the user data for the given ID and returns the updated user',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Swagger({
    summary: 'Delete a user by ID',
    status: HttpStatus.NO_CONTENT,
    description: 'Deletes the user with the given ID',
  })
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}