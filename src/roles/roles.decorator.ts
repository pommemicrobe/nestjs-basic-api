import { SetMetadata } from '@nestjs/common';

import { Roles as ExistingRoles } from './roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ExistingRoles[]) =>
  SetMetadata(ROLES_KEY, roles);
