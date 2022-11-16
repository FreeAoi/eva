import Head from 'next/head';
import Image from 'next/image';
import Nav from '../components/nav';

export default function Home() {
    return (
        <div className="overflow-hidden">
            <Head>
                <title>Virtual</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />

            <main className="p-3 h-screen">
                <div className="flex">
                    <div className="w-1/12 bg-blue-900 p-2">
                        <h1 className="text-white text-center font-bold">
                            ANUNCIOS
                        </h1>
                    </div>
                    <div className="w-11/12 bg-slate-200 p-2">
                        <h2 className="text-black">
                            No hay anuncios para mostrar
                        </h2>
                    </div>
                </div>

                <div className="flex mt-5 h-full">
                    <div className="w-9/12 flex justify-center items-center h-3/4">
                        <Image
                            src="/PagPpal.png"
                            alt="pagPpal"
                            width={800}
                            height={200}
                            className="w-auto"
                        />
                    </div>

                    <div className="w-3/12">
                        {/* dotted line */}
                        <hr className="border-2 border-dotted border-gray-500" />
                        <div className="flex justify-between items-center">
                            <h1 className="text-indigo-900 text-3xl">
                                Navegación
                            </h1>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-indigo-900"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                                />
                            </svg>
                        </div>
                        <div className="mt-2">
                            <ul className="list-disc list-inside">
                                <li className="flex items-center cursor-pointer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 text-indigo-900"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                                        />
                                    </svg>
                                    <p className="text-indigo-900 text-base pl-2">
                                        Pagina Principal
                                    </p>
                                </li>
                                <li className="flex items-center cursor-pointer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 text-indigo-900"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                        />
                                    </svg>
                                    <p className="text-indigo-900 text-base pl-2">
                                        Anuncios de la Pagina
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-blue-900 p-6">
            </footer>
        </div>
    );
}
