import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';

const UserProvider = {
  provide: 'UserRepositoryInterface',
  useClass: UserRepository,
}

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserProvider],
})
export class UserModule {}
