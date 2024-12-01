import { Module } from "@nestjs/common";
import { AuthorizeUsecase } from "./usecases/authorize.usecase";
import { JWTService } from "./services/jwt.service";
import { AuthenticationMiddleware } from "./services/authentication.middleware";
import { GithubApiModule } from "@cherrypicker/github-api";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";

@Module({
  imports: [GithubApiModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthorizeUsecase, JWTService, AuthenticationMiddleware],
  exports: [
    AuthorizeUsecase,
    JWTService,
    AuthenticationMiddleware,
    TypeOrmModule,
  ],
})
export class AuthBeModule {}
