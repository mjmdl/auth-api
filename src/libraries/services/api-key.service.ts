import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class ApiKeyService {
  create(): string {
    return randomBytes(64).toString('base64');
  }
}
