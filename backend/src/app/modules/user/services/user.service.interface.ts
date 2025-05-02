import { CreateUserDto } from "../dtos/request/create-user.dto";
import { UpdateUserDto } from "../dtos/request/update-user.dto";
import { UserResponseDto } from "../dtos/response/user-res.dto";

export interface UserServiceInterface {
  create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
  findAll(): Promise<UserResponseDto[] | []>;
  findOne(id: string): Promise<UserResponseDto>;
  findByEmail(email: string): Promise<UserResponseDto>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
  delete(id: string): Promise<void>;
}