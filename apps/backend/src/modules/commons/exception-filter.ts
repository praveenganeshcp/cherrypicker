import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(HttpExceptionFilter.name)

    catch(exception: HttpException, host: ArgumentsHost) {
      const context = host.switchToHttp();
      const response = context.getResponse<Response>();
      const status = exception.getStatus();
      const errorResponse: any = exception.getResponse();
      this.logger.error(`HTTP exception thrown`, errorResponse);
      response.status(status).json({
        message: errorResponse || 'Something went wrong!',
      });
    }
  }