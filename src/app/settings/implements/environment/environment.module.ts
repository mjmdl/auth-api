import { Module } from '@nestjs/common';
import { getEnvironmentConfig } from './configs/environment.config';
import { EnvironmentService } from './services/environment.service';
import { ServerSettingsService } from '../../services/server-settings.service';
import { ServerSettingsServiceImpl } from './services/server-settings-impl.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(getEnvironmentConfig())],
  providers: [
    EnvironmentService,
    { provide: ServerSettingsService, useClass: ServerSettingsServiceImpl },
  ],
  exports: [ServerSettingsService],
})
export class EnvironmentModule {}
