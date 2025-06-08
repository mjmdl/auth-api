import {
  ClassProvider,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { ServerSettingsService } from '../settings/services/server-settings.service';
import { EndpointLoggerMiddleware } from './middlewares/endpoint-logger.middleware';
import { SettingsModule } from '../settings/settings.module';
import { ClientModule } from './client/client.module';
import { BigIntInterceptor } from './interceptors/bigint.interceptor';

@Module({
  imports: [ClientModule, SettingsModule],
  providers: [
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: BigIntInterceptor },
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
