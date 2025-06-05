import { Session } from 'src/app/database/entities/session.entity';
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
import { AccountImpl } from './impl.account.entity';

@Entity('session')
export class SessionImpl implements Session {
  @Generated()
  @PrimaryColumn({
    name: 'id',
    type: 'bigint',
    transformer: BIGINT_TRANSFORMER,
    primaryKeyConstraintName: 'session_pk',
  })
  id!: bigint;

  @Column({
    name: 'account_id',
    type: 'bigint',
    transformer: BIGINT_TRANSFORMER,
  })
  accountId!: bigint;

  @Column({ name: 'access_token', type: 'varchar' })
  accessToken!: string;

  @Column({ name: 'refresh_token', type: 'varchar', nullable: true })
  refreshToken!: string | null;

  @Column({ name: 'refresh_expires_at', type: 'timestamptz', nullable: true })
  refreshExpiresAt!: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date | null;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt!: Date | null;

  @ManyToOne(() => AccountImpl, account => account.sessions)
  @JoinColumn({
    name: 'account_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_account',
  })
  account!: AccountImpl;
}
