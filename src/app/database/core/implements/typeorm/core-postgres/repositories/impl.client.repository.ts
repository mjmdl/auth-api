import { Injectable } from '@nestjs/common';
import { ClientRepository } from 'src/app/database/repositories/client.repository';

@Injectable()
export class ClientRepositoryImpl implements ClientRepository {}
