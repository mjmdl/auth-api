import { Injectable } from '@nestjs/common';
import { PermissionRepository } from 'src/app/database/core/repositories/permission.repository';

@Injectable()
export class PermissionRepositoryImpl implements PermissionRepository {}
