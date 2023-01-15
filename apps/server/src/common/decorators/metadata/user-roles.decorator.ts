import { SetMetadata } from '@nestjs/common';
import type { Role } from '../../constants/roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
