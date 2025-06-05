import { Authority } from './authority.entity';
import { Client } from './client.entity';
import { Person } from './person.entity';
import { Session } from './session.entity';

export interface Account {
  id: bigint;
  personId: bigint;
  clientId: bigint;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;

  person: Person;
  client: Client;
  authorities: Authority[];
  sessions: Session[];
}
