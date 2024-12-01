import {
  AuthorizeUsecase,
  AuthUser,
  JWTService,
  UserEntity,
} from "@cherrypicker/auth-be";
import { Body, Controller, Get, Logger, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthenticatedUserResponse } from "./types";

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authorizeUsecase: AuthorizeUsecase,
    private readonly jwtService: JWTService
  ) {}

  @Post("authorize")
  async authorizeUser(
    @Body("exchangeCode") exchangeCode: string,
    @Res({ passthrough: true }) response: Response
  ) {
    this.logger.log("Authorizing github user");
    const authenticatedUser: UserEntity = await this.authorizeUsecase.execute(
      exchangeCode
    );
    this.logger.log(
      `Authorization passed successfully for ${authenticatedUser.name}`
    );
    const userResponse: AuthenticatedUserResponse = {
      name: authenticatedUser.name,
      avatarUrl: authenticatedUser.avatarUrl,
    };
    response
      .cookie("token", this.jwtService.signToken(authenticatedUser.subjectId))
      .json(userResponse);
  }

  @Get("profile")
  fetchProfile(@AuthUser() user: UserEntity): AuthenticatedUserResponse {
    this.logger.log(`Fetched user profile for ${user.name}`);
    return {
      name: user.name,
      avatarUrl: user.avatarUrl,
    };
  }
}
