import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from 'src/infra/modules/logger/logger.service';
import { ZodValidationException } from 'nestjs-zod';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {
    this.logger.setContext(HttpExceptionFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status: number;
    let errorResponse: any;

    if (exception instanceof ZodValidationException) {
      status = HttpStatus.BAD_REQUEST;
      errorResponse = {
        statusCode: status,
        message: 'Validation failed',
        errors: exception.getZodError(),
        timestamp: new Date().toISOString(),
        path: request.url,
      };
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const message = exception.getResponse();
      errorResponse = {
        statusCode: status,
        message: typeof message === 'string' ? message : (message as any).message,
        timestamp: new Date().toISOString(),
        path: request.url,
      };
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorResponse = {
        statusCode: status,
        message: 'Internal server error',
        timestamp: new Date().toISOString(),
        path: request.url,
      };
    }

    this.logger.error(
      `HTTP ${status} Error: ${JSON.stringify(errorResponse)}`,
      (exception as any).stack,
      request.method,
    );

    response.status(status).json(errorResponse);
  }
}