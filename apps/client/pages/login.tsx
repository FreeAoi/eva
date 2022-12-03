import Head from 'next/head';
import React, { useState } from 'react';
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
    };

    return (
        <main>
            <Head>
                <title>Virtual</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex items-center justify-center h-screen">
                <div className="w-5/6 h-4/6 sm:max-w-sm">
                    <div className="bg-white shadow-md rounded p-7 border-x border-y border-slate-300">
                        <div className="mb-4">
                            <label
                                className="block text-gray-600 text-sm font-bold mb-1"
                                htmlFor="email"
                            >
                                Correo electronico
                            </label>
                            <input
                                className="transition duration-150 focus:border-indigo-500 focus:ring-indigo-500 mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label
                                className="block text-gray-600 text-sm font-bold mb-1"
                                htmlFor="password"
                            >
                                Contraseña
                            </label>
                            <input
                                className="transition duration-150 focus:border-indigo-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="***************"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="text-red-500 text-xs italic">
                                {error}
                            </p>

                            <button
                                className="transition duration-500 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                onClick={submitHandler}
                            >
                                Iniciar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
