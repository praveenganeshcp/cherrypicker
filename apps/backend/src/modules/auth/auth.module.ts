import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { AuthBeModule, AuthenticationMiddleware } from "@cherrypicker/auth-be";
import { AuthController } from "./auth.controller";

@Module({
  imports: [AuthBeModule],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes({
      path: "/auth/profile",
      method: RequestMethod.GET,
    });
  }
}
