import { Account } from 'src/app/database/core/entities/account.entity';
import { Client } from 'src/app/api/client/models/client.entity';
import { Permission } from 'src/app/database/core/entities/permission.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BIGINT_TRANSFORMER } from '../utils/transformers/bigint.transformer';

@Entity('client')
export class ClientImpl implements Client {
  @Generated()
  @PrimaryColumn({
    name: 'id',
    type: 'bigint',
    transformer: BIGINT_TRANSFORMER,
    primaryKeyConstraintName: 'client_pk',
  })
  id!: bigint;

  @Column({ name: 'name', type: 'varchar' })
  name!: string;

  @Column({ name: 'nickname', type: 'varchar' })
  nickname!: string;

  @Column({ name: 'blurb', type: 'text', nullable: true })
  blurb!: string | null;

  @Column({ name: 'api_key', type: 'varchar' })
  apiKey!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date | null;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt!: Date | null;

  accounts!: Account[];
  permissions!: Permission[];
}
