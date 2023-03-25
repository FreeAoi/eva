import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator to get the current user from the request and attach it to the request
 *
 * @param data - Data passed to the decorator
 * @param ctx - The execution context
 * @returns The current user
 */
export const CurrentUser = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
);
