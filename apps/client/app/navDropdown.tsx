'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function NavDropdown(data: { name: string; avatar: string }) {
    return (
        <Menu as='div' className='relative inline-block text-left'>
            <div>
                <Menu.Button className='flex items-center text-white mr-6'>
                    <Image
                        src={data.avatar}
                        alt='avatar'
                        className='w-auto rounded-full'
                        width={30}
                        height={30}
                        priority
                    />
                    <span className='font-normal text-base tracking-tight ml-2'>
                        {data.name}
                    </span>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='py-1'>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href='/my'
                                    className={classNames(
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Area personal
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href='/user/profile'
                                    className={classNames(
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Ver perfil
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href='/api/auth/signout?callbackUrl=/'
                                    className={classNames(
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Cerrar sesión
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
