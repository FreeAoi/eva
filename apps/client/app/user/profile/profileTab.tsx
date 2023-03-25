'use client';

import { Tab } from '@headlessui/react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { components } from '../../../src/rest/api';

export default function ProfileTab(props: {
    user: components['schemas']['StudentDTO'];
    token: string;
}) {
    const [selectedFile, setSelectedFile] = useState<FileList | null>(null);
    const [description, setDescription] = useState(props.user.description || '');
    const [city, setCity] = useState(props.user.city || '');
    const [status, setStatus] = useState(false);
    const router = useRouter();

    const submit = async () => {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('city', city);
        if (selectedFile) {
            formData.append('avatar', selectedFile[0]);
        }

        // todo: change to use rest
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/me`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${props.token}`
            },
            body: formData
        });

        if (response.ok) {
            setStatus(true);
            router.push('/user/profile');
        }
    };

    return (
        <Tab.Group>
            <Tab.List className="flex h-auto gap-2 border-b-2 border-blue-900">
                <Tab
                    className={({ selected }) =>
                        `${
                            selected ? 'bg-blue-900 text-white' : 'bg-gray-300 text-black'
                        } py-2 px-4 outline-none`
                    }
                >
                    Sobre mí
                </Tab>
                <Tab
                    className={({ selected }) =>
                        `${
                            selected ? 'bg-blue-900 text-white' : 'bg-gray-300 text-black'
                        } py-2 px-4 outline-none`
                    }
                >
                    Cursos
                </Tab>
                <Tab
                    className={({ selected }) =>
                        `${
                            selected ? 'bg-blue-900 text-white' : 'bg-gray-300 text-black'
                        } py-2 px-4 outline-none`
                    }
                >
                    Editar perfil
                </Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel key="about">
                    <div className="p-4">
                        <h1 className="font-semibold">Descripcion</h1>
                        <p>
                            {props.user.description ||
                                'El usuario aún no ha actualizado su descripción.'}
                        </p>
                        <h1 className="font-semibold mt-4">Intereses</h1>
                        <p>El usuario aún no ha actualizado sus intereses.</p>
                        <h1 className="font-semibold mt-4">Departamento</h1>
                        {props.user.id}{' '}
                        {(props.user.career as Record<string, string>).name}
                    </div>
                </Tab.Panel>
                <Tab.Panel key="courses">
                    <div className="p-4">
                        <h1 className="font-semibold">Perfiles de curso</h1>
                        {props.user.group.courses.map((course) => (
                            <Link
                                href={{
                                    pathname: 'course/view',
                                    query: {
                                        id: course.id
                                    }
                                }}
                                key={course.id}
                                className="text-blue-900"
                            >
                                {course.name} ({props.user.group.id})
                            </Link>
                        ))}
                    </div>
                </Tab.Panel>
                <Tab.Panel key="edit">
                    <div className="p-4">
                        <h1 className="font-semibold">Editar perfil</h1>
                        <textarea
                            className="w-full h-40"
                            placeholder="Descripción"
                            value={description}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                setDescription(e.target.value)
                            }
                        />
                        <input
                            className="w-full h-10 border border-gray-700 px-2 outline-none rounded-lg"
                            value={city}
                            placeholder="Ciudad"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setCity(e.target.value)
                            }
                        />

                        <div className="my-3">
                            <h1 className="font-semibold">Imagen de usuario</h1>
                            <input
                                type="file"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setSelectedFile(e.target.files)
                                }
                            />
                        </div>
                        {status && (
                            <p className="text-green-800 my-2">
                                Cambios guardados correctamente, algunos cambios pueden
                                tardar en reflejarse.
                            </p>
                        )}
                        <button
                            className="bg-blue-900 text-white px-4 py-2 rounded-md"
                            onClick={() => submit()}
                        >
                            Guardar
                        </button>
                    </div>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
}
