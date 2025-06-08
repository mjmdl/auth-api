import { ApiProperty } from '@nestjs/swagger';

export class ClientItemResponse {
  @ApiProperty()
  id!: bigint;

  @ApiProperty()
  nickname!: string;
}
