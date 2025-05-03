import { Module, LoggerService } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { RedisModule } from 'src/infra/modules/cache/redis/redis.module';
import { LoggerModule } from 'src/infra/modules/logger/logger.module';

const UserProvider = {
  provide: 'UserRepositoryInterface',
  useClass: UserRepository,
}

const UserServiceProvider = {
  provide: 'UserServiceInterface',
  useClass: UserService,
}

@Module({
  imports: [LoggerModule, RedisModule],
  controllers: [UserController],
  providers: [UserProvider, UserServiceProvider],
  exports: [UserServiceProvider]
})
export class UserModule {}
