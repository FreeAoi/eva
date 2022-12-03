import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Nav from '../components/nav';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <Nav />

            <div className="h-11/12">
                <Component {...pageProps} />
            </div>
        </SessionProvider>
    );
}
