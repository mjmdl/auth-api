import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/app/database/database.module';
import { ApiKeyModule } from 'src/libraries/api-key.module';
import { ClientService } from './services/client.service';
import { ClientController } from './controllers/client.controller';

@Module({
  imports: [ApiKeyModule, DatabaseModule],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
