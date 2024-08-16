import { dbConfig } from '@cherrypicker/config-be';
import { Global, Module } from '@nestjs/common';
import { createDbConnection } from './db-connection.factory';

export const MONGO_DB_CONNECTION = 'MONGO_DB_CONNECTION';

@Global()
@Module({
  providers: [
    {
      provide: MONGO_DB_CONNECTION,
      useFactory: createDbConnection,
      inject: [dbConfig.KEY],
    },
  ],
  exports: [MONGO_DB_CONNECTION],
})
export class RepositoryModule {}