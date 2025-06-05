import { Authority } from 'src/app/database/entities/authority.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { BIGINT_TRANSFORMER } from '../utils/transformers/bigint.transformer';
import { AccountImpl } from './impl.account.entity';
import { PermissionImpl } from './impl.permission.entity';

@Entity('authority')
export class AuthorityImpl implements Authority {
  @Generated()
  @PrimaryColumn({
    name: 'id',
    type: 'bigint',
    transformer: BIGINT_TRANSFORMER,
    primaryKeyConstraintName: 'authority_pk',
  })
  id!: bigint;

  @Column({
    name: 'account_id',
    type: 'bigint',
    transformer: BIGINT_TRANSFORMER,
  })
  accountId!: bigint;

  @Column({
    name: 'permission_id',
    type: 'bigint',
    transformer: BIGINT_TRANSFORMER,
  })
  permissionId!: bigint;

  @Column({ name: 'created_by', type: 'bigint' })
  createdBy!: bigint;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt!: Date | null;

  @ManyToOne(() => AccountImpl, account => account.authorities)
  @JoinColumn({
    name: 'account_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_account',
  })
  account!: AccountImpl;

  @ManyToOne(() => AccountImpl, account => account.authorities)
  @JoinColumn({
    name: 'created_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_creator',
  })
  creatorAccount!: AccountImpl;

  @ManyToOne(() => PermissionImpl, permission => permission.authorities)
  @JoinColumn({
    name: 'permission_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_permission',
  })
  permission!: PermissionImpl;
}
