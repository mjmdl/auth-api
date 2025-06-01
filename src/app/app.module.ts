import { Module } from '@nestjs/common';
import { SettingsModule } from './settings/settings.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, SettingsModule],
})
export class AppModule {}
