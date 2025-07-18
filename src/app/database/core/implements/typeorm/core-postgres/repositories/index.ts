import { ClassProvider } from '@nestjs/common';
import { AccountRepository } from 'src/app/database/core/repositories/account.repository';
import { AuthorityRepository } from 'src/app/database/core/repositories/authority.repository';
import { ClientRepository } from 'src/app/api/client/models/client.repository';
import { CredentialRepository } from 'src/app/database/core/repositories/credential.repository';
import { PermissionRepository } from 'src/app/database/core/repositories/permission.repository';
import { PersonRepository } from 'src/app/database/core/repositories/person.repository';
import { SessionRepository } from 'src/app/database/core/repositories/session.repository';
import { AccountRepositoryImpl } from './impl.account.repository';
import { AuthorityRepositoryImpl } from './impl.authority.repository';
import { ClientRepositoryImpl } from './impl.client.repository';
import { CredentialRepositoryImpl } from './impl.credential.repository';
import { PermissionRepositoryImpl } from './impl.permission.repository';
import { PersonRepositoryImpl } from './impl.person.repository';
import { SessionRepositoryImpl } from './impl.session.repository';

export const CORE_POSTGRES_REPOSITORIES: ClassProvider[] = [
  {
    provide: AccountRepository,
    useClass: AccountRepositoryImpl,
  },
  {
    provide: AuthorityRepository,
    useClass: AuthorityRepositoryImpl,
  },
  {
    provide: ClientRepository,
    useClass: ClientRepositoryImpl,
  },
  {
    provide: CredentialRepository,
    useClass: CredentialRepositoryImpl,
  },
  {
    provide: PermissionRepository,
    useClass: PermissionRepositoryImpl,
  },
  {
    provide: PersonRepository,
    useClass: PersonRepositoryImpl,
  },
  {
    provide: SessionRepository,
    useClass: SessionRepositoryImpl,
  },
];
