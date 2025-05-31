import { IsEnum, IsNotEmpty, IsPort } from 'class-validator';
import { ServerMode } from './server-mode.enum';

export class Environment {
  @IsNotEmpty()
  @IsPort()
  SERVER_PORT?: string;

  @IsNotEmpty()
  @IsEnum(ServerMode)
  SERVER_MODE?: ServerMode;
}
