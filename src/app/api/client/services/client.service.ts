import { Injectable } from '@nestjs/common';
import {
  ApiKey,
  ClientCreated,
  ClientFound,
  ClientsList,
  ClientsPage,
  CreateClient,
  PageClients,
  UpdateClient,
} from './client-service.interface';
import { ClientRepository } from '../models/client.repository';
import { CreateClientData } from '../models/client-repository.interface';
import { ApiKeyService } from 'src/libraries/services/api-key.service';
import { NicknameIsTaken } from '../exceptions/nickname-is-taken.exception';
import { ClientNotFound } from '../exceptions/client-not-found.exception';
import { countDefinedProperties } from 'src/common/utils/count-defined-properties.util';
import { NothingToUpdate } from 'src/common/exceptions/nothing-to-update.exception';

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly apiKeyService: ApiKeyService,
  ) {}

  async create(client: CreateClient): Promise<ClientCreated> {
    if (await this.clientRepository.nicknameExists(client.nickname)) {
      throw new NicknameIsTaken();
    }

    const apiKey = await this.createUniqueApiKey();
    const clientData: CreateClientData = { ...client, apiKey };

    const record = await this.clientRepository.create(clientData);
    return {
      id: record.id,
      apiKey,
    };
  }

  async update(id: bigint, changes: UpdateClient): Promise<void> {
    if (countDefinedProperties(changes) === 0) {
      throw new NothingToUpdate();
    }

    await this.checkExists(id);

    await this.clientRepository.update(id, changes);
  }

  async delete(id: bigint): Promise<void> {
    await this.checkExists(id);

    await this.clientRepository.softDelete(id);
  }

  async resetApiKey(id: bigint): Promise<ApiKey> {
    await this.checkExists(id);

    const apiKey = await this.createUniqueApiKey();
    await this.clientRepository.update(id, { apiKey });

    return { apiKey };
  }

  async find(id: bigint): Promise<ClientFound | null> {
    return this.clientRepository.find(id);
  }

  async list(): Promise<ClientsList> {
    return this.clientRepository.list();
  }

  async page(pageable: PageClients): Promise<ClientsPage> {
    return this.clientRepository.page(pageable);
  }

  private async createUniqueApiKey(): Promise<string> {
    let apiKey: string;
    do {
      apiKey = this.apiKeyService.create();
    } while (await this.clientRepository.apiKeyExists(apiKey));
    return apiKey;
  }

  private async checkExists(id: bigint): Promise<void> {
    if (!(await this.clientRepository.exists(id))) {
      throw new ClientNotFound();
    }
  }
}
