import { NotFoundException } from '@nestjs/common';

export class ClientNotFound extends NotFoundException {
  static readonly TAG = 'CLIENT_NOT_FOUND';
  static readonly BLURB = 'The client was not found.';

  constructor() {
    super({ tag: ClientNotFound.TAG, blurb: ClientNotFound.BLURB });
  }
}
