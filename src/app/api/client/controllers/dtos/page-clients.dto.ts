import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { PageableQuery, PageResponse } from 'src/common/dtos/pageable.dto';
import { PageClientsData } from '../../models/client-repository.interface';
import { ClientFoundResponse } from './find-client.dto';

export const SEARCH_MAX = 100;

export class PageClientsQuery extends PageableQuery implements PageClientsData {
  @ApiPropertyOptional({
    description:
      'Search the name, nickname and blurb of a client by a space separated keyword list.',
    maxLength: SEARCH_MAX,
  })
  @IsOptional()
  @IsString()
  @MaxLength(SEARCH_MAX)
  search?: string;
}

export class ClientsPageResponse extends PageResponse(ClientFoundResponse) {}
