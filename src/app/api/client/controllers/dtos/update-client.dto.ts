import { PartialType, PickType } from '@nestjs/swagger';
import { CreateClientBody } from './create-client.dto';

export class UpdateClientBody extends PartialType(
  PickType(CreateClientBody, ['name', 'blurb']),
) {}
