import type { Role } from '@prisma/client';

export interface JWTPayload {
    email: string;
    id: string;
    role: Role;
}
