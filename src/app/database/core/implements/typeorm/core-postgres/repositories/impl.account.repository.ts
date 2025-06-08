import { Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/app/database/core/repositories/account.repository';

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {}
