import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ServerSettingsService } from './app/settings/services/server-settings.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const serverSettings = app.get(ServerSettingsService);
  const serverPort = serverSettings.getPort();

  await app.listen(serverPort);

  const url = await app.getUrl();
  Logger.log(`The RESTful API is listening to ${url}.`, 'API');
}
bootstrap();
