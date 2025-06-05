import { Person } from 'src/app/database/entities/person.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BIGINT_TRANSFORMER } from '../utils/transformers/bigint.transformer';
import { AccountImpl } from './impl.account.entity';
import { CredentialImpl } from './impl.credential.entity';

@Entity('person')
export class PersonImpl implements Person {
  @Generated()
  @PrimaryColumn({
    name: 'id',
    type: 'bigint',
    transformer: BIGINT_TRANSFORMER,
    primaryKeyConstraintName: 'person_pk',
  })
  id!: bigint;

  @Column({ name: 'name', type: 'varchar' })
  name!: string;

  @Column({ name: 'email', type: 'varchar' })
  email!: string;

  @Column({ name: 'phone', type: 'varchar', nullable: true })
  phone!: string | null;

  @Column({ name: 'document', type: 'varchar', nullable: true })
  document!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date | null;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt!: Date | null;

  @OneToMany(() => AccountImpl, account => account.person)
  accounts!: AccountImpl[];

  @OneToMany(() => CredentialImpl, credential => credential.person)
  credentials!: CredentialImpl[];
}
