import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { INestApplication, Logger } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => afterBoot(app));
}
bootstrap();

async function afterBoot(app: INestApplication): Promise<void> {
  const url = await app.getUrl();
  Logger.log(`The RESTful API is listening to ${url}.`, 'API');
}
