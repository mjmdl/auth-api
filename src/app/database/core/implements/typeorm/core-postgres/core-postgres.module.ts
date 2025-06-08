import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CORE_POSTGRES_CONNECTION,
  getCorePostgresConnection,
} from './configs/postgres.config';
import { CORE_POSTGRES_REPOSITORIES } from './repositories';
import { CORE_POSTGRES_ENTITIES } from './entities';
import { SettingsModule } from 'src/app/settings/settings.module';

@Module({
  imports: [
    SettingsModule,
    TypeOrmModule.forRootAsync(getCorePostgresConnection()),
    TypeOrmModule.forFeature(CORE_POSTGRES_ENTITIES, CORE_POSTGRES_CONNECTION),
  ],
  providers: CORE_POSTGRES_REPOSITORIES,
  exports: CORE_POSTGRES_REPOSITORIES.map(provider => provider.provide),
})
export class CorePostgresModule {}
