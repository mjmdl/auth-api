import { INestApplication, Type, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

export function configureValidation(
  app: INestApplication,
  iocModule: Type,
): void {
  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      whitelist: true,
    }),
  );

  useContainer(app.select(iocModule), { fallbackOnErrors: true });
}
