import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getCorePostgresConnection } from './configs/postgres.config';
import { CORE_POSTGRES_REPOSITORIES } from './repositories';

@Module({
  imports: [TypeOrmModule.forRootAsync(getCorePostgresConnection())],
  providers: CORE_POSTGRES_REPOSITORIES,
  exports: CORE_POSTGRES_REPOSITORIES.map((provider) => provider.provide),
})
export class CorePostgresModule {}
