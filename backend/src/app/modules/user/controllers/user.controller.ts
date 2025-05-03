import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { CreateUserDto } from './../dtos/request/create-user.dto';
import { UpdateUserDto } from '../dtos/request/update-user.dto';
import { UserResponseDto } from '../dtos/response/user-res.dto';
import { Swagger } from 'src/app/shared/decorators/swagger.decorator';
import { UserControllerInterface } from './user.controller.interface';
import { UserServiceInterface } from '../services/user.service.interface';
import { LoggerService } from 'src/infra/modules/logger/logger.service';

@Controller('users')
export class UserController implements UserControllerInterface {
    constructor(
        @Inject('UserServiceInterface')
        private readonly userService: UserServiceInterface,
        private readonly logger: LoggerService,
    ) {
        this.logger.setContext(UserController.name);
    }

    @Post()
    @Swagger({
        summary: 'Create a new user',
        status: HttpStatus.CREATED,
        description: 'Creates a new user and returns the created user data',
        type: UserResponseDto,
    })
    async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        this.logger.log(`[${UserController.name}] - POST /users`);
        try {
            return this.userService.create(createUserDto);
        } catch (error) {
            throw error;
        }
    }

    @Get()
    @Swagger({
        summary: 'Get all users',
        status: HttpStatus.OK,
        description: 'Returns a list of all users',
        type: [UserResponseDto],
    })
    async findAll(): Promise<UserResponseDto[]> {
        this.logger.log(`[${UserController.name}] - GET /users`);
        try {
            return this.userService.findAll();
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    @Swagger({
        summary: 'Get a user by ID',
        status: HttpStatus.OK,
        description: 'Returns the user data for the given ID',
        type: UserResponseDto,
    })
    async findOne(@Param('id') id: string): Promise<UserResponseDto> {
        this.logger.log(`[${UserController.name}] - GET /users/${id}`);
        try {
            return this.userService.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    @Put(':id')
    @Swagger({
        summary: 'Update a user by ID',
        status: HttpStatus.OK,
        description: 'Updates the user data for the given ID and returns the updated user',
    })
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        this.logger.log(`[${UserController.name}] - PUT /users/${id}`);
        try {
            return this.userService.update(id, updateUserDto);
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Swagger({
        summary: 'Delete a user by ID',
        status: HttpStatus.NO_CONTENT,
        description: 'Deletes the user with the given ID',
    })
    async delete(@Param('id') id: string): Promise<void> {
        this.logger.log(`[${UserController.name}] - DELETE /users/${id}`);
        try {
            return this.userService.delete(id);
        } catch (error) {
            throw error;
        }
    }
}
