export abstract class ServerSettingsService {
  abstract getPort(): number;
  abstract isProduction(): boolean;
  abstract isDevelopment(): boolean;

  getDocsPath(): string {
    return 'docs';
  }
}
