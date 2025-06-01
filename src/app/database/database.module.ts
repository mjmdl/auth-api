import { Module } from '@nestjs/common';
import { CorePostgresModule } from './core/implements/typeorm/core-postgres/core-postgres.module';

@Module({
  imports: [CorePostgresModule],
  exports: [CorePostgresModule],
})
export class DatabaseModule {}
