import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import restClient from '../../..';
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
                const auth = await restClient.auth
                    .authControllerLogin({
                        body: {
                            email: credentials?.email,
                            password: credentials?.password
                        }
                    })
                    .catch(() => ({ accessToken: null }));

                if (!auth.accessToken) {
                    throw new Error('Credenciales de usuario invalidas.');
                }

                const user = await Promise.any([
                    restClient.student.studentControllerGetMe({
                        headers: {
                            Authorization: `Bearer ${auth.accessToken}`
                        }
                    }),
                    restClient.teacher.teacherControllerGetTeacher({
                        headers: {
                            Authorization: `Bearer ${auth.accessToken}`
                        }
                    })
                ]);
                console.log(user);
                return {
                    id: user.id,
                    role: user.role as Role,
                    name: user.firstName,
                    email: user.email,
                    avatar: user.avatar,
                    acess_token: auth.accessToken
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
