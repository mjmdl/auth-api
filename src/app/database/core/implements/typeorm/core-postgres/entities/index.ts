import { MixedList, EntitySchema } from 'typeorm';

export const CORE_POSTGRES_ENTITIES: MixedList<
  string | Function | EntitySchema<any>
> = [];
