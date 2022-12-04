/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-interface */
import NextAuth, { DefaultSession, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

enum Roles {
    ADMIN = 'ADMIN',
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER'
}

declare module 'next-auth' {
    interface User {
        id: string;
        name: string;
        email: string;
        role: Roles;
        career: string;
        accessToken: string;
    }

    interface Session {
        user: User & DefaultSession['user'];
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        user: User & DefaultSession['user'];
        /*user: {
            id: string;
            accessToken: string;
        } & DefaultSession['user'];*/
    }
}
