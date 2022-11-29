import type { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AuthOptions } from './api/auth/[...nextauth]';

export default function MyScreen(props: any) {
    const router = useRouter();
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login');
        }
    });

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    console.log(props);

    return (
        <div>
            <h1>My Screen</h1>
            <p>My name is {props.data.name}</p>
        </div>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        AuthOptions
    );
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }

    const data = await (
        await fetch('http://localhost:3001/api', {
            headers: {
                Authorization: `Bearer ${session?.user}`
            }
        })
    ).json();

    return {
        props: {
            data
        }
    };
}
