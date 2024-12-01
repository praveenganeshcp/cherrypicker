import { registerAs } from "@nestjs/config";
import { ENV_VARIABLES } from "./env.validator";

export const githubConfig = registerAs("github", () => ({
  CLIENT_ID: ENV_VARIABLES.GITHUB_CLIENT_ID,
  CLIENT_SECRET: ENV_VARIABLES.GITHUB_CLIENT_SECRET,
  REDIRECT_URL: ENV_VARIABLES.GITHUB_REDIRECT_URL,
}));
