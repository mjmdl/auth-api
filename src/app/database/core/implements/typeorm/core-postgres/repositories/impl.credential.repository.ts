import { Injectable } from '@nestjs/common';
import { CredentialRepository } from 'src/app/database/repositories/credential.repository';

@Injectable()
export class CredentialRepositoryImpl implements CredentialRepository {}
