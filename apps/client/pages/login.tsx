import Head from 'next/head';
import React, { useState } from 'react';
import Nav from '../components/nav';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Por favor, preencha todos os campos');
            return;
        }

        const data = await signIn('credentials', {
            redirect: false,
            email,
            password
        });
        if (data?.error) {
            setError(data.error);
        } else {
            router.push('/my');
        }
        console.log(data);
    };

    return (
        <div>
            <Head>
                <title>Virtual</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />

            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-md">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="******************"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="text-red-500 text-xs italic">
                                {error}
                            </p>

                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={submitHandler}
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
