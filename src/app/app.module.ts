import { Module } from '@nestjs/common';
import { SettingsModule } from './settings/settings.module';
import { DatabaseModule } from './database/database.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ApiModule, DatabaseModule, SettingsModule],
})
export class AppModule {}
