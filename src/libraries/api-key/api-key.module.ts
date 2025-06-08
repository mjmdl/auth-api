import { Module } from '@nestjs/common';
import { ApiKeyService } from './services/api-key.service';

@Module({
  providers: [ApiKeyService],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}
