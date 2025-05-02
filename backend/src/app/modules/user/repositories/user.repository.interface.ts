import { CreateUserRepositoryDto } from "../dtos/request/create-user-repository.dto";
import { UpdateUserRepositoryDto } from "../dtos/request/update-user-repository.dto";
import { UserEntity } from "../entities/user.entity";

export interface UserRepositoryInterface {
  create(createUserRepositoryDto: CreateUserRepositoryDto): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findOne(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  update(id: string, updateUserRepositoryDto: UpdateUserRepositoryDto): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}