import { Account } from './account.entity';

export interface Session {
  id: bigint;
  accountId: bigint;
  accessToken: string;
  refreshToken: string | null;
  refreshExpiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;

  account: Account;
}
