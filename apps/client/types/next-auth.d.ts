/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            accessToken: string;
        } & DefaultSession['user'];
    }

    interface User {
        id: string;
        name: string;
        email: string;
        accessToken: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        user: {
            id: string;
            accessToken: string;
        } & DefaultSession['user'];
    }
}
