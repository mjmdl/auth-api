import { Type as TypeRef } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { Page, Pageable, PageMeta } from '../interfaces/pageable.interface';

export const COUNT_MIN = 1;
export const COUNT_MAX = 20;

export class PageableQuery implements Pageable {
  @ApiProperty({ description: 'Page number, starting at 0.', default: 0 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  index!: number;

  @ApiProperty({
    description: 'Page size.',
    minimum: COUNT_MIN,
    maximum: COUNT_MAX,
    default: COUNT_MAX,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(COUNT_MIN)
  @Max(COUNT_MAX)
  @Type(() => Number)
  length!: number;
}

export class PageMetaResponse implements PageMeta {
  @ApiProperty({ description: 'The number of the current page.' })
  index!: number;

  @ApiProperty({ description: 'The number of the last page.' })
  lastIndex!: number;

  @ApiProperty({ description: 'The number of entries per page.' })
  length!: number;

  @ApiProperty({ description: 'The number of total entries.' })
  totalCount!: number;
}

export function PageResponse<Data>(Class: TypeRef<Data>): TypeRef<Page<Data>> {
  class PageDto implements Page<Data> {
    @ApiProperty({
      description: 'Page metadata.',
      type: () => PageMetaResponse,
    })
    meta!: PageMetaResponse;

    @ApiProperty({
      description: 'Page data.',
      type: () => Class,
      isArray: true,
    })
    data!: Data[];
  }

  return PageDto;
}
