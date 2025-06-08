import { Account } from './account.entity';
import { Credential } from './credential.entity';

export interface Person {
  id: bigint;
  name: string;
  email: string;
  phone: string | null;
  document: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;

  accounts: Account[];
  credentials: Credential[];
}
