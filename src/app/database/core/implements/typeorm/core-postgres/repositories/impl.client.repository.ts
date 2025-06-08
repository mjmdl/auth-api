import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ClientCreatedRecord,
  ClientFoundRecord,
  ClientsListRecord,
  ClientsPageRecord,
  CreateClientData,
  PageClientsData,
  UpdateClientData,
} from 'src/app/api/client/models/client-repository.interface';
import { ClientRepository } from 'src/app/api/client/models/client.repository';
import { CoreDatabaseSettingsService } from 'src/app/settings/services/core-database-settings.service';
import { ILike, Repository } from 'typeorm';
import { CORE_POSTGRES_CONNECTION } from '../configs/postgres.config';
import { ClientImpl } from '../entities/impl.client.entity';

@Injectable()
export class ClientRepositoryImpl implements ClientRepository {
  private readonly SCHEMA: string;

  constructor(
    @InjectRepository(ClientImpl, CORE_POSTGRES_CONNECTION)
    private readonly clientRepository: Repository<ClientImpl>,

    settings: CoreDatabaseSettingsService,
  ) {
    this.SCHEMA = settings.getSchema();
  }

  async create(client: CreateClientData): Promise<ClientCreatedRecord> {
    const insertResult = await this.clientRepository.insert({
      name: client.name,
      nickname: client.nickname,
      blurb: client.blurb,
      apiKey: client.apiKey,
    });
    return { id: insertResult.identifiers[0].id };
  }

  async update(id: bigint, changes: UpdateClientData): Promise<void> {
    await this.clientRepository.update(
      { id },
      {
        name: changes.name,
        nickname: changes.nickname,
        blurb: changes.blurb,
        apiKey: changes.apiKey,
      },
    );
  }

  async softDelete(id: bigint): Promise<void> {
    await this.clientRepository.softDelete({ id });
  }

  async hardDelete(id: bigint): Promise<void> {
    await this.clientRepository.delete({ id });
  }

  async find(id: bigint): Promise<ClientFoundRecord | null> {
    return this.clientRepository.findOne({
      select: {
        id: true,
        name: true,
        nickname: true,
        blurb: true,
        apiKey: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id },
    });
  }

  async list(): Promise<ClientsListRecord> {
    return this.clientRepository
      .createQueryBuilder('client')
      .select('client.id', 'id')
      .addSelect('client.nickname', 'nickname')
      .getRawMany();
  }

  async page(pageable: PageClientsData): Promise<ClientsPageRecord> {
    return this.clientRepository.manager.query(
      sql`
        WITH cte_params AS (
          SELECT
            $1::INT AS index,
            $2::INT AS length,
            ARRAY(
              SELECT '%' || word || '%' 
              FROM UNNEST(STRING_TO_ARRAY($3::TEXT, ' ')) word
            )::TEXT[] AS search_words
        ),

        cte_client AS (
          SELECT
            client.id AS "id",
            client.name AS "name",
            client.nickname AS "nickname",
            client.blurb AS "blurb",
            client.created_at AS "createdAt",
            client.updated_at AS "updatedAt"
          FROM ${this.SCHEMA}.client
          CROSS JOIN cte_params
          WHERE client.deleted_at IS NULL
            AND (
              cte_params.search_words IS NULL OR NOT EXISTS (
                SELECT 1
                FROM UNNEST(cte_params.search_words) AS word
                WHERE NOT client.name ILIKE word
                  AND NOT client.nickname ILIKE word
                  AND NOT client.blurb ILIKE word
              )
            )
        ),

        cte_clients AS (
          SELECT COUNT(1) AS total_count 
          FROM cte_client
        ),

        cte_data AS (
          SELECT JSON_AGG(ROW_TO_JSON(client.*)) AS items
          FROM (
            SELECT *
            FROM cte_client
            LIMIT (SELECT length FROM cte_params)
            OFFSET (SELECT index * length FROM cte_params)
          ) client
        ),

        cte_meta AS (
          SELECT JSON_BUILD_OBJECT(
            'index', cte_params.index,
            'length', cte_params.length,
            'lastIndex', COALESCE(CEIL(cte_clients.total_count / cte_params.length), -1),
            'totalCount', cte_clients.total_count
          ) AS item
          FROM cte_params
          CROSS JOIN cte_clients
        )

        SELECT
          cte_meta.item AS "meta",
          COALESCE(cte_data.items, '[]'::JSON) AS "data"
        FROM cte_meta
        CROSS JOIN cte_data
      `,
      [pageable.index, pageable.length, pageable.search],
    );
  }

  async exists(id: bigint): Promise<boolean> {
    return this.clientRepository.existsBy({ id });
  }

  async nicknameExists(nickname: string): Promise<boolean> {
    return this.clientRepository.existsBy({ nickname: ILike(nickname) });
  }

  async apiKeyExists(apiKey: string): Promise<boolean> {
    return this.clientRepository.existsBy({ apiKey });
  }
}
