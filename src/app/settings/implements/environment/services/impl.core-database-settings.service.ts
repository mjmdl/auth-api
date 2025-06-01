import { Injectable } from '@nestjs/common';
import { CoreDatabaseSettingsService } from 'src/app/settings/services/core-database-settings.service';
import { EnvironmentService } from './environment.service';

@Injectable()
export class CoreDatabaseSettingsServiceImpl
  implements CoreDatabaseSettingsService
{
  constructor(private readonly environmentService: EnvironmentService) {}

  getHost(): string {
    return this.environmentService.getString('DATABASE_HOST');
  }

  getPort(): number {
    return this.environmentService.getNumber('DATABASE_PORT');
  }

  getUsername(): string {
    return this.environmentService.getString('DATABASE_USERNAME');
  }

  getPassword(): string {
    return this.environmentService.getString('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.environmentService.getString('DATABASE_NAME');
  }

  getSchema(): string {
    return this.environmentService.getString('DATABASE_SCHEMA');
  }

  shouldSynchronize(): boolean {
    return this.environmentService.getBoolean('DATABASE_SYNCHRONIZE');
  }

  shouldMigrate(): boolean {
    return this.environmentService.getBoolean('DATABASE_MIGRATE');
  }
}
