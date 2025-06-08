import { Account } from 'src/app/database/core/entities/account.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BIGINT_TRANSFORMER } from '../utils/transformers/bigint.transformer';
import { AuthorityImpl } from './impl.authority.entity';
import { ClientImpl } from './impl.client.entity';
import { PersonImpl } from './impl.person.entity';
import { SessionImpl } from './impl.session.entity';

@Entity('account')
export class AccountImpl implements Account {
  @Generated()
  @PrimaryColumn({
    name: 'id',
    type: 'bigint',
    transformer: BIGINT_TRANSFORMER,
    primaryKeyConstraintName: 'account_pk',
  })
  id!: bigint;

  @Column({ name: 'person_id', type: 'bigint' })
  personId!: bigint;

  @Column({ name: 'client_id', type: 'bigint' })
  clientId!: bigint;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date | null;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt!: Date | null;

  @ManyToOne(() => PersonImpl, person => person.accounts)
  @JoinColumn({
    name: 'person_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_person',
  })
  person!: PersonImpl;

  @ManyToOne(() => PersonImpl, person => person.accounts)
  @JoinColumn({
    name: 'client_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_client',
  })
  client!: ClientImpl;

  @OneToMany(() => AuthorityImpl, authority => authority.account)
  authorities!: AuthorityImpl[];

  @OneToMany(() => SessionImpl, session => session.account)
  sessions!: SessionImpl[];
}
