import { MixedList } from 'typeorm';
import { Init1749072458488 } from './1749072458488-init.migration';

export const CORE_POSTGRES_MIGRATIONS: MixedList<Function | string> = [
  Init1749072458488,
];
