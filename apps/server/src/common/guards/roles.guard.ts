import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../constants/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    /**
     * Verifies if the user has the required role to access the route
     *
     * @param context - The execution context
     * @returns {boolean} - Whether the user has the required roles
     */
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = [
            ...this.reflector.getAllAndOverride<Role[]>('roles', [
                context.getHandler(),
                context.getClass()
            ]),
            Role.ADMIN
        ];
        if (!requiredRoles) return true;
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.includes(user.role);
    }
}
