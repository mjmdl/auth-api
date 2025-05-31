import { Logger } from '@nestjs/common';
import { ConfigModuleOptions } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync, ValidationOptions } from 'class-validator';
import { Environment } from '../types/environment.class';

export function getEnvironmentConfig(): ConfigModuleOptions<ValidationOptions> {
  return { validate: validateEnvironment };
}

function validateEnvironment(config: Record<string, any>): Record<string, any> {
  const environment = plainToInstance(Environment, config);

  const errors = validateSync(environment);

  if (errors.length !== 0) {
    const logger = new Logger(getEnvironmentConfig.name);

    const variablesCount = errors.length;
    let constraintsCount = 0;

    for (const error of errors) {
      if (!error.constraints) continue;

      const constraints = Object.values(error.constraints);
      constraintsCount += constraints.length;

      for (const constraint of constraints) {
        logger.fatal(constraint);
      }
    }

    throw new Error(
      `${constraintsCount} errors occurred across ${variablesCount} environment variables. Please ensure the .env file is properly configured and try again.`,
    );
  }

  // Do we want to mutate process.env?
  return config;
}
