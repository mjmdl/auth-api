import { Transform } from 'class-transformer';
import { IsInt, IsPositive, ValidationOptions } from 'class-validator';

export function IsId(options?: ValidationOptions): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol): void => {
    Transform(params => {
      IsInt(options)(target, propertyKey);
      IsPositive(options)(target, propertyKey);

      try {
        return BigInt(params.value);
      } catch (error) {
        return Number.NaN;
      }
    });
  };
}
