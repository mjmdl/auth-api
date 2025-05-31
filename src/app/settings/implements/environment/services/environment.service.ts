import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../types/environment.class';

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  getString(name: keyof Environment): string {
    return this.configService.getOrThrow(name);
  }

  getBoolean(name: keyof Environment): boolean {
    const value = this.configService.getOrThrow(name);

    if (typeof value === 'boolean') return value;

    if (typeof value === 'string') {
      const trimmed = value.trim();

      if (trimmed === 'true') return true;
      if (trimmed === 'false') return false;
    }

    throw new Error(
      `Invalid boolean value for environment variable '${name}': expected a boolean or the string 'true'/'false', but received '${value}'.`,
    );
  }

  getNumber(name: keyof Environment): number {
    const value = this.configService.getOrThrow(name);
    const number = Number(value);

    if (Number.isNaN(number)) {
      throw new Error(
        `Invalid numeric value for environment variable '${name}': expected a number or numeric string, but received '${value}'.`,
      );
    }

    return number;
  }
}
