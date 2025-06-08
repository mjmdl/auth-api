import { ApiProperty } from '@nestjs/swagger';

export class ApiKeyResponse {
  @ApiProperty()
  apiKey!: string;
}
