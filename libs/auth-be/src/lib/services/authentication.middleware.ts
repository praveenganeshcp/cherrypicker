import { Injectable, NestMiddleware, Logger, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { JWTService } from '../services/jwt.service';
import { JsonWebTokenError } from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private logger = new Logger(AuthenticationMiddleware.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JWTService
  ) {}

  // TODO: use express req type
  async use(req: any, res: Response, next: (error?: unknown) => void) {
    this.logger.log('Running auth middleware');
    try {
      const jwt: string = req.cookies.token || '';
      req['authUser'] = await this.fetchUserDetails(jwt);
      this.logger.log(`User ${req['authUser'].name} is authenticated`);
      next();
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        throw 'Token expired';
      }
      throw err;
    }
  }

  private async fetchUserDetails(jwt: string): Promise<UserEntity> {
    if (!jwt) {
      throw new HttpException('Token not found in request', 401);
    }
    const jwtPayload = this.jwtService.verifyToken(jwt);
    if (!jwtPayload) {
      throw new HttpException('Invalid or token expired', 401);
    }
    const user = await this.userRepository.findOneBy({
        subjectId: parseInt(jwtPayload.sub ?? '', 10)
    })
    if (!user) {
        throw new HttpException('Invalid or token expired', 401);
    }
    return user;
  }
}