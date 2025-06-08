import { Injectable } from '@nestjs/common';
import { PersonRepository } from 'src/app/database/core/repositories/person.repository';

@Injectable()
export class PersonRepositoryImpl implements PersonRepository {}
