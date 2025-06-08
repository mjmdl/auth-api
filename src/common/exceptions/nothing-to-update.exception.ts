import { BadRequestException } from '@nestjs/common';

export class NothingToUpdate extends BadRequestException {
  static readonly TAG = 'NOTHING_TO_UPDATE';
  static readonly BLURB = 'No field is provided to update.';

  constructor() {
    super({ tag: NothingToUpdate.TAG, blurb: NothingToUpdate.BLURB });
  }
}
