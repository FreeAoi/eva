import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import rest from '../../../rest';
import type { Role } from '../../../../types/next-auth';

export const AuthOptions: NextAuthOptions = {
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
                if (!credentials) {
                    throw new Error('Credenciales de usuario invalidas.');
                }

                const { data, ok } = await rest
                    .path('/api/auth/login')
                    .method('post')
                    .create()({
                        email: credentials.email,
                        password: credentials.password
                    });

                if (!ok) {
                    throw new Error('Credenciales de usuario invalidas.');
                }

                const { data: user } = await Promise.any([
                    rest.path('/api/student/me').method('get').create()(
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${data.access_token}`
                            }
                        }
                    ),
                    rest.path('/api/teacher').method('get').create()(
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${data.access_token}`
                            }
                        }
                    )
                ]);

                return {
                    id: user.id,
                    role: user.role as Role,
                    name: user.firstName,
                    email: user.email,
                    avatar: user.avatar,
                    acess_token: data.access_token
                };
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: ({ session, token }) => {
            if (token.user) {
                session.user = token.user;
            }
            return session;
        }
    }
};

export default NextAuth(AuthOptions);
