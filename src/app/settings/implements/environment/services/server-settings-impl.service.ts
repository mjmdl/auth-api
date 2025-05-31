import { Injectable } from '@nestjs/common';
import { ServerSettingsService } from '../../../services/server-settings.service';
import { EnvironmentService } from './environment.service';
import { ServerMode } from '../types/server-mode.enum';
import { Environment } from '../types/environment.class';

@Injectable()
export class ServerSettingsServiceImpl implements ServerSettingsService {
  constructor(private readonly environmentService: EnvironmentService) {}

  getPort(): number {
    return this.environmentService.getNumber('SERVER_PORT');
  }

  isProduction(): boolean {
    return this.getMode() === ServerMode.PRODUCTION;
  }

  isDevelopment(): boolean {
    return this.getMode() === ServerMode.DEVELOPMENT;
  }

  private getMode(): ServerMode {
    const name = 'SERVER_MODE' as keyof Environment;

    const value = this.environmentService.getString(name);
    if (value === ServerMode.PRODUCTION) return ServerMode.PRODUCTION;
    if (value === ServerMode.DEVELOPMENT) return ServerMode.DEVELOPMENT;

    const formatter = new Intl.ListFormat('en-US', {
      style: 'long',
      type: 'disjunction',
    });
    const serverModes = formatter.format(Object.values(ServerMode));

    throw new Error(
      `Invalid value for environment variable '${name}': expected one of the values: ${serverModes}, but received '${value}'.`,
    );
  }
}
