import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ClientNotFound } from '../services/client.exception';
import { NicknameIsTaken } from '../services/client.exception';
import { ClientService } from '../services/client.service';
import {
  CreateClientBody,
  CreateClientResponse,
} from './dtos/create-client.dto';
import { ClientFoundResponse, FindClientParam } from './dtos/find-client.dto';
import { ClientItemResponse } from './dtos/list-clients.dto';
import { ClientsPageResponse, PageClientsQuery } from './dtos/page-clients.dto';
import { ApiKeyResponse } from './dtos/reset-api-key.dto';
import { UpdateClientBody } from './dtos/update-client.dto';
import { NothingToUpdate } from 'src/common/exceptions/custom.exception';

@ApiTags('Clients')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Create client.' })
  @ApiCreatedResponse({
    description: 'Client created successfully.',
    type: () => CreateClientResponse,
  })
  @ApiConflictResponse({
    description:
      'Conflict:' + `\n - ${NicknameIsTaken.TAG}: ${NicknameIsTaken.BLURB}`,
  })
  @Post()
  async create(@Body() body: CreateClientBody): Promise<CreateClientResponse> {
    return this.clientService.create(body);
  }

  @ApiOperation({ summary: 'Update client.' })
  @ApiOkResponse({ description: 'Client updated successfully.' })
  @ApiBadRequestResponse({
    description:
      'Bad Request:' + `\n- ${NothingToUpdate.TAG}: ${NothingToUpdate.BLURB}`,
  })
  @ApiNotFoundResponse({
    description:
      'Not Found:' + `\n - ${ClientNotFound.TAG}: ${ClientNotFound.BLURB}`,
  })
  @ApiConflictResponse({
    description:
      'Conflict:' + `\n - ${NicknameIsTaken.TAG}: ${NicknameIsTaken.BLURB}`,
  })
  @Patch('id=:id')
  async update(
    @Param() param: FindClientParam,
    @Body() body: UpdateClientBody,
  ): Promise<void> {
    await this.clientService.update(param.id, body);
  }

  @ApiOperation({ summary: 'Delete client.' })
  @ApiOkResponse({ description: 'Client deleted successfully.' })
  @ApiNotFoundResponse({
    description:
      'Not Found:' + `\n - ${ClientNotFound.TAG}: ${ClientNotFound.BLURB}`,
  })
  @Delete('id=:id')
  async delete(@Param() param: FindClientParam): Promise<void> {
    await this.clientService.delete(param.id);
  }

  @ApiOperation({ summary: 'Reset the client API key.' })
  @ApiOkResponse({
    description: 'Client API key reseted successfully.',
    type: () => ApiKeyResponse,
  })
  @ApiNotFoundResponse({
    description:
      'Not Found:' + `\n - ${ClientNotFound.TAG}: ${ClientNotFound.BLURB}`,
  })
  @Put('id=:id')
  async resetApiKey(@Param() param: FindClientParam): Promise<ApiKeyResponse> {
    return this.clientService.resetApiKey(param.id);
  }

  @ApiOperation({ summary: 'Find client.' })
  @ApiOkResponse({
    description: 'Client is found.',
    type: () => FindClientParam,
  })
  @Get('id=:id')
  async find(
    @Param() param: FindClientParam,
  ): Promise<ClientFoundResponse | null> {
    return this.clientService.find(param.id);
  }

  @ApiOperation({ summary: 'List clients.' })
  @ApiOkResponse({
    description: 'Clients list.',
    type: () => ClientItemResponse,
    isArray: true,
  })
  @Get('list')
  async list(): Promise<ClientItemResponse[]> {
    return this.clientService.list();
  }

  @ApiOperation({ summary: 'Page clients.' })
  @ApiOkResponse({
    description: 'Clients page.',
    type: () => ClientsPageResponse,
  })
  @Get('page')
  async page(@Query() query: PageClientsQuery): Promise<ClientsPageResponse> {
    return this.clientService.page(query);
  }
}
