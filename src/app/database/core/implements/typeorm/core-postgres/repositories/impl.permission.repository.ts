import { Injectable } from '@nestjs/common';
import { PermissionRepository } from 'src/app/database/repositories/permission.repository';

@Injectable()
export class PermissionRepositoryImpl implements PermissionRepository {}
