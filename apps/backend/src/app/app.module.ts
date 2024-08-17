import { Module } from '@nestjs/common';

import { ConfigBeModule } from '@cherrypicker/config-be';
import { AuthModule } from '../modules/auth/auth.module';
import { RequestManagerModule } from '../modules/request-manager/request-manager.module';

@Module({
  imports: [ConfigBeModule, AuthModule, RequestManagerModule],
})
export class AppModule {}
