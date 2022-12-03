import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

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
                if (data.error) throw new Error(data.error);

                const student = await (
                    await fetch('http://localhost:3001/api/student', {
                        headers: {
                            Authorization: `Bearer ${data.access_token}`
                        }
                    })
                ).json();

                console.log(student);

                return {
                    id: student.id,
                    name: student.name,
                    email: student.email,
                    accessToken: data.access_token
                };
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            console.log('token', token);
            return token;
        },
        session: ({ session, token }) => {
            console.log('session', token);
            if (token.user) {
                session.user = token.user;
            }
            return session;
        }
    }
};

export default NextAuth(AuthOptions);
