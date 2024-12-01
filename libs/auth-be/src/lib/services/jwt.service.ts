import { appConfig } from "@cherrypicker/config-be";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { verify, sign, JwtPayload, SignOptions } from "jsonwebtoken";

@Injectable()
export class JWTService {
  private readonly jwtSecret: string;

  private readonly JWT_ALGORITHM: SignOptions["algorithm"] = "HS512";

  private readonly TOKEN_EXPIRES_IN: string = "7d";

  private logger = new Logger(JWTService.name);

  constructor(
    @Inject(appConfig.KEY)
    private applicationConfig: ConfigType<typeof appConfig>
  ) {
    this.jwtSecret = applicationConfig.JWT_SECRET;
  }

  public signToken(userId: number): string {
    this.logger.log(`Creating JWT for ${userId}`);
    return sign({}, this.jwtSecret, {
      algorithm: this.JWT_ALGORITHM,
      subject: userId.toString(),
      expiresIn: this.TOKEN_EXPIRES_IN,
    });
  }

  public verifyToken(token: string): JwtPayload {
    this.logger.log(`Verifying JWT ${token}`);
    return verify(token, this.jwtSecret) as JwtPayload;
  }
}
