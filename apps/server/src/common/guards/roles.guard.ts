import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import type { JWTPayload } from '../../authentication/dto/jwt-payload.dto';

@Injectable()
export class RoleGuard implements CanActivate {
    /**
     * Checks if the user is an employee like a teacher or an admin
     *
     * @param context - The execution context
     * @returns {boolean} - Whether the user has the required roles
     */
    canActivate(context: ExecutionContext): boolean {
        const { user }: { user: JWTPayload } = context
            .switchToHttp()
            .getRequest();

        return user.role !== 'STUDENT';
    }
}
