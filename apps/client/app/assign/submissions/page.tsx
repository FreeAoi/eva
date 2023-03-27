import { getServerSession } from 'next-auth';
import rest from '../../../src/rest';
import { AuthOptions } from '../../../src/pages/api/auth/[...nextauth]';
import QualifyModal from './qualifyModal';
export default async function TaskSubmissionsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const session = await getServerSession(AuthOptions);
    const taskId = searchParams.id as string;
    const { data: submissions } = await rest
        .path('/api/task/{taskId}/submissions')
        .method('get')
        .create()(
        {
            taskId,
        },
        {
            headers: {
                Authorization: `Bearer ${session?.user.acess_token}`,
            },
        }
    );

    return (
        <div className='bg-gray-100 min-h-screen'>
            <header className='bg-white shadow-lg'>
                <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
                    <h1 className='text-xl font-bold leading-tight text-gray-900'>
                        Lista de entregas de tarea con la tarea con id {taskId}
                    </h1>
                </div>
            </header>
            <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
                <div className='px-4 py-6 sm:px-0'>
                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                    Student Id
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                    Files
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                    Score
                                </th>
                                <th scope='col' className='relative px-6 py-3'>
                                    <span className='sr-only'>Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {submissions.map((submission) => (
                                <tr key={submission.id}>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                        {submission.studentId}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-900'>
                                            <a
                                                href={
                                                    submission.attachments[0]
                                                        .url
                                                }
                                                className='text-indigo-600'
                                            >
                                                {submission.attachments[0].name}
                                            </a>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                submission.teacher
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {submission.teacher
                                                ? submission.score
                                                : 'Not graded'}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                        <QualifyModal
                                            accessToken={
                                                session?.user
                                                    .acess_token as string
                                            }
                                            taskId={parseInt(taskId)}
                                            submissionId={submission.id}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
