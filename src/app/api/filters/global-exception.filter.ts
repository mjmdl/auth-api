import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  NotImplementedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost): void {
    const httpHost = host.switchToHttp();
    const request = httpHost.getRequest<Request>();
    const response = httpHost.getResponse<Response>();

    const method = request.method;
    const url = request.url;

    if (
      exception instanceof NotImplementedException ||
      exception.message === 'Method not implemented.'
    ) {
      this.logger.warn(`Unimplemented code path hit: ${method} ${url}`);

      response.sendStatus(HttpStatus.NOT_IMPLEMENTED);
      return;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errorResponse = exception.getResponse();

      this.logger.warn(`HTTP Exception: ${method} ${url} - Status: ${status}`);

      response.status(status).json(errorResponse);
      return;
    }

    this.logger.error(
      `Unhandled exception: ${method} ${url}`,
      exception.stack || exception,
    );

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
}
