import { Page, Pageable } from 'src/common/interfaces/pageable.interface';
import { Client } from './client.entity';

export interface CreateClientData {
  name: string;
  nickname: string;
  blurb?: string;
  apiKey: string;
}

export interface UpdateClientData {
  name?: string;
  nickname?: string;
  blurb?: string | null;
  apiKey?: string;
}

export interface ClientCreatedRecord {
  id: bigint;
}

export type ClientFoundRecord = Pick<
  Client,
  'id' | 'name' | 'nickname' | 'blurb' | 'createdAt' | 'updatedAt'
>;

export interface ClientItemRecord {
  id: bigint;
  nickname: string;
}

export type ClientsListRecord = Array<ClientItemRecord>;

export interface PageClientsData extends Pageable {
  search?: string;
}

export interface ClientsPageRecord extends Page<ClientFoundRecord> {}
