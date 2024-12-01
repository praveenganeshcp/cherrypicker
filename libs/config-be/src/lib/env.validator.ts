import { plainToInstance } from "class-transformer";
import { IsEnum, IsString, IsNumber, validateSync } from "class-validator";

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV!: Environment;

  @IsNumber()
  PORT!: number;

  @IsString()
  DB_HOST!: string;

  @IsString()
  DB_NAME!: string;

  @IsString()
  DB_AUTH_PASSWORD!: string;

  @IsString()
  DB_AUTH_USERNAME!: string;

  @IsString()
  JWT_SECRET!: string;

  @IsString()
  EMAIL_AUTH_USER!: string;

  @IsString()
  EMAIL_AUTH_PASS!: string;

  @IsString()
  FE_HOST_ADDRESS!: string;

  @IsString()
  GITHUB_CLIENT_ID!: String;

  @IsString()
  GITHUB_CLIENT_SECRET!: String;

  @IsString()
  GITHUB_REDIRECT_URL!: String;
}

export const ENV_VARIABLES: EnvironmentVariables =
  process.env as unknown as EnvironmentVariables;

export function validateEnvVariables(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
