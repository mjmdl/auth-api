import { ConflictException } from '@nestjs/common';

export class NicknameIsTaken extends ConflictException {
  static readonly TAG = 'NICKNAME_IS_TAKEN';
  static readonly BLURB = 'The nickname is already taken by another client.';

  constructor() {
    super({ tag: NicknameIsTaken.TAG, blurb: NicknameIsTaken.BLURB });
  }
}
