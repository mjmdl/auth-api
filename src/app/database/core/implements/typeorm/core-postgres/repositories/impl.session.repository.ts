import { Injectable } from '@nestjs/common';
import { SessionRepository } from 'src/app/database/repositories/session.repository';

@Injectable()
export class SessionRepositoryImpl implements SessionRepository {}
