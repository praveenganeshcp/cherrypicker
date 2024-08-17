import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { AuthorizeUsecase } from './usecases/authorize.usecase';
import { RepositoryModule } from '@cherrypicker/repository';
import { JWTService } from './services/jwt.service';
import { AuthenticationMiddleware } from './services/authentication.middleware';
import { GithubApiModule } from '@cherrypicker/github-api';

@Module({
  imports: [GithubApiModule, RepositoryModule],
  controllers: [],
  providers: [UserRepository, AuthorizeUsecase, JWTService, AuthenticationMiddleware],
  exports: [UserRepository, AuthorizeUsecase, JWTService, AuthenticationMiddleware],
})
export class AuthBeModule {}
