import { Module, LoggerService } from '@nestjs/common';
import { DatabaseModule } from './infra/modules/database/database.module';
import { UserModule } from './app/modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './infra/modules/cache/redis/redis.module';
import { LoggerModule } from './infra/modules/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    RedisModule,
    DatabaseModule, 
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
