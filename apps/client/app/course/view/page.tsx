import { getServerSession, Session } from 'next-auth';
import CourseSVG from './courseSVG';
import { AuthOptions } from '../../../src/pages/api/auth/[...nextauth]';
import restClient from '../../../src';
import CourseTab from './courseTab';
import type { ResponseError } from '../../../src/rest';

export default async function ViewCourse({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const session = await getServerSession(AuthOptions);
    const course = await restClient.course
        .courseControllerGetCourse({
            courseId: searchParams.id,
            authorization: `Bearer ${session?.user.acess_token}`
        })
        .catch((err: ResponseError) => {
            console.log(err);
        });

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div>
            <div className="m-5 min-h-screen">
                <div className="p-3 flex justify-center bg-gray-100 border border-gray-300">
                    <CourseSVG name={course.name} career="Ing. en computación" />
                </div>
                <div className="my-2">
                    <CourseTab course={course} session={session as Session} />
                </div>
            </div>
        </div>
    );
}
