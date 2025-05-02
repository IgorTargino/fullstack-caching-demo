import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/modules/database/database.module';
import { UserModule } from './app/modules/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
