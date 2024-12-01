import { Module } from "@nestjs/common";

import { ConfigBeModule, dbConfig } from "@cherrypicker/config-be";
import { AuthModule } from "../modules/auth/auth.module";
import { RequestManagerModule } from "../modules/request-manager/request-manager.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigType } from "@nestjs/config";

@Module({
  imports: [
    ConfigBeModule,
    AuthModule,
    RequestManagerModule,
    TypeOrmModule.forRootAsync({
      inject: [dbConfig.KEY],
      useFactory: (databaseConfig: ConfigType<typeof dbConfig>) => {
        return {
          type: "postgres",
          host: databaseConfig.DB_HOST,
          port: 5432,
          username: databaseConfig.DB_AUTH_USERNAME,
          password: databaseConfig.DB_AUTH_PASSWORD,
          database: databaseConfig.DB_NAME,
          synchronize: false,
          autoLoadEntities: true,
          entities: [__dirname + "/../**/*.entity{.ts,.js}"],
          logging: true,
        };
      },
    }),
  ],
})
export class AppModule {}
