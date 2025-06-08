import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import {
  BLURB_MAX,
  BLURB_MIN,
  NAME_MAX,
  NAME_MIN,
  NICKNAME_MAX,
  NICKNAME_MIN,
  NICKNAME_REGEXP,
} from '../../models/client.constraints';

export class CreateClientBody {
  @ApiProperty({
    description: 'The name of the client displayed to the user.',
    minLength: NAME_MIN,
    maxLength: NAME_MAX,
  })
  @IsNotEmpty()
  @IsString()
  @Length(NAME_MIN, NAME_MAX)
  name!: string;

  @ApiProperty({
    description:
      'The nickname used by the APIs to reference the client.' +
      ' It must satisfy the regular expression: ' +
      NICKNAME_REGEXP,
    minLength: NICKNAME_MIN,
    maxLength: NICKNAME_MAX,
  })
  @IsNotEmpty()
  @IsString()
  @Length(NICKNAME_MIN, NICKNAME_MAX)
  @Matches(NICKNAME_REGEXP)
  nickname!: string;

  @ApiProperty({
    description: 'A brief description of the purposes of the client.',
  })
  @IsOptional()
  @IsString()
  @Length(BLURB_MIN, BLURB_MAX)
  blurb?: string;
}

export class CreateClientResponse {
  @ApiProperty({ description: 'The client ID.' })
  id!: bigint;

  @ApiProperty({
    description: 'The key used to consume the other API endpoints.',
  })
  apiKey!: string;
}
