import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ServerSettingsService } from './app/settings/services/server-settings.service';
import { configureSwagger } from './common/configs/swagger.config';
import { configureValidation } from './common/configs/validation.config';
import './common/utils/sql-template-string.util';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const serverSettings = app.get(ServerSettingsService);
  const serverPort = serverSettings.getPort();
  const docsPath = serverSettings.getDocsPath();
  const isDevelopment = serverSettings.isDevelopment();

  configureValidation(app, AppModule);
  if (isDevelopment) {
    configureSwagger(app, docsPath);
  }

  await app.listen(serverPort);

  const url = await app.getUrl();
  Logger.log(`The RESTful API is listening at ${url}.`, 'API');

  if (isDevelopment) {
    Logger.log(`Swagger docs are available at ${url}/${docsPath}.`, 'Doc');
  }
}
bootstrap();
