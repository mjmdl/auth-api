import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { ServerSettingsService } from '../settings/services/server-settings.service';
import { EndpointLoggerMiddleware } from './middlewares/endpoint-logger.middleware';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class ApiModule implements NestModule {
  constructor(private readonly serverSettings: ServerSettingsService) {}

  configure(consumer: MiddlewareConsumer) {
    if (this.serverSettings.isDevelopment()) {
      consumer.apply(EndpointLoggerMiddleware).forRoutes('*');
    }
  }
}
