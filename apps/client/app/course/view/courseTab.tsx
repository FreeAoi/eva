'use client';

import { Tab } from '@headlessui/react';
import type { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import type { components } from '../../../src/rest/api';

interface CourseTabProps {
    course: components['schemas']['CourseDTO'];
    session: Session;
    index: number;
}

export default function CourseTab(props: CourseTabProps) {
    const deleteTask = async (id: number) => {
        console.log(id);
    };
    return (
        <Tab.Group defaultIndex={props.index}>
            <Tab.List className="flex space-x-1 h-auto justify-center my-2">
                <Tab
                    className={({ selected }) =>
                        `${
                            selected
                                ? 'bg-white text-black focus:outline-none border-b-2 border-indigo-700'
                                : 'hover:bg-slate-100 rounded-lg'
                        } font-semibold py-2 px-4 text-lg`
                    }
                >
                    Acerca
                </Tab>
                <Tab
                    className={({ selected }) =>
                        `${
                            selected
                                ? 'bg-white text-black focus:outline-none border-b-2 border-indigo-700'
                                : 'hover:bg-slate-100 rounded-lg'
                        } font-semibold py-2 px-4 text-lg`
                    }
                >
                    Ruta de Aprendizaje
                </Tab>
                <Tab
                    className={({ selected }) =>
                        `${
                            selected
                                ? 'bg-white text-black focus:outline-none border-b-2 border-indigo-700'
                                : 'hover:bg-slate-100 rounded-lg'
                        } font-semibold py-2 px-4 text-lg `
                    }
                >
                    Recursos
                </Tab>
                <Tab
                    className={({ selected }) =>
                        `${
                            selected
                                ? 'bg-white text-black focus:outline-none border-b-2 border-indigo-700'
                                : 'hover:bg-slate-100 rounded-lg'
                        } font-semibold py-2 px-4 text-lg`
                    }
                >
                    Actividades
                </Tab>
                <Tab
                    className={({ selected }) =>
                        `${
                            selected
                                ? 'bg-white text-black focus:outline-none border-b-2 border-indigo-700'
                                : 'hover:bg-slate-100 rounded-lg'
                        } font-semibold py-2 px-4 text-lg`
                    }
                >
                    Evaluaciones
                </Tab>
            </Tab.List>
            <Tab.Panels className="bg-gray-100/20 border border-gray-300 mx-5 min-h-screen">
                <Tab.Panel key="about">
                    <div className="p-5">
                        <div className="w-full h-32 relative mb-2">
                            <Image
                                src={'https://i.imgur.com/qoVmPrc.gif'}
                                fill
                                alt={'xd'}
                            />
                        </div>
                        <h1 className="text-xl font-bold">Información del curso</h1>
                        <div className="my-3">
                            {props.course.about || (
                                <div>
                                    <p>
                                        Estimados estudiantes:
                                        <br />
                                        <br />
                                        Bienvenidos al curso {props.course.name} en su
                                        Entorno Virtual de Aprendizaje EVA, que la
                                        Universidad Nacional de Ingeniería pone a tu
                                        disposición en el proceso de aprendizaje con el
                                        aprovechamiento de las Tic. En el curso
                                        aprenderás… para dar cumplimientos de los
                                        objetivos…
                                        <br />
                                        <br />
                                    </p>
                                    <p className="text-orange-500">
                                        El docente podrá modificar o agregar esta
                                        información conforme a su asignatura…
                                    </p>
                                </div>
                            )}
                        </div>

                        <h1 className="text-xl font-bold">Objetivos del curso</h1>
                        <div className="my-3">
                            <p>
                                En este apartado el profesor deberá agregar el objetivo
                                general y los específicos del programa de asignatura{' '}
                                {props.course.name}
                            </p>
                            <div className="mt-4">
                                <h1 className="text-lg font-bold mb-2">
                                    Objetivo general
                                </h1>
                                {props.course.generalObjective || (
                                    <p>Contenido del objetivo general</p>
                                )}
                            </div>
                            <div className="mt-4">
                                <h1 className="text-lg font-bold mb-2">
                                    Objetivos específicos
                                </h1>
                                {props.course.specificObjective || (
                                    <p>Contenido de los objetivos específicos</p>
                                )}
                            </div>
                        </div>
                    </div>
                </Tab.Panel>
                <Tab.Panel key="aprendizaje">
                    <div className="p-5">
                        <h1 className="text-2xl font-bold">Ruta de aprendizaje</h1>
                        <p>No se que va a aqui xd</p>
                    </div>
                </Tab.Panel>
                <Tab.Panel key="recursos">
                    <div className="p-5">
                        <h1 className="text-2xl font-bold">Recursos</h1>
                        <p>No se que va a aqui xd</p>
                    </div>
                </Tab.Panel>
                <Tab.Panel key="actividades">
                    <div className="p-5">
                        <h1 className="text-2xl font-bold">Actividades</h1>
                        <p>No se que va a aqui xd</p>
                    </div>
                </Tab.Panel>
                <Tab.Panel key="evaluaciones">
                    <div className="p-5">
                        <h1 className="text-lg font-bold">Estimados Estudiantes;</h1>
                        <p className="text-gray-700 my-4">
                            En esta parte comprobaras tus habilidades y destreza, para la
                            realización de actividades evaluativas en la que se debe de
                            planificar, desarrollar, entregar y resolver las asignaciones
                            correspondientes al curso de MATEMATICA I PARA COMPUTACION,
                            para los futuros Ingenieros y Arquitectos UNI.
                        </p>
                        <div>
                            {props.course.tasks.map((task) => (
                                <Link
                                    key={task.id}
                                    className="my-2 flex flex-row"
                                    href={{
                                        pathname:
                                            props.session.user.role === 'TEACHER'
                                                ? '/assign/submissions'
                                                : '/assign/view',
                                        query: { id: task.id }
                                    }}
                                    prefetch={false}
                                >
                                    <div className="border-indigo-700 border-r-2 h-auto w-1" />
                                    <div className="border-dotted border-b-2 border-gray-400 w-full mx-2">
                                        <div className="flex justify-between">
                                            <div>
                                                <div className="flex flex-row w-full gap-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-6 h-6 text-indigo-700"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                                                        />
                                                    </svg>
                                                    <h1 className="text-indigo-700 font-semibold">
                                                        {task.title}
                                                    </h1>
                                                </div>
                                                <h2 className="text-gray-700 text-sm my-2">
                                                    {new Date(task.dueDate).getTime() >
                                                    Date.now()
                                                        ? `Fecha de entrega: ${new Date(
                                                            task.dueDate
                                                        ).toLocaleDateString()}`
                                                        : `Fecha de entrega: ${new Date(
                                                            task.dueDate
                                                        ).toLocaleDateString()} (Vencido)`}
                                                </h2>
                                            </div>
                                            {props.session?.user.role === 'TEACHER' && (
                                                <div className="flex flex-row gap-2 items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-7 h-7 text-red-400 hover:bg-slate-300 rounded-full"
                                                        onClick={() =>
                                                            deleteTask(task.id)
                                                        }
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {props.session?.user.role === 'TEACHER' && (
                            <div className="flex flex-row gap-2 mt-4">
                                <Link
                                    href={{
                                        pathname: '/assign/create',
                                        query: { course: props.course.id }
                                    }}
                                >
                                    <button className="bg-indigo-700 text-white px-4 py-2 rounded-md">
                                        Crear tarea
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
}
