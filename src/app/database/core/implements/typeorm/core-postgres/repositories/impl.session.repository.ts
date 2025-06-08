import { Injectable } from '@nestjs/common';
import { SessionRepository } from 'src/app/database/core/repositories/session.repository';

@Injectable()
export class SessionRepositoryImpl implements SessionRepository {}
