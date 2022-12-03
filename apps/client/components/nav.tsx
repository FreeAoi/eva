import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Nav() {
    const router = useRouter();
    const { status, data } = useSession();
    return (
        <nav className="flex items-center justify-between bg-blue-900 p-4 h-14">
            <div className="flex items-center">
                <Image
                    priority
                    src="/logoUNI.png"
                    alt="logo"
                    width={45}
                    height={45}
                    decoding="async"
                />
                <span className="font-semibold text-xl tracking-tight ml-2 text-white">
                    Virtual
                </span>
            </div>
            {status === 'authenticated' && (
                <Link className="flex items-center text-white mr-6" href="/my">
                    <Image
                        src="/avatar.png"
                        alt="avatar"
                        className="rounded-full w-auto h-auto"
                        width={30}
                        height={30}
                    />
                    <span className="font-normal text-base tracking-tight ml-2">
                        {data.user.name}
                    </span>
                </Link>
            )}
            {router.pathname != 'login' && status == 'unauthenticated' && (
                <div>
                    <Link
                        href="/login"
                        className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Entrar
                    </Link>
                </div>
            )}
        </nav>
    );
}
