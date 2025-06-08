import { ConflictException, NotFoundException } from '@nestjs/common';
import { CustomException } from 'src/common/exceptions/custom.exception';

export class ClientNotFound extends CustomException(
  NotFoundException,
  'CLIENT_NOT_FOUND',
  'The client was not found.',
) {}

export class NicknameIsTaken extends CustomException(
  ConflictException,
  'NICKNAME_IS_TAKEN',
  'The nickname is already taken by another client.',
) {}
