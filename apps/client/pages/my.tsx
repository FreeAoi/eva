import type { GetServerSidePropsContext } from 'next';
import { getToken } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Nav from '../components/nav';

interface DataProps {
    courses: string[];
}

export default function MyScreen(props: { data: DataProps }) {
    const { data } = useSession();
    console.log(props.data.courses);
    return (
        <main>
            <Head>
                <title>Virtual</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />
        </main>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getToken({ req: context.req });

    const data = await (
        await fetch('http://localhost:3001/api/student/courses', {
            headers: {
                Authorization: `Bearer ${session?.user.accessToken}`
            }
        })
    ).json();

    return {
        props: {
            data
        }
    };
}
