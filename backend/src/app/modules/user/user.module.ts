import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { RedisModule } from 'src/infra/modules/cache/redis/redis.module';

const UserProvider = {
  provide: 'UserRepositoryInterface',
  useClass: UserRepository,
}

@Module({
  imports: [RedisModule],
  controllers: [UserController],
  providers: [UserService, UserProvider],
})
export class UserModule {}
