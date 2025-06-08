import { BadRequestException } from '@nestjs/common';

type ExceptionBase = new (...args: any[]) => object;

export interface ExceptionStatic {
  readonly TAG: string;
  readonly BLURB: string;
}

export function CustomException<Base extends ExceptionBase>(
  BaseClass: Base,
  tag: string,
  blurb: string,
): Base & ExceptionStatic {
  return class Exception extends BaseClass {
    static readonly TAG = tag;
    static readonly BLURB = blurb;

    constructor(..._args: any[]) {
      super({ tag: Exception.TAG, blurb: Exception.BLURB });
    }
  } as Base & ExceptionStatic;
}

export class NothingToUpdate extends CustomException(
  BadRequestException,
  'NOTHING_TO_UPDATE',
  'No field is provided to update.',
) {}
