import {
  ClientFoundRecord,
  ClientsListRecord,
  ClientsPageRecord,
  PageClientsData,
} from '../models/client-repository.interface';

export interface CreateClient {
  name: string;
  nickname: string;
  blurb?: string;
}

export interface ClientCreated {
  id: bigint;
  apiKey: string;
}

export interface UpdateClient {
  name?: string;
  blurb?: string | null;
}

export type ClientFound = ClientFoundRecord;

export type ClientsList = ClientsListRecord;

export interface ApiKey {
  apiKey: string;
}

export type PageClients = PageClientsData;
export type ClientsPage = ClientsPageRecord;
