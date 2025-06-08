import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configureSwagger(app: INestApplication, path: string): void {
  const title = process.env.npm_package_name ?? 'auth-api';
  const description =
    process.env.npm_package_description ??
    'A scalable RESTful API built with NestJS for secure authentication and authorization across distributed systems.';
  const version = process.env.npm_package_version ?? '1.0.0';

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addTag('Clients', 'External systems that consume the API.')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(path, app, document, {
    customSiteTitle: title,
    swaggerOptions: { docExpansion: 'none' },
  });
}
