import { Module } from '@nestjs/common';

import { ConfigBeModule } from '@cherrypicker/config-be';
import { AuthModule } from '../modules/auth/auth.module';

@Module({
  imports: [ConfigBeModule, AuthModule],
})
export class AppModule {}
