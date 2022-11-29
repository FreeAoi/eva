import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Nav() {
    const router = useRouter();
    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-900 p-4">
            <div className="flex items-center text-white mr-6">
                <Image src="/logoUNI.png" alt="logo" width={50} height={50} />
                <span className="font-semibold text-xl tracking-tight ml-2">
                    Virtual
                </span>
            </div>
            {router.pathname != 'login' && (
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
