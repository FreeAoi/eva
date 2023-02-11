import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import restClient from '../../../src';

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
                const auth = await restClient.auth.authControllerLogin({
                    body: {
                        email: credentials?.email,
                        password: credentials?.password
                    }
                });

                if (!auth.accessToken) {
                    throw new Error('Credenciales de usuario invalidas.');
                }

                const student = await restClient.student.studentControllerGetMe({
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`
                    }
                });

                return {
                    id: student.id,
                    name: student.firstName,
                    email: student.email,
                    acess_token: auth.accessToken,
                    courses: student.group.courses.map((course) => ({
                        id: course.id,
                        name: course.name
                    }))
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
