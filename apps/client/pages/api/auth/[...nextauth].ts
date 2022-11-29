import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const AuthOptions: NextAuthOptions = {
    secret: 'secret',
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60
    },
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                const user = await fetch('http://localhost:3001/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                });

                const data = await user.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                return data.access_token;
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.accessToken = user;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token.accessToken) {
                session.user = token.accessToken;
            }
            return session;
        }
    }
};

export default NextAuth(AuthOptions);
