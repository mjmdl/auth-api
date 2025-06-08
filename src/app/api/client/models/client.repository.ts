import {
  CreateClientData,
  ClientCreatedRecord,
  UpdateClientData,
  ClientFoundRecord,
  ClientsListRecord,
  PageClientsData,
  ClientsPageRecord,
} from './client-repository.interface';

export abstract class ClientRepository {
  abstract create(client: CreateClientData): Promise<ClientCreatedRecord>;
  abstract update(id: bigint, changes: UpdateClientData): Promise<void>;
  abstract softDelete(id: bigint): Promise<void>;
  abstract hardDelete(id: bigint): Promise<void>;
  abstract find(id: bigint): Promise<ClientFoundRecord | null>;
  abstract list(): Promise<ClientsListRecord>;
  abstract page(pageable: PageClientsData): Promise<ClientsPageRecord>;
  abstract exists(id: bigint): Promise<boolean>;
  abstract nicknameExists(nickname: string): Promise<boolean>;
  abstract apiKeyExists(apiKey: string): Promise<boolean>;
}
