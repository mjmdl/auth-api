import { ValueTransformer } from 'typeorm';

export const BIGINT_TRANSFORMER: ValueTransformer = {
  from: (value: any): bigint | null => {
    if (value != null) {
      return BigInt(value);
    } else {
      return null;
    }
  },

  to: (value: bigint | null): string | null => {
    if (value != null) {
      return String(value);
    } else {
      return null;
    }
  },
};
