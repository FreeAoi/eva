import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import logoUNI from '../public/logoUNI.png';
import Dynamic from 'next/dynamic';
const MyDropdown = Dynamic(() => import('./profileDropdown'));

export default function Nav() {
    const router = useRouter();
    const { status, data } = useSession();
    return (
        <nav className="flex items-center justify-between bg-blue-900 p-4 h-14">
            <div className="flex items-center">
                <Image src={logoUNI} alt="logo" width={45} height={45} />
                <span className="font-semibold text-xl tracking-tight ml-2 text-white">
                    Virtual
                </span>
            </div>
            {status === 'authenticated' && (
                <MyDropdown name={data.user.name} role={data.user.role} />
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
