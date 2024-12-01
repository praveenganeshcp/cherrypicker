import { Module } from '@nestjs/common';
import { AuthorizeUsecase } from './usecases/authorize.usecase';
import { RepositoryModule } from '@cherrypicker/repository';
import { JWTService } from './services/jwt.service';
import { AuthenticationMiddleware } from './services/authentication.middleware';
import { GithubApiModule } from '@cherrypicker/github-api';

@Module({
  imports: [GithubApiModule, RepositoryModule],
  providers: [AuthorizeUsecase, JWTService, AuthenticationMiddleware],
  exports: [AuthorizeUsecase, JWTService, AuthenticationMiddleware],
})
export class AuthBeModule {}
