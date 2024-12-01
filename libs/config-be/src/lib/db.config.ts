import { registerAs } from "@nestjs/config";
import { ENV_VARIABLES } from "./env.validator";

export const dbConfig = registerAs("database", () => ({
  DB_HOST: ENV_VARIABLES.DB_HOST,
  DB_NAME: ENV_VARIABLES.DB_NAME,
  DB_AUTH_USERNAME: ENV_VARIABLES.DB_AUTH_USERNAME,
  DB_AUTH_PASSWORD: ENV_VARIABLES.DB_AUTH_PASSWORD,
}));
