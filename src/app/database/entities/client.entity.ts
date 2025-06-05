import { Account } from './account.entity';
import { Permission } from './permission.entity';

export interface Client {
  id: bigint;
  name: string;
  nickname: string;
  blurb: string | null;
  apiKey: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;

  accounts: Account[];
  permissions: Permission[];
}
