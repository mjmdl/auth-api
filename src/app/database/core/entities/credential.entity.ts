import { Person } from './person.entity';

export interface Credential {
  id: bigint;
  personId: bigint;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;

  person: Person;
}
