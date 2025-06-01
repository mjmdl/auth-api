import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { CoreDatabaseSettingsService } from 'src/app/settings/services/core-database-settings.service';
import { SettingsModule } from 'src/app/settings/settings.module';
import { CORE_POSTGRES_ENTITIES } from '../entities';
import { CORE_POSTGRES_MIGRATIONS } from '../migrations';

export const CORE_POSTGRES_CONNECTION = 'CorePostgres';

export function getCorePostgresConnection(): TypeOrmModuleAsyncOptions {
  return {
    name: CORE_POSTGRES_CONNECTION,
    imports: [SettingsModule],
    inject: [CoreDatabaseSettingsService],
    useFactory: getConfig,
  };
}

function getConfig(
  settings: CoreDatabaseSettingsService,
): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: settings.getHost(),
    port: settings.getPort(),
    username: settings.getUsername(),
    password: settings.getPassword(),
    database: settings.getDatabaseName(),
    schema: settings.getSchema(),
    synchronize: settings.shouldSynchronize(),
    migrationsRun: settings.shouldMigrate(),
    entities: CORE_POSTGRES_ENTITIES,
    migrations: CORE_POSTGRES_MIGRATIONS,
  };
}
