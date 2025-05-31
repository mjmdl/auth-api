import { Module } from '@nestjs/common';
import { EnvironmentModule } from './implements/environment/environment.module';

@Module({
  imports: [EnvironmentModule],
  exports: [EnvironmentModule],
})
export class SettingsModule {}
