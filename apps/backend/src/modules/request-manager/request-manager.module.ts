import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { RequestManagerController } from "./request-manager.controller";
import { RequestManagerBeModule } from "@cherrypicker/request-manager-be";
import { AuthBeModule, AuthenticationMiddleware } from "@cherrypicker/auth-be";

@Module({
    controllers: [RequestManagerController],
    imports: [RequestManagerBeModule, AuthBeModule]
})
export class RequestManagerModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthenticationMiddleware).exclude({
            path: 'requests-manager/requests/:requestId/status',
            method: RequestMethod.PATCH
        }).forRoutes(RequestManagerController)
      }
}