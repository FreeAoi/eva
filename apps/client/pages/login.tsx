import Head from 'next/head';
import { useState } from 'react';
import Nav from '../components/nav';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
        } catch (err) {
            //setError(err.response.data.message);
            setLoading(false);
        }
    };

    return (
        <div>
            <Head>
                <title>Virtual</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />

            {/* login screen tailwind css */}
            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-md">
                    <form
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                        onSubmit={() => submitHandler}
                    >
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
                                type="submit"
                            >
                                Sign In
                            </button>

                            <p className="text-center text-gray-500 text-xs">
                                &copy;2021 Virtual. All rights reserved.
                            </p>

                            <p className="text-center text-gray-500 text-xs">
                                <a
                                    className="text-blue-500 hover:text-blue-800"
                                    href="/register"
                                >
                                    Create an account
                                </a>
                            </p>

                            <p className="text-center text-gray-500 text-xs">
                                <a
                                    className="text-blue-500 hover:text-blue-800"
                                    href="/forgotpassword"
                                >
                                    Forgot Password?
                                </a>
                            </p>

                            <p className="text-center text-gray-500 text-xs">
                                <a
                                    className="text-blue-500 hover:text-blue-800"
                                    href="/"
                                >
                                    Back to Home
                                </a>
                            </p>

                            <p className="text-center text-gray-500 text-xs">
                                <a
                                    className="text-blue-500 hover:text-blue-800"
                                    href="/about"
                                >
                                    About
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
