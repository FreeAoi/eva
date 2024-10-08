'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import rest from '../../../src/rest';
import { useSearchParams } from 'next/navigation';

export default function AssignCreatePage() {
    const { data: session } = useSession();
    const params = useSearchParams();

    const [taskName, setTaskName] = useState('');
    const [taskScore, setTaskScore] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const router = useRouter();
    console.log(params.get('course'));

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!session) return;
        if (!taskName || !taskScore || !taskDueDate) return;
        const formData = new FormData();
        formData.append('title', taskName);
        formData.append('maxScore', taskScore);
        formData.append('dueDate', new Date(taskDueDate).toISOString());
        formData.append('courseId', params.get('course') as string);
        console.log(formData.get('courseId'));

        await rest.path('/api/task').method('post').create({
            courseId: 1,
        })(formData, {
            headers: {
                Authorization: `Bearer ${session.user.acess_token}`,
            },
        });

        router.push(`/course/view?id=${params.get('course')}&tabIndex=4`);
    };

    return (
        <div className='w-full max-w-md mx-auto mt-8'>
            <form
                onSubmit={handleSubmit}
                className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
            >
                <div className='mb-4'>
                    <label
                        className='block text-gray-700 font-bold mb-2'
                        htmlFor='taskName'
                    >
                        Nombre de la tarea
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='taskName'
                        type='text'
                        placeholder='Escribe el nombre de la tarea'
                        value={taskName}
                        onChange={(event) => setTaskName(event.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label
                        className='block text-gray-700 font-bold mb-2'
                        htmlFor='taskScore'
                    >
                        Puntaje de la tarea
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='taskScore'
                        type='number'
                        placeholder='Escribe el puntaje de la tarea'
                        value={taskScore}
                        onChange={(event) => setTaskScore(event.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label
                        className='block text-gray-700 font-bold mb-2'
                        htmlFor='taskDueDate'
                    >
                        Fecha de finalización de la tarea
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='taskDueDate'
                        type='date'
                        placeholder='Selecciona la fecha de finalización de la tarea'
                        value={taskDueDate}
                        onChange={(event) => setTaskDueDate(event.target.value)}
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='submit'
                    >
                        Crear tarea
                    </button>
                </div>
            </form>
        </div>
    );
}
