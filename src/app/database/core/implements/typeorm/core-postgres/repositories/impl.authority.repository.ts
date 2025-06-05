import { Injectable } from '@nestjs/common';
import { AuthorityRepository } from 'src/app/database/repositories/authority.repository';

@Injectable()
export class AuthorityRepositoryImpl implements AuthorityRepository {}
