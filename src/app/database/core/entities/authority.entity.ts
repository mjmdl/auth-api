import { Account } from './account.entity';
import { Permission } from './permission.entity';

export interface Authority {
  id: bigint;
  accountId: bigint;
  permissionId: bigint;
  createdBy: bigint;
  createdAt: Date;
  deletedAt: Date | null;

  account: Account;
  creatorAccount: Account;
  permission: Permission;
}
