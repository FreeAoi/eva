import '../styles/globals.css';
import Nav from './nav';
import Provider from './provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <Nav />

                    {children}
                </Provider>
            </body>
        </html>
    );
}
