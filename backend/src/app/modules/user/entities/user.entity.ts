import { User } from "generated/prisma";
import { UserResponseDto } from "../dtos/response/user-res.dto";

export class UserEntity {
  constructor(
    public readonly id: string,
    public email: string,
    public passwordHash: string,
    public name: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static fromPrisma(user: User): UserEntity {
    return new UserEntity(
      user.id,
      user.email,
      user.passwordHash,
      user.name,
      user.createdAt,
      user.updatedAt,
    );
  }

  toResponse(): UserResponseDto {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}