import { Module, Provider } from '@nestjs/common';
import { getEnvironmentConfig } from './configs/environment.config';
import { EnvironmentService } from './services/environment.service';
import { ServerSettingsService } from '../../services/server-settings.service';
import { ServerSettingsServiceImpl } from './services/impl.server-settings.service';
import { ConfigModule } from '@nestjs/config';
import { CoreDatabaseSettingsService } from '../../services/core-database-settings.service';
import { CoreDatabaseSettingsServiceImpl } from './services/impl.core-database-settings.service';

@Module({
  imports: [ConfigModule.forRoot(getEnvironmentConfig())],
  providers: [
    EnvironmentService,
    {
      provide: CoreDatabaseSettingsService,
      useClass: CoreDatabaseSettingsServiceImpl,
    },
    {
      provide: ServerSettingsService,
      useClass: ServerSettingsServiceImpl,
    },
  ],
  exports: [CoreDatabaseSettingsService, ServerSettingsService],
})
export class EnvironmentModule {}
