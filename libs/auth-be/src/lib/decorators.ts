import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const httpRequest = context.switchToHttp().getRequest();
    return httpRequest["authUser"];
  }
);
