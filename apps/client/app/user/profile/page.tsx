import { getServerSession } from 'next-auth';
import Image from 'next/image';
import rest from '../../../src/rest';
import { AuthOptions } from '../../../src/pages/api/auth/[...nextauth]';
import ProfileTab from './profileTab';

export default async function Page() {
    const session = await getServerSession(AuthOptions);

    if (session?.user.role !== 'STUDENT') return null;

    const { data: user } = await rest.path('/api/student/me').method('get').create()(
        {},
        {
            headers: {
                Authorization: `Bearer ${session?.user.acess_token}`
            }
        }
    );

    return (
        <div className="grid grid-cols-3 m-5">
            <div className="col-span-1 flex justify-center tems-center my-5">
                <div className="flex flex-col items-center">
                    <Image
                        src={session?.user.avatar as string}
                        alt="avatar"
                        className="rounded-full my-2 w-auto"
                        width={100}
                        height={100}
                    />
                    <h2 className="font-semibold">HERNAN EMILIO JACAMO DELGADO</h2>
                    <div className="my-5 text-center">
                        <h2 className="font-semibold text-black">Dirección de correo</h2>
                        <h3 className="text-gray-800">{session?.user.email as string}</h3>
                    </div>
                </div>
            </div>
            <div className="col-span-2">
                <ProfileTab user={user} token={session?.user.acess_token as string} />
            </div>
        </div>
    );
}
