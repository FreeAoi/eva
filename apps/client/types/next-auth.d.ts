/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-interface */
import NextAuth, { DefaultSession, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface User {
        id: string;
        name: string;
        email: string;
        acess_token: string;
        courses: {
            id: string;
            name: string;
        }[];
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
