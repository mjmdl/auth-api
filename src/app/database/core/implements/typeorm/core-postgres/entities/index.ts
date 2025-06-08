import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { AccountImpl } from './impl.account.entity';
import { AuthorityImpl } from './impl.authority.entity';
import { ClientImpl } from './impl.client.entity';
import { CredentialImpl } from './impl.credential.entity';
import { PermissionImpl } from './impl.permission.entity';
import { PersonImpl } from './impl.person.entity';
import { SessionImpl } from './impl.session.entity';

export const CORE_POSTGRES_ENTITIES: EntityClassOrSchema[] = [
  AccountImpl,
  AuthorityImpl,
  ClientImpl,
  CredentialImpl,
  PermissionImpl,
  PersonImpl,
  SessionImpl,
];
