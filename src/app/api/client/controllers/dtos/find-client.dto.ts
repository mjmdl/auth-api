import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsId } from 'src/common/validators/is-id.validator';

export class FindClientParam {
  @ApiProperty({ description: 'The client ID.' })
  @IsNotEmpty()
  @IsId()
  id!: bigint;
}

export class ClientFoundResponse {
  @ApiProperty()
  id!: bigint;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  nickname!: string;

  @ApiPropertyOptional({ type: 'string' })
  blurb!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiPropertyOptional({ type: Date })
  updatedAt!: Date | null;
}
