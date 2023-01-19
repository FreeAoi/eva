import { SetMetadata } from '@nestjs/common';
import type { Role } from '../../constants/roles.enum';

/**
 * Decorator to set the roles for a route
 *
 * @param roles - The roles that can access the route
 * @returns Roles metadata
 */
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
