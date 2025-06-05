import { Authority } from './authority.entity';
import { Client } from './client.entity';

export interface Permission {
  id: bigint;
  clientId: bigint;
  name: string;
  blurb: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;

  client: Client;
  authorities: Authority[];
}
