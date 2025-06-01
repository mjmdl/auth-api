import {
  IsBooleanString,
  IsEnum,
  IsNotEmpty,
  IsPort,
  IsString,
  IsUrl,
} from 'class-validator';
import { ServerMode } from './server-mode.enum';

export class Environment {
  // Server configuration:

  @IsNotEmpty()
  @IsPort()
  SERVER_PORT?: string;

  @IsNotEmpty()
  @IsEnum(ServerMode)
  SERVER_MODE?: ServerMode;

  // Core Database Configuration:

  @IsNotEmpty()
  @IsUrl()
  DATABASE_HOST?: string;

  @IsNotEmpty()
  @IsPort()
  DATABASE_PORT?: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_USERNAME?: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_PASSWORD?: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_NAME?: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_SCHEMA?: string;

  @IsNotEmpty()
  @IsBooleanString()
  DATABASE_SYNCHRONIZE?: string;

  @IsNotEmpty()
  @IsBooleanString()
  DATABASE_MIGRATE?: string;
}
