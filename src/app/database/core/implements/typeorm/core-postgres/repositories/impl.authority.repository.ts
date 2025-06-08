import { Injectable } from '@nestjs/common';
import { AuthorityRepository } from 'src/app/database/core/repositories/authority.repository';

@Injectable()
export class AuthorityRepositoryImpl implements AuthorityRepository {}
