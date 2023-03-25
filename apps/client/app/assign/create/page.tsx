'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AssignCreatePage({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const { data: session } = useSession();
    const courseId = searchParams.course as string;

    const [taskName, setTaskName] = useState('');
    const [taskScore, setTaskScore] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const router = useRouter();
    console.log(courseId);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!session) return;
        if (!taskName || !taskScore || !taskDueDate) return;
        const formData = new FormData();
        formData.append('title', taskName);
        formData.append('maxScore', taskScore);
        formData.append('dueDate', new Date(taskDueDate).toISOString());

        // TODO change to use rest
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/task?courseId=${courseId}`,
            {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${session.user.acess_token}`
                }
            }
        );

        const data = await res.json();
        console.log(data);
        router.push(`/course/view?id=${courseId}&tabIndex=4`);
    };

    return (
        <div className="w-full max-w-md mx-auto mt-8">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="taskName"
                    >
                        Nombre de la tarea
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="taskName"
                        type="text"
                        placeholder="Escribe el nombre de la tarea"
                        value={taskName}
                        onChange={(event) => setTaskName(event.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="taskScore"
                    >
                        Puntaje de la tarea
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="taskScore"
                        type="number"
                        placeholder="Escribe el puntaje de la tarea"
                        value={taskScore}
                        onChange={(event) => setTaskScore(event.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="taskDueDate"
                    >
                        Fecha de finalización de la tarea
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="taskDueDate"
                        type="date"
                        placeholder="Selecciona la fecha de finalización de la tarea"
                        value={taskDueDate}
                        onChange={(event) => setTaskDueDate(event.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Crear tarea
                    </button>
                </div>
            </form>
        </div>
    );
}
