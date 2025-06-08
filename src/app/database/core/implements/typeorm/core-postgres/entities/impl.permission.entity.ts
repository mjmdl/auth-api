import { Authority } from 'src/app/database/core/entities/authority.entity';
import { Permission } from 'src/app/database/core/entities/permission.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BIGINT_TRANSFORMER } from '../utils/transformers/bigint.transformer';
import { ClientImpl } from './impl.client.entity';

@Entity('permission')
export class PermissionImpl implements Permission {
  @Generated()
  @PrimaryColumn({
    name: 'id',
    type: 'bigint',
    transformer: BIGINT_TRANSFORMER,
    primaryKeyConstraintName: 'permission_pk',
  })
  id!: bigint;

  @Column({
    name: 'client_id',
    type: 'bigint',
    transformer: BIGINT_TRANSFORMER,
  })
  clientId!: bigint;

  @Column({ name: 'name', type: 'varchar' })
  name!: string;

  @Column({ name: 'blurb', type: 'text', nullable: true })
  blurb!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date | null;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt!: Date | null;

  @ManyToOne(() => ClientImpl, client => client.permissions)
  @JoinColumn({
    name: 'client_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_client',
  })
  client!: ClientImpl;

  authorities!: Authority[];
}
