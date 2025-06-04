import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class EndpointLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(EndpointLoggerMiddleware.name);

  use(request: Request, response: Response, nextFunction: NextFunction): void {
    const startTime = Date.now();

    response.on('finish', () => {
      const endTime = Date.now();
      const duration = endTime - startTime;

      const WHITE_TEXT = '\x1b[37m';
      const RED_FILL = '\x1b[41m';
      const YELLOW_FILL = '\x1b[43m';
      const GREEN_FILL = '\x1b[42m';
      const RESET_STYLE = '\x1b[0m';

      let statusColor: string;
      if (response.statusCode >= 500) {
        statusColor = RED_FILL.concat(WHITE_TEXT);
      } else if (response.statusCode >= 400) {
        statusColor = YELLOW_FILL.concat(WHITE_TEXT);
      } else {
        statusColor = GREEN_FILL.concat(WHITE_TEXT);
      }

      const statusText = response.statusCode.toString().padStart(3, '0');
      const durationText = duration.toString().padStart(3, ' ');
      const method = request.method.padEnd(6, ' ');
      const url = request.url;

      // Example string: POST /auth/signin [401] 15 ms
      const message = `${method} ${url} ${statusColor}[${statusText}]${RESET_STYLE} ${durationText} ms`;
      this.logger.verbose(message);
    });

    nextFunction();
  }
}
