import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/modules/database/database.module';
import { UserModule } from './app/modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './infra/modules/cache/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
    DatabaseModule, 
    UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
