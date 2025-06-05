import { Credential } from 'src/app/database/entities/credential.entity';
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
import { PersonImpl } from './impl.person.entity';

@Entity('credential')
export class CredentialImpl implements Credential {
  @Generated()
  @PrimaryColumn({
    name: 'id',
    type: 'bigint',
    transformer: BIGINT_TRANSFORMER,
    primaryKeyConstraintName: 'credential_pk',
  })
  id!: bigint;

  @Column({
    name: 'person_id',
    type: 'bigint',
    transformer: BIGINT_TRANSFORMER,
  })
  personId!: bigint;

  @Column({ name: 'password', type: 'varchar' })
  password!: string;

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
}
