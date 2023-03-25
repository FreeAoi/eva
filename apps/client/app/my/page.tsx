import { getServerSession } from 'next-auth';
import Link from 'next/link';
import CourseCard from './courseCard';
import { getUser } from '../../src/rest';
import { AuthOptions } from '../../src/pages/api/auth/[...nextauth]';
import type { components } from '../../src/rest/api';

export default async function MyScreen() {
    const session = await getServerSession(AuthOptions);
    if (!session) return null;

    const { data } = await getUser(session.user.role)(
        {},
        {
            headers: {
                Authorization: `Bearer ${session.user.acess_token}`
            }
        }
    );

    const courses =
        session.user.role === 'STUDENT'
            ? (data as components['schemas']['StudentDTO']).group.courses
            : (data as components['schemas']['TeacherDTO']).courses;

    return (
        <div>
            <div className="p-3 h-screen flex">
                <div className="w-full lg:w-4/5 m-1">
                    <h1 className="text-base sm:text-2xl text-indigo-900 font-regular">
                        Cursos del semestre actual
                    </h1>
                    <div>
                        {courses.map((course) => {
                            return (
                                <CourseCard
                                    name={course.name}
                                    id={course.id}
                                    key={course.id}
                                    career="Ingeniería en Sistemas Computacionales"
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="hidden lg:block w-1/5 border-l border-slate-300 px-2">
                    <div className="flex justify-between items-center">
                        <h1 className="text-indigo-900 text-2xl font-semibold">
                            Navegación
                        </h1>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-indigo-900"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                            />
                        </svg>
                    </div>
                    <div className="m-2">
                        <ul className="list-disc list-inside">
                            <li className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4 text-indigo-900"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                                    />
                                </svg>

                                <Link
                                    href="/"
                                    className="text-indigo-900 text-base pl-2 font-semibold"
                                >
                                    Area personal
                                </Link>
                            </li>
                            <li className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4 text-indigo-900"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                    />
                                </svg>

                                <Link href="/" className="text-indigo-900 text-base pl-2">
                                    Inicio del sitio
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
