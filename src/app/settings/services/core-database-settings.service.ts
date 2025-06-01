export abstract class CoreDatabaseSettingsService {
  abstract getHost(): string;
  abstract getPort(): number;
  abstract getUsername(): string;
  abstract getPassword(): string;
  abstract getDatabaseName(): string;
  abstract getSchema(): string;
  abstract shouldSynchronize(): boolean;
  abstract shouldMigrate(): boolean;
}
