/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-interface */
import NextAuth, { DefaultSession, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import type { CourseInGroupInStudent } from '../src/rest';

export enum Role {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
}

declare module 'next-auth' {
    interface User {
        id: string;
        name: string;
        email: string;
        avatar: string;
        role: Role;
        acess_token: string;
    }

    interface Session {
        user: User & DefaultSession['user'];
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        user: User & DefaultSession['user'];
    }
}
