import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import type { Roles } from '../types/next-auth';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

interface Props {
    name: string;
    role: Roles;
}

export default function MyDropdown(data: Props) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex items-center text-white mr-6">
                    <Image
                        src="/avatar.png"
                        alt="avatar"
                        className="rounded-full w-auto h-auto"
                        width={30}
                        height={30}
                    />
                    <span className="font-normal text-base tracking-tight ml-2">
                        {data.name}
                    </span>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="/"
                                    className={classNames(
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    SoonTM
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Support
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    // href="/api/auth/signout"
                                    href="/api/auth/signout"
                                    className={classNames(
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Sign Out
                                </Link>
                            )}
                        </Menu.Item>
                        {data.role === 'ADMIN' && (
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        href="/admin"
                                        className={classNames(
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Admin
                                    </Link>
                                )}
                            </Menu.Item>
                        )}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
