'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import logoUNI from '../public/logoUNI.png';
import Dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
const NavDropdown = Dynamic(() => import('./navDropdown'));

export default function Nav() {
    const path = usePathname();
    const { status, data } = useSession();
    return (
        <nav className='flex items-center justify-between bg-blue-900 p-4 h-14'>
            <div className='flex items-center'>
                <Image
                    src={logoUNI}
                    alt='logo'
                    className='w-auto'
                    width={45}
                    height={45}
                />
                <span className='font-semibold text-xl tracking-tight ml-2 text-white'>
                    Virtual
                </span>
            </div>
            {status === 'authenticated' && (
                <NavDropdown name={data.user.name} avatar={data.user.avatar} />
            )}
            {path != '/login' && status == 'unauthenticated' && (
                <Link
                    href={'/login'}
                    className='bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded'
                >
                    Entrar
                </Link>
            )}
        </nav>
    );
}
