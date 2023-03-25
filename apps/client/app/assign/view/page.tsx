import { getServerSession } from 'next-auth';
import rest from '../../../src/rest';
import { AuthOptions } from '../../../src/pages/api/auth/[...nextauth]';
import humanizeDuration from 'humanize-duration';
import dynamic from 'next/dynamic';

const MyModal = dynamic(() => import('./uploadModal'));

export default async function ViewCourse({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const session = await getServerSession(AuthOptions);

    const { data } = await rest.path('/api/task/{taskId}').method('get').create()(
        {
            taskId: searchParams.id as string,
            filter: session?.user.id
        },
        {
            headers: {
                Authorization: `Bearer ${session?.user.acess_token}`
            }
        }
    );

    const submission = Array.isArray(data.submissions) ? data.submissions[0] : false;
    const overDate = new Date(data.dueDate).getTime() < Date.now();
    return (
        <div className="m-4">
            <div>
                <h1 className="text-2xl">{data.title}</h1>
            </div>
            <div className="my-5">
                <h1 className="text-xl">Estado de la entrega</h1>
                <table className="border-t border-b border-gray-400 w-full">
                    <tbody>
                        <tr className="border-b border-gray-400 text-left">
                            <th className="p-3 w-1/4 bg-gray-100">
                                Estado de la entrega
                            </th>
                            <th
                                className={`p-3 ${
                                    submission ? 'bg-green-100 ' : 'bg-gray-100'
                                }w-3/4 font-normal`}
                            >
                                {submission ? 'Listo para calificar' : 'No enviado'}
                            </th>
                        </tr>
                        <tr className="border-b border-gray-400 text-left">
                            <th className="p-3 w-1/4">Estado de la calificación</th>
                            <th
                                className={`p-3 ${
                                    submission && 'bg-green-100 '
                                } w-3/4 font-normal`}
                            >
                                {submission ? 'Enviado' : 'No enviado'}
                            </th>
                        </tr>
                        <tr className="border-b border-gray-400 text-left">
                            <th className="p-3 bg-gray-100 w-1/4">Fecha de entrega</th>
                            <th className="p-3 bg-gray-100 w-3/4 font-normal">
                                {new Date(data.dueDate).toLocaleString('es-ES', {
                                    timeZone: 'America/Managua',
                                    hour12: true,
                                    dateStyle: 'full',
                                    timeStyle: 'full'
                                })}
                            </th>
                        </tr>
                        <tr className="border-b border-gray-400 text-left">
                            <th className="p-3 bg-gray-100 w-1/4">Hora restante</th>
                            <th className="p-3 bg-gray-100 w-3/4 font-normal">
                                {submission
                                    ? humanizeDuration(
                                        new Date(data.dueDate).getTime() -
                                              new Date(submission.createdAt).getTime(),
                                        {
                                            largest: 2,
                                            round: true,
                                            language: 'es',
                                            conjunction: ' y '
                                        }
                                    )
                                    : overDate
                                        ? `La fecha de entrega ha expirado hace ${humanizeDuration(
                                            Date.now() - new Date(data.dueDate).getTime(),
                                            {
                                                largest: 2,
                                                round: true,
                                                language: 'es',
                                                conjunction: ' y '
                                            }
                                        )}`
                                        : humanizeDuration(
                                            new Date(data.dueDate).getTime() - Date.now(),
                                            {
                                                largest: 2,
                                                round: true,
                                                language: 'es',
                                                conjunction: ' y '
                                            }
                                        )}
                            </th>
                        </tr>
                        {!overDate && (
                            <tr className="border-b border-gray-400 text-left">
                                <th className="p-3 w-1/4">Archivos enviados</th>
                                <th className="p-3 w-3/4 font-normal">
                                    {submission ? (
                                        submission.attachments.map(
                                            (attachment, index) => (
                                                <div key={index}>{attachment.name}</div>
                                            )
                                        )
                                    ) : (
                                        <MyModal
                                            taskId={data.id}
                                            accessToken={
                                                session?.user.acess_token as string
                                            }
                                        />
                                    )}
                                </th>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="my-5">
                <h1 className="text-xl">Comentario</h1>
                <table className="border-t border-b border-gray-400 w-full">
                    <tbody>
                        <tr className="border-b border-gray-300 text-left">
                            <th className="p-3 bg-gray-100 w-1/4">Calificacion</th>
                            <th className="p-3 bg-gray-100 w-3/4 font-normal">
                                {submission
                                    ? `${submission.score}/${data.maxScore}`
                                    : `0/${data.maxScore}`}
                            </th>
                        </tr>
                        <tr className="border-b border-gray-300 text-left">
                            <th className="p-3 w-1/4">Calificado el</th>
                            <th className="p-3 w-3/4 font-normal">
                                {submission && submission.qualified
                                    ? new Date(data.dueDate).toLocaleString('es-ES', {
                                        timeZone: 'America/Managua',
                                        hour12: true,
                                        dateStyle: 'full',
                                        timeStyle: 'full'
                                    })
                                    : ''}
                            </th>
                        </tr>
                        <tr className="border-b border-gray-300 text-left">
                            <th className="p-3 bg-gray-100 w-1/4">Calificado por</th>
                            <th className="p-3 bg-gray-100 w-3/4 font-normal">
                                {submission && submission.qualified
                                    ? `${submission.teacher.firstName} ${submission.teacher.lastName}`
                                    : ''}
                            </th>
                        </tr>
                        <tr className="border-b border-gray-300 text-left">
                            <th className="p-3 bg-gray-100 w-1/4">Comentario</th>
                            <th className="p-3 bg-gray-100 w-3/4 font-normal">
                                {submission && submission.qualified
                                    ? `${submission.comment}`
                                    : ''}
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
