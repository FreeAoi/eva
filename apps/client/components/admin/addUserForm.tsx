import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function addUserForm() {
    const { data: session } = useSession();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [career, setCareer] = useState('');
    const [role, setRole] = useState('STUDENT');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const submitUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError('');
        if (!id || !name || !email || !password || !career) {
            setError('Todos los campos son obligatorios');
            return;
        }

        const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.user.accessToken}`
            },
            body: JSON.stringify({
                id,
                name,
                email,
                password,
                career,
                role
            })
        });

        const res = await data.json();
        if (res.error) {
            setError(res.error);
        } else {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 1500);
        }
    };

    return (
        <div className="p-3">
            {/* two columns form */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Error</strong>
                    <span className="block sm:inline px-1 text-sm">{error}</span>
                </div>
            )}
            {success && (
                <div className="fixed bottom-0 right-0 p-3">
                    <div className="bg-green-500 text-white px-3 py-2 rounded shadow-lg">
                        <p>Usuario creado con éxito</p>
                    </div>
                </div>
            )}
            <div className="flex flex-col lg:flex-row justify-between">
                <div className="w-full lg:w-2/5">
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                ID de Estudiante
                            </label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                                onChange={(e) => setId(e.target.value)}
                            />
                            <label
                                htmlFor="name"
                                className="text-sm font-medium text-gray-700"
                            >
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                                onChange={(e) => setName(e.target.value)}
                            />

                            <label className="text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label className="text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <label className="text-sm font-medium text-gray-700">
                                Rol
                            </label>
                            <select
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                                onChange={(e) => setRole(e.target.value.toUpperCase())}
                            >
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-2/5">
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                Carrera
                            </label>
                            <input
                                id="career"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                                onChange={(e) => setCareer(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md"
                    onClick={submitUser}
                >
                    Guardar
                </button>
            </div>
        </div>
    );
}
