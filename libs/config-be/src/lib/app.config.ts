import { registerAs } from "@nestjs/config";
import { ENV_VARIABLES } from "./env.validator";

export const appConfig = registerAs("app", () => ({
  PORT: ENV_VARIABLES.PORT,
  JWT_SECRET: ENV_VARIABLES.JWT_SECRET,
  FE_HOST_ADDRESS: ENV_VARIABLES.FE_HOST_ADDRESS,
}));
